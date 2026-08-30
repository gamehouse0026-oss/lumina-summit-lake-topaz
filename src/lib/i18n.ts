export type UiLang = "en" | "bn";

export const LANGUAGES = [
  { code: "auto", en: "Auto detect", bn: "স্বয়ংক্রিয়" },
  { code: "en", en: "English", bn: "ইংরেজি" },
  { code: "bn", en: "Bengali", bn: "বাংলা" },
  { code: "hi", en: "Hindi", bn: "হিন্দি" },
  { code: "es", en: "Spanish", bn: "স্প্যানিশ" },
  { code: "fr", en: "French", bn: "ফরাসি" },
  { code: "de", en: "German", bn: "জার্মান" },
  { code: "ja", en: "Japanese", bn: "জাপানি" },
  { code: "ko", en: "Korean", bn: "কোরিয়ান" },
  { code: "zh", en: "Chinese", bn: "চীনা" },
  { code: "ar", en: "Arabic", bn: "আরবি" },
  { code: "pt", en: "Portuguese", bn: "পর্তুগিজ" },
  { code: "ru", en: "Russian", bn: "রুশ" },
  { code: "it", en: "Italian", bn: "ইতালীয়" },
  { code: "tr", en: "Turkish", bn: "তুর্কি" },
  { code: "id", en: "Indonesian", bn: "ইন্দোনেশীয়" },
  { code: "th", en: "Thai", bn: "থাই" },
  { code: "vi", en: "Vietnamese", bn: "ভিয়েতনামি" },
  { code: "nl", en: "Dutch", bn: "ডাচ" },
  { code: "pl", en: "Polish", bn: "পোলিশ" },
  { code: "uk", en: "Ukrainian", bn: "ইউক্রেনীয়" },
  { code: "ur", en: "Urdu", bn: "উর্দু" },
  { code: "ta", en: "Tamil", bn: "তামিল" },
  { code: "te", en: "Telugu", bn: "তেলেগু" },
  { code: "mr", en: "Marathi", bn: "মারাঠি" },
  { code: "ms", en: "Malay", bn: "মালয়" },
  { code: "sv", en: "Swedish", bn: "সুইডিশ" },
  { code: "fa", en: "Persian", bn: "ফার্সি" },
] as const;

export type Copy = {
  app: string;
  tagline: string;
  openFiles: string;
  playSample: string;
  liveMic: string;
  dropTitle: string;
  dropHint: string;
  formats: string;
  liveSrt: string;
  stopLive: string;
  transcribe: string;
  translating: string;
  translate: string;
  importSrt: string;
  exportSrt: string;
  bilingual: string;
  captions: string;
  sourceLang: string;
  targetLang: string;
  summary: string;
  generateSummary: string;
  noCues: string;
  generating: string;
  listening: string;
  playlist: string;
  shortcuts: string;
  sampleNote: string;
  aiUnavailable: string;
  cantPlay: string;
  stillTranscribe: string;
  emptyCues: string;
  editCue: string;
  clearCues: string;
  settings: string;
  captionSize: string;
  sizeSm: string;
  sizeMd: string;
  sizeLg: string;
  volume: string;
  speed: string;
  fullscreen: string;
  pip: string;
  mute: string;
  demoCaptions: string;
  words: string;
  detected: string;
  done: string;
  error: string;
  dropOverlay: string;
  audioFile: string;
  videoFile: string;
  liveBadge: string;
  unlimited: string;
  featureLive: string;
  featureAny: string;
  featureExport: string;
  featureTranslate: string;
  cueCount: string;
  seekHint: string;
  micDenied: string;
  noSpeech: string;
};

export const COPY: Record<UiLang, Copy> = {
  en: {
    app: "Lumina",
    tagline: "Any format. Live captions.",
    openFiles: "Open files",
    playSample: "Play sample",
    liveMic: "Live mic",
    dropTitle: "Drop any video or audio",
    dropHint: "Local files stay on this device. Captions generate as the media plays.",
    formats: "MP4 · MKV · MOV · AVI · WEBM · MP3 · WAV · FLAC · AAC · and more",
    liveSrt: "Live SRT",
    stopLive: "Stop live",
    transcribe: "Transcribe file",
    translating: "Translating",
    translate: "Translate",
    importSrt: "Import SRT",
    exportSrt: "Export SRT",
    bilingual: "Bilingual",
    captions: "Captions",
    sourceLang: "Spoken language",
    targetLang: "Translate to",
    summary: "Summary",
    generateSummary: "Summarize",
    noCues: "No captions yet. Start live SRT or transcribe the file.",
    generating: "Writing captions",
    listening: "Listening",
    playlist: "Queue",
    shortcuts: "Shortcuts",
    sampleNote: "Sample film with demo captions. Generate live SRT to caption real speech.",
    aiUnavailable: "AI captioning is unavailable in this environment. Import an SRT or use live mic.",
    cantPlay: "This container will not play in the browser.",
    stillTranscribe: "You can still generate an SRT from the audio track.",
    emptyCues: "Captions will land here, timed to the playhead.",
    editCue: "Edit",
    clearCues: "Clear",
    settings: "Settings",
    captionSize: "Caption size",
    sizeSm: "Small",
    sizeMd: "Medium",
    sizeLg: "Large",
    volume: "Volume",
    speed: "Speed",
    fullscreen: "Fullscreen",
    pip: "Picture in picture",
    mute: "Mute",
    demoCaptions: "Demo captions",
    words: "words",
    detected: "Detected",
    done: "Done",
    error: "Something went wrong",
    dropOverlay: "Release to add to the queue",
    audioFile: "Audio",
    videoFile: "Video",
    liveBadge: "LIVE",
    unlimited: "Unlimited formats",
    featureLive: "Captions appear within seconds of speech.",
    featureAny: "Open almost any video or audio container.",
    featureExport: "Download a clean SRT, timed to the frame.",
    featureTranslate: "Translate into Bangla, English, and 30+ languages.",
    cueCount: "cues",
    seekHint: "Click a cue to seek",
    micDenied: "Microphone permission was denied.",
    noSpeech: "No speech detected in this stretch.",
  },
  bn: {
    app: "Lumina",
    tagline: "যেকোনো ফরম্যাট। লাইভ সাবটাইটেল।",
    openFiles: "ফাইল খুলুন",
    playSample: "স্যাম্পল চালান",
    liveMic: "লাইভ মাইক",
    dropTitle: "যেকোনো ভিডিও বা অডিও ছাড়ুন",
    dropHint: "ফাইল এই ডিভাইসেই থাকে। চলার সাথে সাথে সাবটাইটেল তৈরি হয়।",
    formats: "MP4 · MKV · MOV · AVI · WEBM · MP3 · WAV · FLAC · AAC · আরও",
    liveSrt: "লাইভ SRT",
    stopLive: "লাইভ বন্ধ",
    transcribe: "পুরো ফাইল ট্রান্সক্রাইব",
    translating: "অনুবাদ হচ্ছে",
    translate: "অনুবাদ",
    importSrt: "SRT আমদানি",
    exportSrt: "SRT ডাউনলোড",
    bilingual: "দ্বিভাষিক",
    captions: "সাবটাইটেল",
    sourceLang: "কথ্য ভাষা",
    targetLang: "যে ভাষায় অনুবাদ",
    summary: "সারসংক্ষেপ",
    generateSummary: "সারসংক্ষেপ",
    noCues: "এখনো কোনো ক্যাপশন নেই। লাইভ SRT চালু করুন বা ফাইল ট্রান্সক্রাইব করুন।",
    generating: "ক্যাপশন লেখা হচ্ছে",
    listening: "শুনছে",
    playlist: "কিউ",
    shortcuts: "শর্টকাট",
    sampleNote: "ডেমো ক্যাপশনসহ স্যাম্পল ফিল্ম। আসল কথা ক্যাপশন করতে লাইভ SRT চালান।",
    aiUnavailable: "এই পরিবেশে AI ক্যাপশন নেই। SRT আমদানি করুন বা লাইভ মাইক ব্যবহার করুন।",
    cantPlay: "এই কন্টেইনার ব্রাউজারে চলবে না।",
    stillTranscribe: "অডিও ট্র্যাক থেকে SRT তৈরি করা যাবে।",
    emptyCues: "ক্যাপশন এখানে আসবে, প্লেহেডের সাথে মিলিয়ে।",
    editCue: "সম্পাদনা",
    clearCues: "মুছুন",
    settings: "সেটিংস",
    captionSize: "ক্যাপশনের আকার",
    sizeSm: "ছোট",
    sizeMd: "মাঝারি",
    sizeLg: "বড়",
    volume: "ভলিউম",
    speed: "স্পিড",
    fullscreen: "ফুলস্ক্রিন",
    pip: "পিকচার ইন পিকচার",
    mute: "মিউট",
    demoCaptions: "ডেমো ক্যাপশন",
    words: "শব্দ",
    detected: "শনাক্ত",
    done: "সম্পন্ন",
    error: "কিছু একটা ভুল হয়েছে",
    dropOverlay: "কিউতে যোগ করতে ছেড়ে দিন",
    audioFile: "অডিও",
    videoFile: "ভিডিও",
    liveBadge: "লাইভ",
    unlimited: "আনলিমিটেড ফরম্যাট",
    featureLive: "কথার কয়েক সেকেন্ডের মধ্যে ক্যাপশন আসে।",
    featureAny: "প্রায় সব ভিডিও ও অডিও কন্টেইনার খুলুন।",
    featureExport: "ফ্রেম-মিলিয়ে পরিষ্কার SRT ডাউনলোড করুন।",
    featureTranslate: "বাংলা, ইংরেজিসহ ৩০+ ভাষায় অনুবাদ।",
    cueCount: "কিউ",
    seekHint: "সিঁকে যেতে একটি কিউয়ে ক্লিক করুন",
    micDenied: "মাইক্রোফোনের অনুমতি দেওয়া হয়নি।",
    noSpeech: "এই অংশে কোনো কথা পাওয়া যায়নি।",
  },
};

export function langLabel(code: string, ui: UiLang): string {
  const row = LANGUAGES.find((l) => l.code === code);
  if (!row) return code;
  return ui === "bn" ? row.bn : row.en;
}
