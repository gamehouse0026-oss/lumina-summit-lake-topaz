import { activeCue, type Cue } from "@/lib/srt";
import type { CaptionSize } from "@/lib/player-store";
import { cn } from "@/lib/utils";

type Props = {
  cues: Cue[];
  time: number;
  bilingual: boolean;
  size: CaptionSize;
  visible: boolean;
};

const sizeClass: Record<CaptionSize, string> = {
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
};

export function CaptionOverlay({ cues, time, bilingual, size, visible }: Props) {
  if (!visible) return null;
  const cue = activeCue(cues, time);
  if (!cue) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 flex justify-center px-4 sm:bottom-20">
      <div
        className={cn(
          "max-w-[min(920px,92%)] rounded-[var(--radius-md)] bg-bg/78 px-4 py-2.5 text-center text-fg shadow-[var(--shadow-border)]",
          sizeClass[size],
        )}
      >
        <p className="font-medium leading-snug text-balance">{cue.text}</p>
        {bilingual && cue.translated && cue.translated !== cue.text ? (
          <p className="mt-1 text-[0.85em] leading-snug text-muted text-pretty">{cue.translated}</p>
        ) : null}
      </div>
    </div>
  );
}
