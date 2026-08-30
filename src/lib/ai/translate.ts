import { createServerFn } from "@tanstack/react-start";

export type TranslateLine = { id: string; text: string };

export const translateCues = createServerFn({ method: "POST" })
  .validator((input: { lines: TranslateLine[]; target: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI is not available" };
    if (data.lines.length === 0) return { ok: true as const, lines: [] as TranslateLine[] };

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.2,
        max_tokens: 1800,
        messages: [
          {
            role: "system",
            content:
              "You translate video captions. Return ONLY a JSON array of {id, text}. Keep meaning, keep line length similar, no notes.",
          },
          {
            role: "user",
            content: `Translate each caption into language code "${data.target}".\n${JSON.stringify(data.lines)}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Translate failed (${res.status})` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = body.choices?.[0]?.message?.content ?? "[]";
    const json = extractJson(raw);
    if (!Array.isArray(json)) {
      return { ok: false as const, error: "Could not parse translation" };
    }
    const lines: TranslateLine[] = json
      .filter((row) => row && typeof row === "object")
      .map((row) => {
        const r = row as { id?: unknown; text?: unknown };
        return { id: String(r.id ?? ""), text: String(r.text ?? "") };
      })
      .filter((row) => row.id && row.text);
    return { ok: true as const, lines };
  });

export const summarizeTranscript = createServerFn({ method: "POST" })
  .validator((input: { text: string; language: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI is not available" };
    const clip = data.text.slice(0, 8000);
    if (!clip.trim()) return { ok: false as const, error: "No transcript yet" };

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.3,
        max_tokens: 420,
        messages: [
          {
            role: "system",
            content:
              "Summarize a video transcript in 3–6 short sentences. No preamble. Write in the requested language.",
          },
          {
            role: "user",
            content: `Language: ${data.language}\n\n${clip}`,
          },
        ],
      }),
    });
    if (!res.ok) return { ok: false as const, error: `Summary failed (${res.status})` };
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    return { ok: true as const, summary: body.choices?.[0]?.message?.content?.trim() ?? "" };
  });

function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  const start = trimmed.indexOf("[");
  const end = trimmed.lastIndexOf("]");
  if (start >= 0 && end > start) {
    try {
      return JSON.parse(trimmed.slice(start, end + 1));
    } catch {
      return null;
    }
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    return null;
  }
}
