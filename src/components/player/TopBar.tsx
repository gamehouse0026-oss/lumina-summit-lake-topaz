import { Captions, Keyboard, PanelRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COPY, type UiLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  ui: UiLang;
  panelOpen: boolean;
  onTogglePanel: () => void;
  onToggleUi: () => void;
  onShortcuts: () => void;
  onOpen: () => void;
};

export function TopBar({ ui, panelOpen, onTogglePanel, onToggleUi, onShortcuts, onOpen }: Props) {
  const t = COPY[ui];
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 px-4 sm:h-16 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] bg-elevated shadow-[var(--shadow-border)]">
          <Captions className="size-4 text-fg" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-lg leading-none tracking-[var(--tracking-display)]">{t.app}</p>
          <p className="mt-1 hidden truncate text-xs text-muted sm:block">{t.tagline}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <div className="mr-1 flex rounded-[var(--radius-sm)] bg-elevated p-0.5">
          <button
            type="button"
            onClick={() => ui !== "bn" && onToggleUi()}
            className={cn(
              "h-8 min-w-9 rounded-[6px] px-2 text-xs",
              ui === "bn" ? "bg-accent text-accent-fg" : "text-muted",
            )}
          >
            বাং
          </button>
          <button
            type="button"
            onClick={() => ui !== "en" && onToggleUi()}
            className={cn(
              "h-8 min-w-9 rounded-[6px] px-2 text-xs",
              ui === "en" ? "bg-accent text-accent-fg" : "text-muted",
            )}
          >
            EN
          </button>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={onShortcuts} aria-label={t.shortcuts} className="hidden sm:inline-flex">
          <Keyboard className="size-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onOpen} className="hidden sm:inline-flex">
          {t.openFiles}
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onTogglePanel}
          aria-label={t.captions}
          className={cn(panelOpen && "text-accent")}
        >
          <PanelRight className="size-4" />
        </Button>
      </div>
    </header>
  );
}
