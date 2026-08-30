import { useRef } from "react";
import {
  Captions,
  Download,
  Eraser,
  FileUp,
  Languages,
  LoaderCircle,
  Radio,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { COPY, LANGUAGES, langLabel, type UiLang } from "@/lib/i18n";
import { formatTimecode } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Cue } from "@/lib/srt";
import type { CaptionSize } from "@/lib/player-store";

type Props = {
  ui: UiLang;
  cues: Cue[];
  currentTime: number;
  live: boolean;
  generating: boolean;
  translating: boolean;
  progress: number;
  status: string;
  bilingual: boolean;
  sourceLang: string;
  targetLang: string;
  captionSize: CaptionSize;
  summary: string;
  aiAvailable: boolean | null;
  detectedLang: string;
  hasMedia: boolean;
  onLive: () => void;
  onTranscribe: () => void;
  onTranslate: () => void;
  onImport: (file: File) => void;
  onExport: () => void;
  onClear: () => void;
  onSeek: (t: number) => void;
  onBilingual: (v: boolean) => void;
  onSourceLang: (v: string) => void;
  onTargetLang: (v: string) => void;
  onCaptionSize: (v: CaptionSize) => void;
  onSummarize: () => void;
  onEdit: (id: string, text: string) => void;
};

export function CaptionDock(props: Props) {
  const t = COPY[props.ui];
  const fileRef = useRef<HTMLInputElement>(null);
  const busy = props.live || props.generating || props.translating;

  return (
    <aside className="flex h-full min-h-0 w-full flex-col bg-surface">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">{t.captions}</p>
          <p className="mt-0.5 text-sm text-fg">
            {props.cues.length} {t.cueCount}
            {props.detectedLang ? ` · ${t.detected} ${props.detectedLang}` : ""}
          </p>
        </div>
        {props.live ? (
          <span className="flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 text-[10px] font-medium tracking-wider text-live uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-live" />
            {t.liveBadge}
          </span>
        ) : null}
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-2 p-3">
        <label className="col-span-1 text-xs text-muted">
          {t.sourceLang}
          <div className="mt-1">
            <Select value={props.sourceLang} onValueChange={props.onSourceLang}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.code} value={l.code}>
                    {langLabel(l.code, props.ui)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </label>
        <label className="col-span-1 text-xs text-muted">
          {t.targetLang}
          <div className="mt-1">
            <Select value={props.targetLang} onValueChange={props.onTargetLang}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.filter((l) => l.code !== "auto").map((l) => (
                  <SelectItem key={l.code} value={l.code}>
                    {langLabel(l.code, props.ui)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </label>
      </div>
      <div className="flex flex-col gap-2 px-3 pb-3">
        <Button
          variant={props.live ? "live" : "default"}
          onClick={props.onLive}
          disabled={!props.hasMedia || props.generating}
        >
          <Radio className="size-4" />
          {props.live ? t.stopLive : t.liveSrt}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={props.onTranscribe} disabled={!props.hasMedia || busy}>
            {props.generating ? <LoaderCircle className="size-4 animate-spin" /> : <Captions className="size-4" />}
            {t.transcribe}
          </Button>
          <Button variant="secondary" onClick={props.onTranslate} disabled={props.cues.length === 0 || busy}>
            {props.translating ? <LoaderCircle className="size-4 animate-spin" /> : <Languages className="size-4" />}
            {t.translate}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            <FileUp className="size-4" />
            {t.importSrt}
          </Button>
          <Button variant="outline" onClick={props.onExport} disabled={props.cues.length === 0}>
            <Download className="size-4" />
            {t.exportSrt}
          </Button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".srt,.vtt,text/plain"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) props.onImport(file);
            e.target.value = "";
          }}
        />
        {props.aiAvailable === false ? (
          <p className="text-xs leading-relaxed text-muted">{t.aiUnavailable}</p>
        ) : null}
        {props.status ? <p className="text-xs text-muted">{props.status}</p> : null}
        {props.generating || props.progress > 0 ? (
          <div className="h-1 overflow-hidden rounded-full bg-elevated">
            <div
              className="h-full bg-accent transition-[width] duration-[var(--motion-fast)]"
              style={{ width: `${Math.min(100, props.progress)}%` }}
            />
          </div>
        ) : null}
      </div>
      <Separator />
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm text-fg">{t.bilingual}</span>
        <Switch checked={props.bilingual} onCheckedChange={props.onBilingual} />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 pb-3">
        <span className="text-sm text-fg">{t.captionSize}</span>
        <div className="flex rounded-[var(--radius-sm)] bg-elevated p-0.5">
          {(["sm", "md", "lg"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => props.onCaptionSize(s)}
              className={cn(
                "h-8 min-w-9 rounded-[6px] px-2 text-xs",
                props.captionSize === s ? "bg-accent text-accent-fg" : "text-muted",
              )}
            >
              {s === "sm" ? t.sizeSm : s === "md" ? t.sizeMd : t.sizeLg}
            </button>
          ))}
        </div>
      </div>
      <Separator />
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-1 p-2">
          {props.cues.length === 0 ? (
            <p className="px-2 py-8 text-center text-sm text-muted">{t.emptyCues}</p>
          ) : (
            props.cues.map((cue) => {
              const on = props.currentTime >= cue.start && props.currentTime < cue.end;
              return (
                <button
                  key={cue.id}
                  type="button"
                  onClick={() => props.onSeek(cue.start)}
                  className={cn(
                    "w-full rounded-[var(--radius-sm)] px-3 py-2.5 text-left transition-colors duration-[var(--motion-quick)]",
                    on ? "bg-elevated" : "hover:bg-elevated/60",
                  )}
                >
                  <p className="font-mono text-[10px] tabular-nums text-subtle">
                    {formatTimecode(cue.start)} → {formatTimecode(cue.end)}
                  </p>
                  <p
                    className="mt-1 text-sm leading-snug text-fg"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => props.onEdit(cue.id, e.currentTarget.textContent ?? cue.text)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {cue.text}
                  </p>
                  {cue.translated ? (
                    <p className="mt-1 text-xs leading-snug text-muted">{cue.translated}</p>
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
      <Separator />
      <div className="flex flex-col gap-2 p-3 pb-16">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={props.onSummarize}
            disabled={props.cues.length === 0 || busy}
          >
            <Sparkles className="size-4" />
            {t.generateSummary}
          </Button>
          <Button variant="ghost" size="icon" onClick={props.onClear} disabled={props.cues.length === 0} aria-label={t.clearCues}>
            <Eraser className="size-4" />
          </Button>
        </div>
        {props.summary ? (
          <p className="rounded-[var(--radius-sm)] bg-elevated px-3 py-2 text-xs leading-relaxed text-muted text-pretty">
            {props.summary}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
