const MAX_SECONDS = 8 * 60;
const CHUNK_SECONDS = 40;

export type WavChunk = {
  wav: Blob;
  offset: number;
  duration: number;
};

export async function fileToWavChunks(file: File): Promise<WavChunk[] | null> {
  const decoded = await decodeFile(file);
  if (!decoded) return null;
  const mono = mixToMono(decoded);
  const resampled = await resample(mono, 16000);
  const total = Math.min(resampled.duration, MAX_SECONDS);
  const chunks: WavChunk[] = [];
  let offset = 0;
  while (offset < total - 0.15) {
    const dur = Math.min(CHUNK_SECONDS, total - offset);
    const slice = sliceBuffer(resampled, offset, dur);
    chunks.push({
      wav: encodeWav(slice),
      offset,
      duration: dur,
    });
    offset += dur;
  }
  return chunks;
}

async function decodeFile(file: File): Promise<AudioBuffer | null> {
  const ctx = new AudioContext();
  try {
    const ab = await file.arrayBuffer();
    return await ctx.decodeAudioData(ab.slice(0));
  } catch {
    return null;
  } finally {
    await ctx.close().catch(() => undefined);
  }
}

function mixToMono(buffer: AudioBuffer): AudioBuffer {
  if (buffer.numberOfChannels === 1) return buffer;
  const length = buffer.length;
  const ctx = new OfflineAudioContext(1, length, buffer.sampleRate);
  const mixed = ctx.createBuffer(1, length, buffer.sampleRate);
  const out = mixed.getChannelData(0);
  const channels = Array.from({ length: buffer.numberOfChannels }, (_, i) =>
    buffer.getChannelData(i),
  );
  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (const ch of channels) sum += ch[i] ?? 0;
    out[i] = sum / channels.length;
  }
  return mixed;
}

async function resample(buffer: AudioBuffer, rate: number): Promise<AudioBuffer> {
  if (buffer.sampleRate === rate) return buffer;
  const length = Math.max(1, Math.ceil(buffer.duration * rate));
  const offline = new OfflineAudioContext(1, length, rate);
  const src = offline.createBufferSource();
  src.buffer = buffer;
  src.connect(offline.destination);
  src.start();
  return offline.startRendering();
}

function sliceBuffer(buffer: AudioBuffer, startSec: number, durSec: number): AudioBuffer {
  const rate = buffer.sampleRate;
  const start = Math.floor(startSec * rate);
  const length = Math.max(1, Math.floor(durSec * rate));
  const ctx = new OfflineAudioContext(1, length, rate);
  const out = ctx.createBuffer(1, length, rate);
  const src = buffer.getChannelData(0);
  out.getChannelData(0).set(src.subarray(start, start + length));
  return out;
}

export function encodeWav(buffer: AudioBuffer): Blob {
  const samples = buffer.getChannelData(0);
  const rate = buffer.sampleRate;
  const dataLength = samples.length * 2;
  const ab = new ArrayBuffer(44 + dataLength);
  const view = new DataView(ab);
  writeStr(view, 0, "RIFF");
  view.setUint32(4, 36 + dataLength, true);
  writeStr(view, 8, "WAVE");
  writeStr(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(view, 36, "data");
  view.setUint32(40, dataLength, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i] ?? 0));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  return new Blob([ab], { type: "audio/wav" });
}

function writeStr(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
}

export function recordWindow(stream: MediaStream, ms: number): Promise<Blob> {
  const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
    ? "audio/webm;codecs=opus"
    : MediaRecorder.isTypeSupported("audio/webm")
      ? "audio/webm"
      : "audio/mp4";
  return new Promise((resolve, reject) => {
    const rec = new MediaRecorder(stream, { mimeType: mime });
    const parts: BlobPart[] = [];
    rec.ondataavailable = (e) => {
      if (e.data.size > 0) parts.push(e.data);
    };
    rec.onerror = () => reject(new Error("recorder failed"));
    rec.onstop = () => resolve(new Blob(parts, { type: mime }));
    rec.start();
    window.setTimeout(() => {
      if (rec.state !== "inactive") rec.stop();
    }, ms);
  });
}
