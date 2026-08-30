import {
  Captions,
  Maximize,
  Minimize,
  Pause,
  PictureInPicture2,
  Play,
  Subtitles,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { COPY, type UiLang } from "@/lib/i18n";
import { formatTimecode } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Cue } from "@/lib/srt";

type Props = {
  ui: UiLang;
  paused: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  rate: number;
  showCaptions: boolean;
  fullscreen: boolean;
  cues: Cue[];
  onToggle: () => void;
  onSeek: (t: number) => void;
  onVolume: (v: number) => void;
  onMute: () => void;
  onRate: (r: number) => void;
  onCaptions: () => void;
  onFullscreen: () => void;
  onPip: () => void;
};

const RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function Controls({
  ui,
  paused,
  currentTime,
  duration,
  volume,
  muted,
  rate,
  showCaptions,
  fullscreen,
  cues,
  onToggle,
  onSeek,
  onVolume,
  onMute,
  onRate,
  onCaptions,
  onFullscreen,
  onPip,
}: Props) {
  const t = COPY[ui];
  const max = duration > 0 ? duration : 1;

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-bg via-bg/80 to-transparent px-3 pt-10 pb-3 sm:px-4">
      <div className="relative mb-2 h-4">
        <div className="absolute inset-x-0 top-1.5 h-1 overflow-hidden rounded-full bg-elevated">
          {cues.map((cue) => (
            <span
              key={cue.id}
              className="absolute top-0 h-full bg-accent/35"
              style={{
                left: `${(cue.start / max) * 100}%`,
                width: `${Math.max(0.4, ((cue.end - cue.start) / max) * 100)}%`,
              }}
            />
          ))}
        </div>
        <Slider
          min={0}
          max={max}
          step={0.05}
          value={[currentTime]}
          onValueChange={(v) => onSeek(v[0] ?? 0)}
          className="absolute inset-x-0 top-1"
          aria-label="Seek"
        />
      </div>
      <div className="flex items-center gap-1.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onToggle} aria-label={paused ? "Play" : "Pause"}>
              {paused ? <Play className="ml-0.5 size-4" /> : <Pause className="size-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{paused ? "Play" : "Pause"}</TooltipContent>
        </Tooltip>
        <span className="min-w-[5.6rem] px-1 font-mono text-xs tabular-nums text-muted">
          {formatTimecode(currentTime)} / {formatTimecode(duration)}
        </span>
        <div className="ml-1 hidden items-center gap-2 sm:flex">
          <Button variant="ghost" size="icon-sm" onClick={onMute} aria-label={t.mute}>
            {muted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </Button>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={[muted ? 0 : volume]}
            onValueChange={(v) => onVolume(v[0] ?? 0)}
            className="w-24"
            aria-label={t.volume}
          />
        </div>
        <div className="ml-auto flex items-center gap-0.5">
          <select
            value={String(rate)}
            onChange={(e) => onRate(Number(e.target.value))}
            className="h-9 rounded-[var(--radius-xs)] bg-transparent px-1.5 text-xs text-muted outline-none hover:text-fg"
            aria-label={t.speed}
          >
            {RATES.map((r) => (
              <option key={r} value={r} className="bg-surface text-fg">
                {r}x
              </option>
            ))}
          </select>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onCaptions}
                aria-label={t.captions}
                className={cn(showCaptions && "text-accent")}
              >
                {showCaptions ? <Captions className="size-4" /> : <Subtitles className="size-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.captions}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={onPip} aria-label={t.pip} className="hidden sm:inline-flex">
                <PictureInPicture2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.pip}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" onClick={onFullscreen} aria-label={t.fullscreen}>
                {fullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.fullscreen}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
