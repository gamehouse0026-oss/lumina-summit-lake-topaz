const VIDEO_EXT = new Set([
  "mp4",
  "m4v",
  "webm",
  "mkv",
  "mov",
  "avi",
  "wmv",
  "flv",
  "ogv",
  "3gp",
  "ts",
  "m2ts",
  "mts",
  "mpg",
  "mpeg",
  "vob",
  "f4v",
  "asf",
]);

const AUDIO_EXT = new Set([
  "mp3",
  "wav",
  "flac",
  "aac",
  "m4a",
  "ogg",
  "opus",
  "wma",
  "aiff",
  "aif",
  "oga",
  "weba",
  "amr",
]);

const NATIVE_PLAYABLE = new Set([
  "mp4",
  "m4v",
  "webm",
  "ogv",
  "mov",
  "mp3",
  "wav",
  "ogg",
  "oga",
  "m4a",
  "aac",
  "flac",
  "opus",
  "weba",
]);

export const ACCEPT_ATTR = [
  "video/*",
  "audio/*",
  ...[...VIDEO_EXT, ...AUDIO_EXT].map((e) => `.${e}`),
].join(",");

export function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}

export function isAudioName(name: string, mime = ""): boolean {
  if (mime.startsWith("audio/")) return true;
  return AUDIO_EXT.has(extOf(name));
}

export function isVideoName(name: string, mime = ""): boolean {
  if (mime.startsWith("video/")) return true;
  return VIDEO_EXT.has(extOf(name));
}

export function isMediaFile(file: File): boolean {
  return (
    isAudioName(file.name, file.type) ||
    isVideoName(file.name, file.type) ||
    file.type.startsWith("video/") ||
    file.type.startsWith("audio/")
  );
}

export function likelyPlayable(name: string, mime = ""): boolean {
  if (NATIVE_PLAYABLE.has(extOf(name))) return true;
  if (mime === "video/mp4" || mime === "video/webm" || mime === "video/ogg") return true;
  if (mime.startsWith("audio/") && mime !== "audio/x-ms-wma") return true;
  return false;
}

export function kindOf(name: string, mime = ""): "video" | "audio" {
  return isAudioName(name, mime) && !isVideoName(name, mime) ? "audio" : "video";
}
