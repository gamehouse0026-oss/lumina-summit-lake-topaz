import { Film, Mic, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COPY, type UiLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  ui: UiLang;
  onOpen: () => void;
  onSample: () => void;
  onMic: () => void;
};

export function EmptyState({ ui, onOpen, onSample, onMic }: Props) {
  const t = COPY[ui];
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center px-5 py-10 pb-20">
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <div
          className={cn(
            "mb-8 flex size-16 items-center justify-center rounded-[var(--radius-lg)]",
            "bg-elevated shadow-[var(--shadow-border)]",
          )}
        >
          <Film className="size-7 text-fg" strokeWidth={1.5} />
        </div>
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">{t.unlimited}</p>
        <h1 className="font-display mt-3 max-w-md text-4xl leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-balance sm:text-5xl">
          {t.dropTitle}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-[var(--leading-normal)] text-pretty text-muted">
          {t.dropHint}
        </p>
        <p className="mt-2 text-xs text-subtle">{t.formats}</p>
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={onOpen} className="h-12 flex-1 sm:flex-none sm:px-6">
            <Upload className="size-4" />
            {t.openFiles}
          </Button>
          <Button variant="secondary" onClick={onSample} className="h-12 flex-1 sm:flex-none sm:px-6">
            <Film className="size-4" />
            {t.playSample}
          </Button>
          <Button variant="outline" onClick={onMic} className="h-12 flex-1 sm:flex-none sm:px-6">
            <Mic className="size-4" />
            {t.liveMic}
          </Button>
        </div>
        <ul className="mt-12 grid w-full max-w-lg gap-3 text-left sm:grid-cols-2">
          {[t.featureLive, t.featureAny, t.featureExport, t.featureTranslate].map((line) => (
            <li
              key={line}
              className="rounded-[var(--radius-md)] bg-surface px-4 py-3 text-sm leading-snug text-muted shadow-[var(--shadow-border)]"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
