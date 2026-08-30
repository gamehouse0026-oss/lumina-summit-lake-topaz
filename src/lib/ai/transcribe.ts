import { createServerFn } from "@tanstack/react-start";
import type { SttWord } from "@/lib/srt";

export type TranscribeOk = {
  ok: true;
  text: string;
  language: string;
  duration: number;
  words: SttWord[];
};

export type TranscribeErr = { ok: false; error: string };
export type TranscribeResult = TranscribeOk | TranscribeErr;

type SttResponse = {
  text?: string;
  language?: string;
  duration?: number;
  words?: { text?: string; start?: number; end?: number }[];
  error?: string | { message?: string };
};

export const getAiStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { available: Boolean(process.env.XAI_API_KEY) };
});

export const transcribeAudio = createServerFn({ method: "POST" })
  .validator((data: FormData) => data)
  .handler(async ({ data }): Promise<TranscribeResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "AI is not available" };

    const file = data.get("file");
    if (!(file instanceof Blob) || file.size < 64) {
      return { ok: false, error: "No audio in this window" };
    }
    if (file.size > 12 * 1024 * 1024) {
      return { ok: false, error: "Audio chunk is too large" };
    }

    const language = String(data.get("language") ?? "").trim();
    const filename = file instanceof File && file.name ? file.name : "audio.wav";
    const form = new FormData();
    if (language && language !== "auto") {
      form.append("language", language);
      form.append("format", "true");
    }
    form.append("file", file, filename);

    const res = await fetch("https://api.x.ai/v1/stt", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      if (res.status === 401 || res.status === 403) {
        return { ok: false, error: "AI is not available" };
      }
      return { ok: false, error: `Transcription failed (${res.status}) ${body.slice(0, 180)}` };
    }

    const body = (await res.json()) as SttResponse;
    const words: SttWord[] = (body.words ?? [])
      .filter((w) => typeof w.text === "string")
      .map((w) => ({
        text: String(w.text),
        start: Number(w.start) || 0,
        end: Number(w.end) || Number(w.start) || 0,
      }));

    return {
      ok: true,
      text: body.text ?? words.map((w) => w.text).join(" "),
      language: body.language ?? "",
      duration: Number(body.duration) || 0,
      words,
    };
  });
