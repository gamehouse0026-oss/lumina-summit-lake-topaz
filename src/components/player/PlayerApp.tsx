import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CaptionDock } from "@/components/player/CaptionDock";
import { CaptionOverlay } from "@/components/player/CaptionOverlay";
import { Controls } from "@/components/player/Controls";
import { EmptyState } from "@/components/player/EmptyState";
import { TopBar } from "@/components/player/TopBar";
import { Visualizer } from "@/components/player/Visualizer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getAiStatus, transcribeAudio } from "@/lib/ai/transcribe";
import { summarizeTranscript, translateCues } from "@/lib/ai/translate";
import { ensureGraph, type MediaAudioGraph } from "@/lib/audio-graph";
import { fileToWavChunks, recordWindow } from "@/lib/audio";
import { ACCEPT_ATTR, isMediaFile } from "@/lib/formats";
import { COPY } from "@/lib/i18n";
import { filesToItems, usePlayer, type MediaItem } from "@/lib/player-store";
import {
  mergeCues,
  parseSrt,
  SAMPLE_CUES_EN,
  serializeSrt,
  textToCue,
  wordsToCues,
  type Cue,
} from "@/lib/srt";
import { downloadText, sleep, uid } from "@/lib/utils";
import { cn } from "@/lib/utils";

const SAMPLE_URL = "/sample.mp4";
const LIVE_WINDOW_MS = 5000;

export function PlayerApp() {
  const store = usePlayer();
  const t = COPY[store.uiLang];
  const mediaRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const liveRef = useRef(false);
  const graphRef = useRef<MediaAudioGraph | null>(null);
  const recRef = useRef<{ stop: () => void } | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [shortcuts, setShortcuts] = useState(false);
  const [mobileDock, setMobileDock] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    store.hydrateSettings();
    void getAiStatus().then((s) => store.setAiAvailable(s.available));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attachFiles = useCallback(
    (list: FileList | File[]) => {
      const files = [...list].filter(isMediaFile);
      if (files.length === 0) {
        toast.error(t.cantPlay);
        return;
      }
      const items = filesToItems(files);
      store.addToQueue(items);
      store.setMedia(items[0] ?? null);
    },
    [store, t.cantPlay],
  );

  useEffect(() => {
    const onDragOver = (e: DragEvent) => {
      if (e.dataTransfer?.types.includes("Files")) {
        e.preventDefault();
        store.setDragging(true);
      }
    };
    const onDragLeave = () => store.setDragging(false);
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      store.setDragging(false);
      if (e.dataTransfer?.files) attachFiles(e.dataTransfer.files);
    };
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, [attachFiles, store]);

  const media = store.media;

  useEffect(() => {
    const node = mediaRef.current;
    if (!node || !media) return;
    if (media.url) {
      node.src = media.url;
      node.crossOrigin = media.url.startsWith("http") ? "anonymous" : null;
      node.load();
    }
    store.setPaused(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media?.id]);

  useEffect(() => {
    const node = mediaRef.current;
    if (!node) return;
    node.volume = store.volume;
    node.muted = store.muted;
    node.playbackRate = store.rate;
  }, [store.volume, store.muted, store.rate, media]);

  const bindGraph = useCallback(async () => {
    const node = mediaRef.current;
    if (!node) return null;
    try {
      const graph = ensureGraph(node);
      graphRef.current = graph;
      await graph.resume();
      return graph;
    } catch {
      return null;
    }
  }, []);

  const applyResult = useCallback(
    (text: string, words: { text: string; start: number; end: number }[], offset: number, language?: string) => {
      let incoming: Cue[] = [];
      if (words.length > 0) incoming = wordsToCues(words, offset);
      else if (text.trim()) {
        incoming = [textToCue(text.trim(), offset, offset + 4.8)];
      }
      if (incoming.length === 0) return;
      store.setCues((prev) => mergeCues(prev, incoming));
      if (language) store.setDetectedLang(language);
    },
    [store],
  );

  const sendBlob = useCallback(
    async (blob: Blob, offset: number, filename: string) => {
      const fd = new FormData();
      fd.append("language", store.sourceLang);
      fd.append("file", blob, filename);
      const result = await transcribeAudio({ data: fd });
      if (!result.ok) {
        if (result.error !== "No audio in this window") toast.error(result.error);
        return;
      }
      applyResult(result.text, result.words, offset, result.language);
    },
    [applyResult, store.sourceLang],
  );

  const stopLive = useCallback(() => {
    liveRef.current = false;
    recRef.current?.stop();
    recRef.current = null;
    store.setLive(false);
    store.setStatus("");
  }, [store]);

  const startLive = useCallback(async () => {
    if (liveRef.current) {
      stopLive();
      return;
    }
    if (store.aiAvailable === false) {
      toast.error(t.aiUnavailable);
      return;
    }
    const node = mediaRef.current;
    if (!node) return;
    const graph = await bindGraph();
    if (!graph) {
      toast.error(t.error);
      return;
    }
    liveRef.current = true;
    store.setLive(true);
    store.setStatus(t.listening);
    if (node.paused) {
      try {
        await node.play();
      } catch {
        /* user can press play */
      }
    }
    void (async () => {
      while (liveRef.current) {
        if (node.paused) {
          await sleep(200);
          continue;
        }
        const start = node.currentTime;
        try {
          const blob = await recordWindow(graph.recDest.stream, LIVE_WINDOW_MS);
          if (!liveRef.current) break;
          if (blob.size > 400) {
            const ext = blob.type.includes("mp4") ? "m4a" : "webm";
            await sendBlob(blob, Math.max(0, start), `live.${ext}`);
          }
        } catch {
          await sleep(400);
        }
      }
    })();
  }, [bindGraph, sendBlob, stopLive, store, t.aiUnavailable, t.error, t.listening]);

  const transcribeFile = useCallback(async () => {
    if (!media) return;
    if (store.aiAvailable === false) {
      toast.error(t.aiUnavailable);
      return;
    }
    store.setGenerating(true);
    store.setProgress(4);
    store.setStatus(t.generating);
    try {
      if (media.file) {
        const chunks = await fileToWavChunks(media.file);
        if (chunks && chunks.length > 0) {
          for (let i = 0; i < chunks.length; i++) {
            store.setProgress(((i + 0.2) / chunks.length) * 100);
            await sendBlob(chunks[i].wav, chunks[i].offset, `part-${i}.wav`);
          }
          store.setProgress(100);
          store.setStatus(t.done);
          return;
        }
        if (media.file.size < 12 * 1024 * 1024) {
          await sendBlob(media.file, 0, media.file.name);
          store.setProgress(100);
          store.setStatus(t.done);
          return;
        }
      }
      const node = mediaRef.current;
      const graph = await bindGraph();
      if (!node || !graph) throw new Error("graph");
      if (node.paused) await node.play().catch(() => undefined);
      const start = node.currentTime;
      const blob = await recordWindow(graph.recDest.stream, 8000);
      await sendBlob(blob, Math.max(0, start), "window.webm");
      store.setProgress(100);
      store.setStatus(t.done);
    } catch {
      toast.error(t.error);
    } finally {
      store.setGenerating(false);
    }
  }, [bindGraph, media, sendBlob, store, t.aiUnavailable, t.done, t.error, t.generating]);

  const onTranslate = useCallback(async () => {
    if (store.cues.length === 0) return;
    store.setTranslating(true);
    try {
      const batchSize = 28;
      const next: Cue[] = store.cues.map((c) => ({ ...c }));
      for (let i = 0; i < next.length; i += batchSize) {
        const slice = next.slice(i, i + batchSize).map((c) => ({ id: c.id, text: c.text }));
        const result = await translateCues({ data: { lines: slice, target: store.targetLang } });
        if (!result.ok) {
          toast.error(result.error);
          break;
        }
        const map = new Map(result.lines.map((l) => [l.id, l.text]));
        for (const cue of next) {
          const tr = map.get(cue.id);
          if (tr) cue.translated = tr;
        }
        store.setCues(next.map((c) => ({ ...c })));
      }
    } finally {
      store.setTranslating(false);
    }
  }, [store]);

  const onSummarize = useCallback(async () => {
    const text = store.cues.map((c) => c.text).join(" ");
    const result = await summarizeTranscript({
      data: { text, language: store.targetLang === "auto" ? store.uiLang : store.targetLang },
    });
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    store.setSummary(result.summary);
  }, [store]);

  const onImportSrt = useCallback(
    async (file: File) => {
      const raw = await file.text();
      const cues = parseSrt(raw);
      if (cues.length === 0) {
        toast.error(t.error);
        return;
      }
      store.setCues(cues);
    },
    [store, t.error],
  );

  const playSample = useCallback(() => {
    const item: MediaItem = {
      id: uid(),
      name: "Lumina sample.mp4",
      kind: "video",
      mime: "video/mp4",
      url: SAMPLE_URL,
      playable: true,
      isSample: true,
    };
    store.addToQueue([item]);
    store.setMedia(item);
    store.setCues(SAMPLE_CUES_EN);
    store.setStatus(t.sampleNote);
  }, [store, t.sampleNote]);

  const startMic = useCallback(async () => {
    type MicRec = {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      start: () => void;
      stop: () => void;
      onresult: ((ev: { results: ArrayLike<{ isFinal: boolean; 0?: { transcript?: string } }> }) => void) | null;
      onerror: (() => void) | null;
      onend: (() => void) | null;
    };
    const Ctor = (window as unknown as { SpeechRecognition?: new () => MicRec; webkitSpeechRecognition?: new () => MicRec })
      .SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: new () => MicRec }).webkitSpeechRecognition;
    if (!Ctor) {
      toast.error(t.error);
      return;
    }
    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = store.sourceLang === "auto" ? (store.uiLang === "bn" ? "bn-BD" : "en-US") : store.sourceLang;
    const item: MediaItem = {
      id: uid(),
      name: store.uiLang === "bn" ? "লাইভ মাইক" : "Live microphone",
      kind: "audio",
      mime: "audio/webm",
      url: "",
      playable: false,
    };
    if (!usePlayer.getState().media) store.setMedia(item);
    store.setLive(true);
    liveRef.current = true;
    recRef.current = rec;
    rec.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (!result) return;
      const text = result[0]?.transcript?.trim();
      if (!text) return;
      const now = usePlayer.getState().currentTime || performance.now() / 1000;
      if (result.isFinal) {
        store.setCues((prev) => mergeCues(prev, [textToCue(text, Math.max(0, now - 3), now + 0.4)]));
      }
    };
    rec.onerror = () => {
      toast.error(t.micDenied);
      stopLive();
    };
    rec.onend = () => {
      if (liveRef.current) rec.start();
    };
    try {
      rec.start();
    } catch {
      toast.error(t.micDenied);
    }
  }, [stopLive, store, t.error, t.micDenied]);

  const togglePlay = useCallback(async () => {
    const node = mediaRef.current;
    if (!node) return;
    await bindGraph();
    if (node.paused) {
      await node.play().catch(() => undefined);
    } else {
      node.pause();
    }
  }, [bindGraph]);

  const seekTo = useCallback((time: number) => {
    const node = mediaRef.current;
    if (node) node.currentTime = time;
    store.setCurrentTime(time);
  }, [store]);

  const toggleFullscreen = useCallback(async () => {
    const root = stageRef.current;
    if (!root) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
    } else {
      await root.requestFullscreen().catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      const s = usePlayer.getState();
      if (e.code === "Space") {
        e.preventDefault();
        void togglePlay();
      } else if (e.key === "ArrowRight") {
        seekTo(s.currentTime + 5);
      } else if (e.key === "ArrowLeft") {
        seekTo(Math.max(0, s.currentTime - 5));
      } else if (e.key === "f") {
        void toggleFullscreen();
      } else if (e.key === "m") {
        s.setMuted(!s.muted);
      } else if (e.key === "c") {
        s.setShowCaptions(!s.showCaptions);
      } else if (e.key === "l") {
        void startLive();
      } else if (e.key === "?") {
        setShortcuts(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, seekTo, startLive, toggleFullscreen]);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const onPip = async () => {
    const node = mediaRef.current;
    if (!node) return;
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else await node.requestPictureInPicture();
    } catch {
      /* unsupported */
    }
  };

  const hasMedia = Boolean(media);
  const isAudio = media?.kind === "audio" || !media?.playable;
  const showStage = hasMedia;

  return (
    <TooltipProvider>
      <div className="flex h-dvh min-h-0 flex-col bg-bg text-fg">
        <TopBar
          ui={store.uiLang}
          panelOpen={store.panelOpen}
          onTogglePanel={() => {
            if (window.matchMedia("(max-width: 900px)").matches) setMobileDock(true);
            else store.setPanelOpen(!store.panelOpen);
          }}
          onToggleUi={() => store.setUiLang(store.uiLang === "bn" ? "en" : "bn")}
          onShortcuts={() => setShortcuts(true)}
          onOpen={() => fileRef.current?.click()}
        />
        <input
          ref={fileRef}
          type="file"
          accept={ACCEPT_ATTR}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) attachFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <div className="flex min-h-0 flex-1">
          <div className="flex min-w-0 flex-1 flex-col">
            <div ref={stageRef} className="relative min-h-0 flex-1 bg-bg">
              {!showStage ? (
                <EmptyState
                  ui={store.uiLang}
                  onOpen={() => fileRef.current?.click()}
                  onSample={playSample}
                  onMic={() => void startMic()}
                />
              ) : (
                <>
                  <video
                    ref={mediaRef}
                    className={cn(
                      "h-full w-full bg-bg object-contain",
                      isAudio || !store.playable ? "hidden" : "block",
                    )}
                    playsInline
                    onClick={() => void togglePlay()}
                    onPlay={() => store.setPaused(false)}
                    onPause={() => store.setPaused(true)}
                    onTimeUpdate={(e) => store.setCurrentTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => {
                      store.setDuration(e.currentTarget.duration || 0);
                      store.setPlayable(true);
                      if (media?.isSample) {
                        void e.currentTarget.play().catch(() => undefined);
                      }
                    }}
                    onError={() => {
                      if (media && !media.isSample) store.setPlayable(false);
                    }}
                    onEnded={() => store.setPaused(true)}
                  />
                  {(isAudio || !store.playable) && (
                    <Visualizer
                      graph={graphRef.current}
                      active={!store.paused || Boolean(graphRef.current)}
                      title={media?.name ?? ""}
                    />
                  )}
                  <CaptionOverlay
                    cues={store.cues}
                    time={store.currentTime}
                    bilingual={store.bilingual}
                    size={store.captionSize}
                    visible={store.showCaptions}
                  />
                  <Controls
                    ui={store.uiLang}
                    paused={store.paused}
                    currentTime={store.currentTime}
                    duration={store.duration}
                    volume={store.volume}
                    muted={store.muted}
                    rate={store.rate}
                    showCaptions={store.showCaptions}
                    fullscreen={fullscreen}
                    cues={store.cues}
                    onToggle={() => void togglePlay()}
                    onSeek={seekTo}
                    onVolume={(v) => {
                      store.setVolume(v);
                      store.setMuted(v === 0);
                    }}
                    onMute={() => store.setMuted(!store.muted)}
                    onRate={store.setRate}
                    onCaptions={() => store.setShowCaptions(!store.showCaptions)}
                    onFullscreen={() => void toggleFullscreen()}
                    onPip={() => void onPip()}
                  />
                </>
              )}
              {store.dragging ? (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-bg/80 text-sm tracking-wide text-fg">
                  {t.dropOverlay}
                </div>
              ) : null}
            </div>
            {store.queue.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto border-t border-border px-3 py-2">
                {store.queue.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => store.setMedia(item)}
                    className={cn(
                      "max-w-[180px] shrink-0 truncate rounded-[var(--radius-sm)] px-3 py-2 text-left text-xs",
                      item.id === media?.id ? "bg-elevated text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="hidden w-[360px] shrink-0 border-l border-border lg:block">
            {store.panelOpen ? (
              <CaptionDock
                ui={store.uiLang}
                cues={store.cues}
                currentTime={store.currentTime}
                live={store.live}
                generating={store.generating}
                translating={store.translating}
                progress={store.progress}
                status={store.status}
                bilingual={store.bilingual}
                sourceLang={store.sourceLang}
                targetLang={store.targetLang}
                captionSize={store.captionSize}
                summary={store.summary}
                aiAvailable={store.aiAvailable}
                detectedLang={store.detectedLang}
                hasMedia={hasMedia}
                onLive={() => void startLive()}
                onTranscribe={() => void transcribeFile()}
                onTranslate={() => void onTranslate()}
                onImport={onImportSrt}
                onExport={() =>
                  downloadText(
                    `${(media?.name ?? "captions").replace(/\.[^.]+$/, "")}.srt`,
                    serializeSrt(store.cues, store.bilingual && store.cues.some((c) => c.translated)),
                    "application/x-subrip",
                  )
                }
                onClear={() => store.setCues([])}
                onSeek={seekTo}
                onBilingual={store.setBilingual}
                onSourceLang={store.setSourceLang}
                onTargetLang={store.setTargetLang}
                onCaptionSize={store.setCaptionSize}
                onSummarize={() => void onSummarize()}
                onEdit={(id, text) =>
                  store.setCues((prev) => prev.map((c) => (c.id === id ? { ...c, text } : c)))
                }
              />
            ) : null}
          </div>
        </div>
        <Sheet open={mobileDock} onOpenChange={setMobileDock}>
          <SheetContent side="bottom" className="h-[78vh] overflow-hidden">
            <CaptionDock
              ui={store.uiLang}
              cues={store.cues}
              currentTime={store.currentTime}
              live={store.live}
              generating={store.generating}
              translating={store.translating}
              progress={store.progress}
              status={store.status}
              bilingual={store.bilingual}
              sourceLang={store.sourceLang}
              targetLang={store.targetLang}
              captionSize={store.captionSize}
              summary={store.summary}
              aiAvailable={store.aiAvailable}
              detectedLang={store.detectedLang}
              hasMedia={hasMedia}
              onLive={() => void startLive()}
              onTranscribe={() => void transcribeFile()}
              onTranslate={() => void onTranslate()}
              onImport={onImportSrt}
              onExport={() =>
                downloadText(
                  `${(media?.name ?? "captions").replace(/\.[^.]+$/, "")}.srt`,
                  serializeSrt(store.cues),
                  "application/x-subrip",
                )
              }
              onClear={() => store.setCues([])}
              onSeek={seekTo}
              onBilingual={store.setBilingual}
              onSourceLang={store.setSourceLang}
              onTargetLang={store.setTargetLang}
              onCaptionSize={store.setCaptionSize}
              onSummarize={() => void onSummarize()}
              onEdit={(id, text) =>
                store.setCues((prev) => prev.map((c) => (c.id === id ? { ...c, text } : c)))
              }
            />
          </SheetContent>
        </Sheet>
        <Dialog open={shortcuts} onOpenChange={setShortcuts}>
          <DialogContent>
            <DialogTitle>{t.shortcuts}</DialogTitle>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {[
                ["Space", "Play / Pause"],
                ["← →", "Seek 5s"],
                ["F", t.fullscreen],
                ["M", t.mute],
                ["C", t.captions],
                ["L", t.liveSrt],
                ["?", t.shortcuts],
              ].map(([k, v]) => (
                <li key={k} className="flex justify-between gap-4">
                  <span className="font-mono text-fg">{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
