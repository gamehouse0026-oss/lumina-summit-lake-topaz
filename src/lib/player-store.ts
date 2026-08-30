import { create } from "zustand";
import type { Cue } from "./srt";
import type { UiLang } from "./i18n";
import { kindOf, likelyPlayable } from "./formats";

export type CaptionSize = "sm" | "md" | "lg";

export type MediaItem = {
  id: string;
  name: string;
  kind: "video" | "audio";
  mime: string;
  url: string;
  playable: boolean;
  file?: File;
  isSample?: boolean;
};

export type PlayerState = {
  uiLang: UiLang;
  sourceLang: string;
  targetLang: string;
  captionSize: CaptionSize;
  bilingual: boolean;
  showCaptions: boolean;
  volume: number;
  muted: boolean;
  rate: number;
  panelOpen: boolean;
  media: MediaItem | null;
  queue: MediaItem[];
  cues: Cue[];
  currentTime: number;
  duration: number;
  paused: boolean;
  live: boolean;
  generating: boolean;
  translating: boolean;
  progress: number;
  status: string;
  summary: string;
  aiAvailable: boolean | null;
  playable: boolean;
  detectedLang: string;
  dragging: boolean;
  setUiLang: (lang: UiLang) => void;
  setSourceLang: (code: string) => void;
  setTargetLang: (code: string) => void;
  setCaptionSize: (size: CaptionSize) => void;
  setBilingual: (v: boolean) => void;
  setShowCaptions: (v: boolean) => void;
  setVolume: (v: number) => void;
  setMuted: (v: boolean) => void;
  setRate: (v: number) => void;
  setPanelOpen: (v: boolean) => void;
  setMedia: (item: MediaItem | null) => void;
  addToQueue: (items: MediaItem[]) => void;
  removeFromQueue: (id: string) => void;
  setCues: (cues: Cue[] | ((prev: Cue[]) => Cue[])) => void;
  setCurrentTime: (t: number) => void;
  setDuration: (t: number) => void;
  setPaused: (v: boolean) => void;
  setLive: (v: boolean) => void;
  setGenerating: (v: boolean) => void;
  setTranslating: (v: boolean) => void;
  setProgress: (v: number) => void;
  setStatus: (v: string) => void;
  setSummary: (v: string) => void;
  setAiAvailable: (v: boolean) => void;
  setPlayable: (v: boolean) => void;
  setDetectedLang: (v: string) => void;
  setDragging: (v: boolean) => void;
  hydrateSettings: () => void;
  persistSettings: () => void;
};

const SETTINGS_KEY = "lumina-settings";

type Settings = Pick<
  PlayerState,
  "uiLang" | "sourceLang" | "targetLang" | "captionSize" | "bilingual" | "volume" | "rate"
>;

export const usePlayer = create<PlayerState>((set, get) => ({
  uiLang: "bn",
  sourceLang: "auto",
  targetLang: "bn",
  captionSize: "md",
  bilingual: true,
  showCaptions: true,
  volume: 0.9,
  muted: false,
  rate: 1,
  panelOpen: true,
  media: null,
  queue: [],
  cues: [],
  currentTime: 0,
  duration: 0,
  paused: true,
  live: false,
  generating: false,
  translating: false,
  progress: 0,
  status: "",
  summary: "",
  aiAvailable: null,
  playable: true,
  detectedLang: "",
  dragging: false,
  setUiLang: (uiLang) => {
    set({ uiLang });
    get().persistSettings();
  },
  setSourceLang: (sourceLang) => {
    set({ sourceLang });
    get().persistSettings();
  },
  setTargetLang: (targetLang) => {
    set({ targetLang });
    get().persistSettings();
  },
  setCaptionSize: (captionSize) => {
    set({ captionSize });
    get().persistSettings();
  },
  setBilingual: (bilingual) => {
    set({ bilingual });
    get().persistSettings();
  },
  setShowCaptions: (showCaptions) => set({ showCaptions }),
  setVolume: (volume) => {
    set({ volume, muted: volume === 0 });
    get().persistSettings();
  },
  setMuted: (muted) => set({ muted }),
  setRate: (rate) => {
    set({ rate });
    get().persistSettings();
  },
  setPanelOpen: (panelOpen) => set({ panelOpen }),
  setMedia: (media) =>
    set({
      media,
      cues: [],
      summary: "",
      currentTime: 0,
      duration: 0,
      paused: true,
      live: false,
      generating: false,
      progress: 0,
      status: "",
      detectedLang: "",
      playable: media ? media.playable : true,
    }),
  addToQueue: (items) => set((s) => ({ queue: [...s.queue, ...items] })),
  removeFromQueue: (id) =>
    set((s) => {
      const queue = s.queue.filter((q) => q.id !== id);
      const media = s.media?.id === id ? (queue[0] ?? null) : s.media;
      return { queue, media, playable: media?.playable ?? true };
    }),
  setCues: (cues) =>
    set((s) => ({ cues: typeof cues === "function" ? cues(s.cues) : cues })),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setPaused: (paused) => set({ paused }),
  setLive: (live) => set({ live }),
  setGenerating: (generating) => set({ generating }),
  setTranslating: (translating) => set({ translating }),
  setProgress: (progress) => set({ progress }),
  setStatus: (status) => set({ status }),
  setSummary: (summary) => set({ summary }),
  setAiAvailable: (aiAvailable) => set({ aiAvailable }),
  setPlayable: (playable) => set({ playable }),
  setDetectedLang: (detectedLang) => set({ detectedLang }),
  setDragging: (dragging) => set({ dragging }),
  hydrateSettings: () => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<Settings>;
      set({
        uiLang: parsed.uiLang === "en" ? "en" : "bn",
        sourceLang: parsed.sourceLang ?? "auto",
        targetLang: parsed.targetLang ?? "bn",
        captionSize: parsed.captionSize ?? "md",
        bilingual: parsed.bilingual ?? true,
        volume: typeof parsed.volume === "number" ? parsed.volume : 0.9,
        rate: typeof parsed.rate === "number" ? parsed.rate : 1,
      });
    } catch {
      /* ignore */
    }
  },
  persistSettings: () => {
    const s = get();
    const data: Settings = {
      uiLang: s.uiLang,
      sourceLang: s.sourceLang,
      targetLang: s.targetLang,
      captionSize: s.captionSize,
      bilingual: s.bilingual,
      volume: s.volume,
      rate: s.rate,
    };
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  },
}));

export function filesToItems(files: File[]): MediaItem[] {
  return files.map((file) => ({
    id: crypto.randomUUID(),
    name: file.name,
    kind: kindOf(file.name, file.type),
    mime: file.type,
    url: URL.createObjectURL(file),
    playable: likelyPlayable(file.name, file.type),
    file,
  }));
}
