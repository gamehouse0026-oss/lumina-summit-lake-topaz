import { formatSrtTime, uid } from "./utils";

export type Cue = {
  id: string;
  start: number;
  end: number;
  text: string;
  translated?: string;
};

export type SttWord = {
  text: string;
  start: number;
  end: number;
};

export function parseSrt(raw: string): Cue[] {
  const blocks = raw.replace(/^\uFEFF/, "").trim().split(/\r?\n\r?\n/);
  const cues: Cue[] = [];
  for (const block of blocks) {
    const lines = block.split(/\r?\n/).filter((l) => l.length > 0);
    if (lines.length < 2) continue;
    const timeLine = lines[0].includes("-->") ? lines[0] : lines[1];
    const match = timeLine.match(
      /(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/,
    );
    if (!match) continue;
    const start = toSeconds(match[1], match[2], match[3], match[4]);
    const end = toSeconds(match[5], match[6], match[7], match[8]);
    const textStart = lines[0].includes("-->") ? 1 : 2;
    const text = lines.slice(textStart).join("\n").trim();
    if (!text) continue;
    cues.push({ id: uid(), start, end, text });
  }
  return cues.sort((a, b) => a.start - b.start);
}

function toSeconds(h: string, m: string, s: string, ms: string): number {
  const millis = ms.padEnd(3, "0").slice(0, 3);
  return Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(millis) / 1000;
}

export function serializeSrt(cues: Cue[], translated = false): string {
  return cues
    .map((cue, i) => {
      const text = translated ? (cue.translated ?? cue.text) : cue.text;
      return `${i + 1}\n${formatSrtTime(cue.start)} --> ${formatSrtTime(cue.end)}\n${text}`;
    })
    .join("\n\n")
    .concat("\n");
}

export function wordsToCues(words: SttWord[], offset = 0): Cue[] {
  if (words.length === 0) return [];
  const cues: Cue[] = [];
  let bucket: SttWord[] = [];
  const flush = () => {
    if (bucket.length === 0) return;
    const start = bucket[0].start + offset;
    const end = Math.max(bucket[bucket.length - 1].end + offset, start + 0.8);
    const text = bucket
      .map((w) => w.text)
      .join(" ")
      .replace(/\s+([,.!?])/g, "$1")
      .trim();
    if (text) {
      cues.push({ id: uid(), start, end, text });
    }
    bucket = [];
  };

  for (const word of words) {
    if (bucket.length === 0) {
      bucket.push(word);
      continue;
    }
    const span = word.end - bucket[0].start;
    const gap = word.start - bucket[bucket.length - 1].end;
    if (bucket.length >= 12 || span >= 3.6 || gap >= 0.85) {
      flush();
    }
    bucket.push(word);
  }
  flush();
  return cues;
}

export function textToCue(text: string, start: number, end: number): Cue {
  return { id: uid(), start, end, text: text.trim() };
}

export function mergeCues(existing: Cue[], incoming: Cue[]): Cue[] {
  const all = [...existing, ...incoming].sort((a, b) => a.start - b.start);
  const merged: Cue[] = [];
  for (const cue of all) {
    const last = merged[merged.length - 1];
    if (
      last &&
      Math.abs(last.start - cue.start) < 0.35 &&
      similarText(last.text, cue.text)
    ) {
      last.end = Math.max(last.end, cue.end);
      if (cue.text.length > last.text.length) last.text = cue.text;
      continue;
    }
    merged.push({ ...cue });
  }
  return merged;
}

function similarText(a: string, b: string): boolean {
  const na = a.toLowerCase().replace(/\s+/g, " ").trim();
  const nb = b.toLowerCase().replace(/\s+/g, " ").trim();
  return na === nb || na.includes(nb) || nb.includes(na);
}

export function activeCue(cues: Cue[], time: number): Cue | undefined {
  return cues.find((c) => time >= c.start && time < c.end);
}

export const SAMPLE_CUES_EN: Cue[] = [
  {
    id: "s1",
    start: 0.2,
    end: 3.4,
    text: "Lumina reads speech as it plays.",
    translated: "Lumina চলার সাথে সাথে কথা পড়ে।",
  },
  {
    id: "s2",
    start: 3.5,
    end: 7.2,
    text: "Captions appear within about five seconds.",
    translated: "ক্যাপশন আসে প্রায় পাঁচ সেকেন্ডের মধ্যে।",
  },
  {
    id: "s3",
    start: 7.3,
    end: 11.0,
    text: "Translate into Bangla, English, or 30+ languages.",
    translated: "বাংলা, ইংরেজি বা ৩০+ ভাষায় অনুবাদ করুন।",
  },
  {
    id: "s4",
    start: 11.1,
    end: 15.0,
    text: "Export a clean SRT — any format in, timed captions out.",
    translated: "পরিষ্কার SRT এক্সপোর্ট করুন — যেকোনো ফরম্যাট থেকে টাইমড ক্যাপশন।",
  },
];
