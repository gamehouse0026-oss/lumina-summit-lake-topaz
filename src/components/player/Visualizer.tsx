import { useEffect, useRef } from "react";
import type { MediaAudioGraph } from "@/lib/audio-graph";

type Props = {
  graph: MediaAudioGraph | null;
  active: boolean;
  title: string;
};

export function Visualizer({ graph, active, title }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !graph || !active) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const analyser = graph.analyser;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let raf = 0;
    const draw = () => {
      analyser.getByteFrequencyData(data);
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const bars = 48;
      const gap = 4;
      const step = Math.floor(data.length / bars);
      const barW = (width - gap * (bars - 1)) / bars;
      for (let i = 0; i < bars; i++) {
        const v = (data[i * step] ?? 0) / 255;
        const h = Math.max(4, v * height * 0.72);
        const x = i * (barW + gap);
        const y = (height - h) / 2;
        ctx.fillStyle = `rgba(244, 241, 234, ${0.18 + v * 0.55})`;
        ctx.fillRect(x, y, barW, h);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [graph, active]);

  return (
    <div className="relative flex h-full min-h-[220px] w-full items-center justify-center bg-surface">
      <canvas ref={canvasRef} width={720} height={280} className="h-[46%] w-[78%] max-w-2xl" />
      <p className="absolute bottom-8 max-w-[80%] truncate text-center text-sm text-muted">{title}</p>
    </div>
  );
}
