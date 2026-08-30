import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as Check, S as ChevronDown, _ as Keyboard, b as Eraser, c as Play, d as PanelRight, f as Minimize, g as Languages, h as LoaderCircle, i as Upload, l as PictureInPicture2, m as Maximize, n as VolumeX, o as Sparkles, p as Mic, r as Volume2, s as Radio, t as X, u as Pause, v as Film, w as Captions, x as Download, y as FileUp } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogPortal$1, i as DialogOverlay$1, n as DialogClose, o as DialogTitle$1, r as DialogContent$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as Viewport, n as ScrollAreaScrollbar, r as ScrollAreaThumb, t as Root } from "../_libs/radix-ui__react-scroll-area.mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-zF6gAY7a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatTimecode(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
	const h = Math.floor(seconds / 3600);
	const m = Math.floor(seconds % 3600 / 60);
	const s = Math.floor(seconds % 60);
	if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
	return `${m}:${String(s).padStart(2, "0")}`;
}
function formatSrtTime(seconds) {
	if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
	const h = Math.floor(seconds / 3600);
	const m = Math.floor(seconds % 3600 / 60);
	const s = Math.floor(seconds % 60);
	const ms = Math.floor((seconds - Math.floor(seconds)) * 1e3);
	return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}
function uid() {
	return crypto.randomUUID();
}
function downloadText(filename, text, mime = "text/plain") {
	const blob = new Blob([text], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "text-fg hover:bg-elevated",
			outline: "text-fg shadow-[var(--shadow-border)] hover:bg-elevated",
			live: "bg-live text-fg hover:opacity-90",
			subtle: "text-muted hover:text-fg hover:bg-elevated"
		},
		size: {
			default: "h-11 rounded-[var(--radius-sm)] px-4 text-sm",
			sm: "h-9 rounded-[var(--radius-xs)] px-3 text-xs",
			lg: "h-12 rounded-[var(--radius-md)] px-5 text-sm",
			icon: "size-11 rounded-[var(--radius-sm)]",
			"icon-sm": "size-9 rounded-[var(--radius-xs)]"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function ScrollArea({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
		className: cn("relative overflow-hidden", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
			orientation: "vertical",
			className: "flex w-2 touch-none p-px select-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
		})]
	});
}
function Select(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select$1, { ...props });
}
function SelectValue(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue$1, { ...props });
}
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-10 w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-40", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted" })
		})]
	});
}
function SelectContent({ className, children, position = "popper", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
		position,
		className: cn("z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[var(--radius-md)] bg-surface text-fg shadow-[var(--shadow-border)]", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: "p-1",
			children
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex cursor-pointer items-center rounded-[var(--radius-xs)] py-2 pr-8 pl-2 text-sm outline-none select-none focus:bg-elevated data-[disabled]:pointer-events-none data-[disabled]:opacity-40", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, {
			className: "absolute right-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
		})]
	});
}
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
		decorative,
		orientation,
		className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full shadow-[var(--shadow-border)] transition-colors duration-[var(--motion-quick)] ease-[var(--ease-out)] data-[state=checked]:bg-accent data-[state=unchecked]:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-4 translate-x-1 rounded-full bg-fg transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] data-[state=checked]:translate-x-5 data-[state=checked]:bg-accent-fg" })
	});
}
var LANGUAGES = [
	{
		code: "auto",
		en: "Auto detect",
		bn: "স্বয়ংক্রিয়"
	},
	{
		code: "en",
		en: "English",
		bn: "ইংরেজি"
	},
	{
		code: "bn",
		en: "Bengali",
		bn: "বাংলা"
	},
	{
		code: "hi",
		en: "Hindi",
		bn: "হিন্দি"
	},
	{
		code: "es",
		en: "Spanish",
		bn: "স্প্যানিশ"
	},
	{
		code: "fr",
		en: "French",
		bn: "ফরাসি"
	},
	{
		code: "de",
		en: "German",
		bn: "জার্মান"
	},
	{
		code: "ja",
		en: "Japanese",
		bn: "জাপানি"
	},
	{
		code: "ko",
		en: "Korean",
		bn: "কোরিয়ান"
	},
	{
		code: "zh",
		en: "Chinese",
		bn: "চীনা"
	},
	{
		code: "ar",
		en: "Arabic",
		bn: "আরবি"
	},
	{
		code: "pt",
		en: "Portuguese",
		bn: "পর্তুগিজ"
	},
	{
		code: "ru",
		en: "Russian",
		bn: "রুশ"
	},
	{
		code: "it",
		en: "Italian",
		bn: "ইতালীয়"
	},
	{
		code: "tr",
		en: "Turkish",
		bn: "তুর্কি"
	},
	{
		code: "id",
		en: "Indonesian",
		bn: "ইন্দোনেশীয়"
	},
	{
		code: "th",
		en: "Thai",
		bn: "থাই"
	},
	{
		code: "vi",
		en: "Vietnamese",
		bn: "ভিয়েতনামি"
	},
	{
		code: "nl",
		en: "Dutch",
		bn: "ডাচ"
	},
	{
		code: "pl",
		en: "Polish",
		bn: "পোলিশ"
	},
	{
		code: "uk",
		en: "Ukrainian",
		bn: "ইউক্রেনীয়"
	},
	{
		code: "ur",
		en: "Urdu",
		bn: "উর্দু"
	},
	{
		code: "ta",
		en: "Tamil",
		bn: "তামিল"
	},
	{
		code: "te",
		en: "Telugu",
		bn: "তেলেগু"
	},
	{
		code: "mr",
		en: "Marathi",
		bn: "মারাঠি"
	},
	{
		code: "ms",
		en: "Malay",
		bn: "মালয়"
	},
	{
		code: "sv",
		en: "Swedish",
		bn: "সুইডিশ"
	},
	{
		code: "fa",
		en: "Persian",
		bn: "ফার্সি"
	}
];
var COPY = {
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
		noSpeech: "No speech detected in this stretch."
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
		noSpeech: "এই অংশে কোনো কথা পাওয়া যায়নি।"
	}
};
function langLabel(code, ui) {
	const row = LANGUAGES.find((l) => l.code === code);
	if (!row) return code;
	return ui === "bn" ? row.bn : row.en;
}
function CaptionDock(props) {
	const t = COPY[props.ui];
	const fileRef = (0, import_react.useRef)(null);
	const busy = props.live || props.generating || props.translating;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full min-h-0 w-full flex-col bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.16em] text-muted uppercase",
					children: t.captions
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-sm text-fg",
					children: [
						props.cues.length,
						" ",
						t.cueCount,
						props.detectedLang ? ` · ${t.detected} ${props.detectedLang}` : ""
					]
				})] }), props.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 text-[10px] font-medium tracking-wider text-live uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-live" }), t.liveBadge]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "col-span-1 text-xs text-muted",
					children: [t.sourceLang, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: props.sourceLang,
							onValueChange: props.onSourceLang,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: l.code,
								children: langLabel(l.code, props.ui)
							}, l.code)) })]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "col-span-1 text-xs text-muted",
					children: [t.targetLang, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: props.targetLang,
							onValueChange: props.onTargetLang,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: LANGUAGES.filter((l) => l.code !== "auto").map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: l.code,
								children: langLabel(l.code, props.ui)
							}, l.code)) })]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 px-3 pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: props.live ? "live" : "default",
						onClick: props.onLive,
						disabled: !props.hasMedia || props.generating,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4" }), props.live ? t.stopLive : t.liveSrt]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							onClick: props.onTranscribe,
							disabled: !props.hasMedia || busy,
							children: [props.generating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { className: "size-4" }), t.transcribe]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							onClick: props.onTranslate,
							disabled: props.cues.length === 0 || busy,
							children: [props.translating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-4" }), t.translate]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => fileRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-4" }), t.importSrt]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: props.onExport,
							disabled: props.cues.length === 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), t.exportSrt]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: ".srt,.vtt,text/plain",
						className: "hidden",
						onChange: (e) => {
							const file = e.target.files?.[0];
							if (file) props.onImport(file);
							e.target.value = "";
						}
					}),
					props.aiAvailable === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-muted",
						children: t.aiUnavailable
					}) : null,
					props.status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: props.status
					}) : null,
					props.generating || props.progress > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 overflow-hidden rounded-full bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent transition-[width] duration-[var(--motion-fast)]",
							style: { width: `${Math.min(100, props.progress)}%` }
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-fg",
					children: t.bilingual
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: props.bilingual,
					onCheckedChange: props.onBilingual
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 px-4 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-fg",
					children: t.captionSize
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded-[var(--radius-sm)] bg-elevated p-0.5",
					children: [
						"sm",
						"md",
						"lg"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => props.onCaptionSize(s),
						className: cn("h-8 min-w-9 rounded-[6px] px-2 text-xs", props.captionSize === s ? "bg-accent text-accent-fg" : "text-muted"),
						children: s === "sm" ? t.sizeSm : s === "md" ? t.sizeMd : t.sizeLg
					}, s))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-1 p-2",
					children: props.cues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-8 text-center text-sm text-muted",
						children: t.emptyCues
					}) : props.cues.map((cue) => {
						const on = props.currentTime >= cue.start && props.currentTime < cue.end;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => props.onSeek(cue.start),
							className: cn("w-full rounded-[var(--radius-sm)] px-3 py-2.5 text-left transition-colors duration-[var(--motion-quick)]", on ? "bg-elevated" : "hover:bg-elevated/60"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[10px] tabular-nums text-subtle",
									children: [
										formatTimecode(cue.start),
										" → ",
										formatTimecode(cue.end)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-snug text-fg",
									contentEditable: true,
									suppressContentEditableWarning: true,
									onBlur: (e) => props.onEdit(cue.id, e.currentTarget.textContent ?? cue.text),
									onClick: (e) => e.stopPropagation(),
									children: cue.text
								}),
								cue.translated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs leading-snug text-muted",
									children: cue.translated
								}) : null
							]
						}, cue.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "flex-1",
						onClick: props.onSummarize,
						disabled: props.cues.length === 0 || busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), t.generateSummary]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: props.onClear,
						disabled: props.cues.length === 0,
						"aria-label": t.clearCues,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "size-4" })
					})]
				}), props.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-[var(--radius-sm)] bg-elevated px-3 py-2 text-xs leading-relaxed text-muted text-pretty",
					children: props.summary
				}) : null]
			})
		]
	});
}
function parseSrt(raw) {
	const blocks = raw.replace(/^\uFEFF/, "").trim().split(/\r?\n\r?\n/);
	const cues = [];
	for (const block of blocks) {
		const lines = block.split(/\r?\n/).filter((l) => l.length > 0);
		if (lines.length < 2) continue;
		const match = (lines[0].includes("-->") ? lines[0] : lines[1]).match(/(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/);
		if (!match) continue;
		const start = toSeconds(match[1], match[2], match[3], match[4]);
		const end = toSeconds(match[5], match[6], match[7], match[8]);
		const textStart = lines[0].includes("-->") ? 1 : 2;
		const text = lines.slice(textStart).join("\n").trim();
		if (!text) continue;
		cues.push({
			id: uid(),
			start,
			end,
			text
		});
	}
	return cues.sort((a, b) => a.start - b.start);
}
function toSeconds(h, m, s, ms) {
	const millis = ms.padEnd(3, "0").slice(0, 3);
	return Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(millis) / 1e3;
}
function serializeSrt(cues, translated = false) {
	return cues.map((cue, i) => {
		const text = translated ? cue.translated ?? cue.text : cue.text;
		return `${i + 1}\n${formatSrtTime(cue.start)} --> ${formatSrtTime(cue.end)}\n${text}`;
	}).join("\n\n").concat("\n");
}
function wordsToCues(words, offset = 0) {
	if (words.length === 0) return [];
	const cues = [];
	let bucket = [];
	const flush = () => {
		if (bucket.length === 0) return;
		const start = bucket[0].start + offset;
		const end = Math.max(bucket[bucket.length - 1].end + offset, start + .8);
		const text = bucket.map((w) => w.text).join(" ").replace(/\s+([,.!?])/g, "$1").trim();
		if (text) cues.push({
			id: uid(),
			start,
			end,
			text
		});
		bucket = [];
	};
	for (const word of words) {
		if (bucket.length === 0) {
			bucket.push(word);
			continue;
		}
		const span = word.end - bucket[0].start;
		const gap = word.start - bucket[bucket.length - 1].end;
		if (bucket.length >= 12 || span >= 3.6 || gap >= .85) flush();
		bucket.push(word);
	}
	flush();
	return cues;
}
function textToCue(text, start, end) {
	return {
		id: uid(),
		start,
		end,
		text: text.trim()
	};
}
function mergeCues(existing, incoming) {
	const all = [...existing, ...incoming].sort((a, b) => a.start - b.start);
	const merged = [];
	for (const cue of all) {
		const last = merged[merged.length - 1];
		if (last && Math.abs(last.start - cue.start) < .35 && similarText(last.text, cue.text)) {
			last.end = Math.max(last.end, cue.end);
			if (cue.text.length > last.text.length) last.text = cue.text;
			continue;
		}
		merged.push({ ...cue });
	}
	return merged;
}
function similarText(a, b) {
	const na = a.toLowerCase().replace(/\s+/g, " ").trim();
	const nb = b.toLowerCase().replace(/\s+/g, " ").trim();
	return na === nb || na.includes(nb) || nb.includes(na);
}
function activeCue(cues, time) {
	return cues.find((c) => time >= c.start && time < c.end);
}
var SAMPLE_CUES_EN = [
	{
		id: "s1",
		start: .2,
		end: 3.4,
		text: "Lumina reads speech as it plays.",
		translated: "Lumina চলার সাথে সাথে কথা পড়ে।"
	},
	{
		id: "s2",
		start: 3.5,
		end: 7.2,
		text: "Captions appear within about five seconds.",
		translated: "ক্যাপশন আসে প্রায় পাঁচ সেকেন্ডের মধ্যে।"
	},
	{
		id: "s3",
		start: 7.3,
		end: 11,
		text: "Translate into Bangla, English, or 30+ languages.",
		translated: "বাংলা, ইংরেজি বা ৩০+ ভাষায় অনুবাদ করুন।"
	},
	{
		id: "s4",
		start: 11.1,
		end: 15,
		text: "Export a clean SRT — any format in, timed captions out.",
		translated: "পরিষ্কার SRT এক্সপোর্ট করুন — যেকোনো ফরম্যাট থেকে টাইমড ক্যাপশন।"
	}
];
var sizeClass = {
	sm: "text-sm sm:text-base",
	md: "text-base sm:text-lg",
	lg: "text-lg sm:text-xl"
};
function CaptionOverlay({ cues, time, bilingual, size, visible }) {
	if (!visible) return null;
	const cue = activeCue(cues, time);
	if (!cue) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-x-0 bottom-16 z-10 flex justify-center px-4 sm:bottom-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("max-w-[min(920px,92%)] rounded-[var(--radius-md)] bg-bg/78 px-4 py-2.5 text-center text-fg shadow-[var(--shadow-border)]", sizeClass[size]),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium leading-snug text-balance",
				children: cue.text
			}), bilingual && cue.translated && cue.translated !== cue.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[0.85em] leading-snug text-muted text-pretty",
				children: cue.translated
			}) : null]
		})
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-3.5 rounded-full bg-accent shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50" })]
	});
}
function TooltipProvider({ delayDuration = 280, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		...props
	});
}
function Tooltip({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, { ...props });
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, { ...props });
}
function TooltipContent({ className, sideOffset = 8, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 rounded-[var(--radius-sm)] bg-elevated px-2.5 py-1.5 text-xs text-fg shadow-[var(--shadow-border)]", "origin-[var(--radix-tooltip-content-transform-origin)]", className),
		...props
	}) });
}
var RATES = [
	.5,
	.75,
	1,
	1.25,
	1.5,
	2
];
function Controls({ ui, paused, currentTime, duration, volume, muted, rate, showCaptions, fullscreen, cues, onToggle, onSeek, onVolume, onMute, onRate, onCaptions, onFullscreen, onPip }) {
	const t = COPY[ui];
	const max = duration > 0 ? duration : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-bg via-bg/80 to-transparent px-3 pt-10 pb-3 sm:px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-2 h-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-1.5 h-1 overflow-hidden rounded-full bg-elevated",
				children: cues.map((cue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-0 h-full bg-accent/35",
					style: {
						left: `${cue.start / max * 100}%`,
						width: `${Math.max(.4, (cue.end - cue.start) / max * 100)}%`
					}
				}, cue.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				min: 0,
				max,
				step: .05,
				value: [currentTime],
				onValueChange: (v) => onSeek(v[0] ?? 0),
				className: "absolute inset-x-0 top-1",
				"aria-label": "Seek"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						onClick: onToggle,
						"aria-label": paused ? "Play" : "Pause",
						children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "ml-0.5 size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: paused ? "Play" : "Pause" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-[5.6rem] px-1 font-mono text-xs tabular-nums text-muted",
					children: [
						formatTimecode(currentTime),
						" / ",
						formatTimecode(duration)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-1 hidden items-center gap-2 sm:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						onClick: onMute,
						"aria-label": t.mute,
						children: muted || volume === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 0,
						max: 1,
						step: .01,
						value: [muted ? 0 : volume],
						onValueChange: (v) => onVolume(v[0] ?? 0),
						className: "w-24",
						"aria-label": t.volume
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-0.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: String(rate),
							onChange: (e) => onRate(Number(e.target.value)),
							className: "h-9 rounded-[var(--radius-xs)] bg-transparent px-1.5 text-xs text-muted outline-none hover:text-fg",
							"aria-label": t.speed,
							children: RATES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: r,
								className: "bg-surface text-fg",
								children: [r, "x"]
							}, r))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								onClick: onCaptions,
								"aria-label": t.captions,
								className: cn(showCaptions && "text-accent"),
								children: showCaptions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { className: "size-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: t.captions })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								onClick: onPip,
								"aria-label": t.pip,
								className: "hidden sm:inline-flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PictureInPicture2, { className: "size-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: t.pip })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								onClick: onFullscreen,
								"aria-label": t.fullscreen,
								children: fullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "size-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: t.fullscreen })] })
					]
				})
			]
		})]
	});
}
function EmptyState({ ui, onOpen, onSample, onMic }) {
	const t = COPY[ui];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full min-h-0 flex-col items-center justify-center px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full max-w-xl flex-col items-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("mb-8 flex size-16 items-center justify-center rounded-[var(--radius-lg)]", "bg-elevated shadow-[var(--shadow-border)]"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, {
						className: "size-7 text-fg",
						strokeWidth: 1.5
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
					children: t.unlimited
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-3 max-w-md text-4xl leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-balance sm:text-5xl",
					children: t.dropTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-sm leading-[var(--leading-normal)] text-pretty text-muted",
					children: t.dropHint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-subtle",
					children: t.formats
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: onOpen,
							className: "h-12 flex-1 sm:flex-none sm:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), t.openFiles]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							onClick: onSample,
							className: "h-12 flex-1 sm:flex-none sm:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "size-4" }), t.playSample]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: onMic,
							className: "h-12 flex-1 sm:flex-none sm:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), t.liveMic]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-12 grid w-full max-w-lg gap-3 text-left sm:grid-cols-2",
					children: [
						t.featureLive,
						t.featureAny,
						t.featureExport,
						t.featureTranslate
					].map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-[var(--radius-md)] bg-surface px-4 py-3 text-sm leading-snug text-muted shadow-[var(--shadow-border)]",
						children: line
					}, line))
				})
			]
		})
	});
}
function TopBar({ ui, panelOpen, onTogglePanel, onToggleUi, onShortcuts, onOpen }) {
	const t = COPY[ui];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-14 shrink-0 items-center gap-3 px-4 sm:h-16 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-8 items-center justify-center rounded-[var(--radius-sm)] bg-elevated shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { className: "size-4 text-fg" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg leading-none tracking-[var(--tracking-display)]",
					children: t.app
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 hidden truncate text-xs text-muted sm:block",
					children: t.tagline
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ml-auto flex items-center gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mr-1 flex rounded-[var(--radius-sm)] bg-elevated p-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => ui !== "bn" && onToggleUi(),
						className: cn("h-8 min-w-9 rounded-[6px] px-2 text-xs", ui === "bn" ? "bg-accent text-accent-fg" : "text-muted"),
						children: "বাং"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => ui !== "en" && onToggleUi(),
						className: cn("h-8 min-w-9 rounded-[6px] px-2 text-xs", ui === "en" ? "bg-accent text-accent-fg" : "text-muted"),
						children: "EN"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					onClick: onShortcuts,
					"aria-label": t.shortcuts,
					className: "hidden sm:inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: onOpen,
					className: "hidden sm:inline-flex",
					children: t.openFiles
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					onClick: onTogglePanel,
					"aria-label": t.captions,
					className: cn(panelOpen && "text-accent"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRight, { className: "size-4" })
				})
			]
		})]
	});
}
function Visualizer({ graph, active, title }) {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
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
			const barW = (width - 188) / bars;
			for (let i = 0; i < bars; i++) {
				const v = (data[i * step] ?? 0) / 255;
				const h = Math.max(4, v * height * .72);
				const x = i * (barW + gap);
				const y = (height - h) / 2;
				ctx.fillStyle = `rgba(244, 241, 234, ${.18 + v * .55})`;
				ctx.fillRect(x, y, barW, h);
			}
			raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(raf);
	}, [graph, active]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full min-h-[220px] w-full items-center justify-center bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			width: 720,
			height: 280,
			className: "h-[46%] w-[78%] max-w-2xl"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "absolute bottom-8 max-w-[80%] truncate text-center text-sm text-muted",
			children: title
		})]
	});
}
function Dialog(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, { ...props });
}
function DialogPortal(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, { ...props });
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-bg/70", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xl)] bg-surface p-5 text-fg shadow-[var(--shadow-border)]", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 rounded-[var(--radius-xs)] p-2 text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl tracking-[var(--tracking-display)]", className),
		...props
	});
}
function Sheet(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, { ...props });
}
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, { className: "fixed inset-0 z-50 bg-bg/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent$1, {
		className: cn("fixed z-50 bg-surface text-fg shadow-[var(--shadow-border)]", side === "right" && "inset-y-0 right-0 h-full w-[min(100%,380px)]", side === "bottom" && "inset-x-0 bottom-0 max-h-[78vh] rounded-t-[var(--radius-xl)]", className),
		...props,
		children
	})] });
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getAiStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("93d98280c9a9b384250e066ba9aaa3aa49c0d307c6c6b002a4cb0ab03e7107c0"));
var transcribeAudio = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("a9ea6aa6844e8ad41c163c119ff6b3f7868f3fb568dd63af378eaebdd00561ae"));
var translateCues = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("b7ba596e6924a251ee7b4ad7894da4335e29217f2ce0c5816b7bf9ea49d1b60b"));
var summarizeTranscript = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("f709d63662aa300f4cf8f6ab9fcd685538601855c0bc7ea2450773b8bc2686f4"));
var MediaAudioGraph = class {
	ctx;
	source;
	analyser;
	recDest;
	connected = true;
	constructor(el) {
		this.ctx = new AudioContext();
		this.source = this.ctx.createMediaElementSource(el);
		this.analyser = this.ctx.createAnalyser();
		this.analyser.fftSize = 256;
		this.recDest = this.ctx.createMediaStreamDestination();
		this.source.connect(this.analyser);
		this.analyser.connect(this.ctx.destination);
		this.analyser.connect(this.recDest);
	}
	async resume() {
		if (this.ctx.state === "suspended") await this.ctx.resume();
	}
	disconnect() {
		if (!this.connected) return;
		this.connected = false;
		try {
			this.source.disconnect();
			this.analyser.disconnect();
		} catch {}
		this.ctx.close();
	}
};
var graphs = /* @__PURE__ */ new WeakMap();
function ensureGraph(el) {
	const existing = graphs.get(el);
	if (existing && existing.ctx.state !== "closed") return existing;
	const graph = new MediaAudioGraph(el);
	graphs.set(el, graph);
	return graph;
}
var MAX_SECONDS = 480;
var CHUNK_SECONDS = 40;
async function fileToWavChunks(file) {
	const decoded = await decodeFile(file);
	if (!decoded) return null;
	const resampled = await resample(mixToMono(decoded), 16e3);
	const total = Math.min(resampled.duration, MAX_SECONDS);
	const chunks = [];
	let offset = 0;
	while (offset < total - .15) {
		const dur = Math.min(CHUNK_SECONDS, total - offset);
		const slice = sliceBuffer(resampled, offset, dur);
		chunks.push({
			wav: encodeWav(slice),
			offset,
			duration: dur
		});
		offset += dur;
	}
	return chunks;
}
async function decodeFile(file) {
	const ctx = new AudioContext();
	try {
		const ab = await file.arrayBuffer();
		return await ctx.decodeAudioData(ab.slice(0));
	} catch {
		return null;
	} finally {
		await ctx.close().catch(() => void 0);
	}
}
function mixToMono(buffer) {
	if (buffer.numberOfChannels === 1) return buffer;
	const length = buffer.length;
	const mixed = new OfflineAudioContext(1, length, buffer.sampleRate).createBuffer(1, length, buffer.sampleRate);
	const out = mixed.getChannelData(0);
	const channels = Array.from({ length: buffer.numberOfChannels }, (_, i) => buffer.getChannelData(i));
	for (let i = 0; i < length; i++) {
		let sum = 0;
		for (const ch of channels) sum += ch[i] ?? 0;
		out[i] = sum / channels.length;
	}
	return mixed;
}
async function resample(buffer, rate) {
	if (buffer.sampleRate === rate) return buffer;
	const length = Math.max(1, Math.ceil(buffer.duration * rate));
	const offline = new OfflineAudioContext(1, length, rate);
	const src = offline.createBufferSource();
	src.buffer = buffer;
	src.connect(offline.destination);
	src.start();
	return offline.startRendering();
}
function sliceBuffer(buffer, startSec, durSec) {
	const rate = buffer.sampleRate;
	const start = Math.floor(startSec * rate);
	const length = Math.max(1, Math.floor(durSec * rate));
	const out = new OfflineAudioContext(1, length, rate).createBuffer(1, length, rate);
	const src = buffer.getChannelData(0);
	out.getChannelData(0).set(src.subarray(start, start + length));
	return out;
}
function encodeWav(buffer) {
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
		view.setInt16(offset, s < 0 ? s * 32768 : s * 32767, true);
		offset += 2;
	}
	return new Blob([ab], { type: "audio/wav" });
}
function writeStr(view, offset, str) {
	for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
}
function recordWindow(stream, ms) {
	const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
	return new Promise((resolve, reject) => {
		const rec = new MediaRecorder(stream, { mimeType: mime });
		const parts = [];
		rec.ondataavailable = (e) => {
			if (e.data.size > 0) parts.push(e.data);
		};
		rec.onerror = () => reject(/* @__PURE__ */ new Error("recorder failed"));
		rec.onstop = () => resolve(new Blob(parts, { type: mime }));
		rec.start();
		window.setTimeout(() => {
			if (rec.state !== "inactive") rec.stop();
		}, ms);
	});
}
var VIDEO_EXT = /* @__PURE__ */ new Set([
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
	"asf"
]);
var AUDIO_EXT = /* @__PURE__ */ new Set([
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
	"amr"
]);
var NATIVE_PLAYABLE = /* @__PURE__ */ new Set([
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
	"weba"
]);
var ACCEPT_ATTR = [
	"video/*",
	"audio/*",
	...[...VIDEO_EXT, ...AUDIO_EXT].map((e) => `.${e}`)
].join(",");
function extOf(name) {
	const i = name.lastIndexOf(".");
	return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}
function isAudioName(name, mime = "") {
	if (mime.startsWith("audio/")) return true;
	return AUDIO_EXT.has(extOf(name));
}
function isVideoName(name, mime = "") {
	if (mime.startsWith("video/")) return true;
	return VIDEO_EXT.has(extOf(name));
}
function isMediaFile(file) {
	return isAudioName(file.name, file.type) || isVideoName(file.name, file.type) || file.type.startsWith("video/") || file.type.startsWith("audio/");
}
function likelyPlayable(name, mime = "") {
	if (NATIVE_PLAYABLE.has(extOf(name))) return true;
	if (mime === "video/mp4" || mime === "video/webm" || mime === "video/ogg") return true;
	if (mime.startsWith("audio/") && mime !== "audio/x-ms-wma") return true;
	return false;
}
function kindOf(name, mime = "") {
	return isAudioName(name, mime) && !isVideoName(name, mime) ? "audio" : "video";
}
var SETTINGS_KEY = "lumina-settings";
var usePlayer = create((set, get) => ({
	uiLang: "bn",
	sourceLang: "auto",
	targetLang: "bn",
	captionSize: "md",
	bilingual: true,
	showCaptions: true,
	volume: .9,
	muted: false,
	rate: 1,
	panelOpen: true,
	media: null,
	queue: [],
	cues: [],
	currentTime: 0,
	duration: 0,
	paused: true,
	live: false,
	generating: false,
	translating: false,
	progress: 0,
	status: "",
	summary: "",
	aiAvailable: null,
	playable: true,
	detectedLang: "",
	dragging: false,
	setUiLang: (uiLang) => {
		set({ uiLang });
		get().persistSettings();
	},
	setSourceLang: (sourceLang) => {
		set({ sourceLang });
		get().persistSettings();
	},
	setTargetLang: (targetLang) => {
		set({ targetLang });
		get().persistSettings();
	},
	setCaptionSize: (captionSize) => {
		set({ captionSize });
		get().persistSettings();
	},
	setBilingual: (bilingual) => {
		set({ bilingual });
		get().persistSettings();
	},
	setShowCaptions: (showCaptions) => set({ showCaptions }),
	setVolume: (volume) => {
		set({
			volume,
			muted: volume === 0
		});
		get().persistSettings();
	},
	setMuted: (muted) => set({ muted }),
	setRate: (rate) => {
		set({ rate });
		get().persistSettings();
	},
	setPanelOpen: (panelOpen) => set({ panelOpen }),
	setMedia: (media) => set({
		media,
		cues: [],
		summary: "",
		currentTime: 0,
		duration: 0,
		paused: true,
		live: false,
		generating: false,
		progress: 0,
		status: "",
		detectedLang: "",
		playable: media ? media.playable : true
	}),
	addToQueue: (items) => set((s) => ({ queue: [...s.queue, ...items] })),
	removeFromQueue: (id) => set((s) => {
		const queue = s.queue.filter((q) => q.id !== id);
		const media = s.media?.id === id ? queue[0] ?? null : s.media;
		return {
			queue,
			media,
			playable: media?.playable ?? true
		};
	}),
	setCues: (cues) => set((s) => ({ cues: typeof cues === "function" ? cues(s.cues) : cues })),
	setCurrentTime: (currentTime) => set({ currentTime }),
	setDuration: (duration) => set({ duration }),
	setPaused: (paused) => set({ paused }),
	setLive: (live) => set({ live }),
	setGenerating: (generating) => set({ generating }),
	setTranslating: (translating) => set({ translating }),
	setProgress: (progress) => set({ progress }),
	setStatus: (status) => set({ status }),
	setSummary: (summary) => set({ summary }),
	setAiAvailable: (aiAvailable) => set({ aiAvailable }),
	setPlayable: (playable) => set({ playable }),
	setDetectedLang: (detectedLang) => set({ detectedLang }),
	setDragging: (dragging) => set({ dragging }),
	hydrateSettings: () => {
		try {
			const raw = localStorage.getItem(SETTINGS_KEY);
			if (!raw) return;
			const parsed = JSON.parse(raw);
			set({
				uiLang: parsed.uiLang === "en" ? "en" : "bn",
				sourceLang: parsed.sourceLang ?? "auto",
				targetLang: parsed.targetLang ?? "bn",
				captionSize: parsed.captionSize ?? "md",
				bilingual: parsed.bilingual ?? true,
				volume: typeof parsed.volume === "number" ? parsed.volume : .9,
				rate: typeof parsed.rate === "number" ? parsed.rate : 1
			});
		} catch {}
	},
	persistSettings: () => {
		const s = get();
		const data = {
			uiLang: s.uiLang,
			sourceLang: s.sourceLang,
			targetLang: s.targetLang,
			captionSize: s.captionSize,
			bilingual: s.bilingual,
			volume: s.volume,
			rate: s.rate
		};
		try {
			localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
		} catch {}
	}
}));
function filesToItems(files) {
	return files.map((file) => ({
		id: crypto.randomUUID(),
		name: file.name,
		kind: kindOf(file.name, file.type),
		mime: file.type,
		url: URL.createObjectURL(file),
		playable: likelyPlayable(file.name, file.type),
		file
	}));
}
var SAMPLE_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
var LIVE_WINDOW_MS = 5e3;
function PlayerApp() {
	const store = usePlayer();
	const t = COPY[store.uiLang];
	const mediaRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const liveRef = (0, import_react.useRef)(false);
	const graphRef = (0, import_react.useRef)(null);
	const recRef = (0, import_react.useRef)(null);
	const [fullscreen, setFullscreen] = (0, import_react.useState)(false);
	const [shortcuts, setShortcuts] = (0, import_react.useState)(false);
	const [mobileDock, setMobileDock] = (0, import_react.useState)(false);
	const stageRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		store.hydrateSettings();
		getAiStatus().then((s) => store.setAiAvailable(s.available));
	}, []);
	const attachFiles = (0, import_react.useCallback)((list) => {
		const files = [...list].filter(isMediaFile);
		if (files.length === 0) {
			toast.error(t.cantPlay);
			return;
		}
		const items = filesToItems(files);
		store.addToQueue(items);
		store.setMedia(items[0] ?? null);
	}, [store, t.cantPlay]);
	(0, import_react.useEffect)(() => {
		const onDragOver = (e) => {
			if (e.dataTransfer?.types.includes("Files")) {
				e.preventDefault();
				store.setDragging(true);
			}
		};
		const onDragLeave = () => store.setDragging(false);
		const onDrop = (e) => {
			e.preventDefault();
			store.setDragging(false);
			if (e.dataTransfer?.files) attachFiles(e.dataTransfer.files);
		};
		window.addEventListener("dragover", onDragOver);
		window.addEventListener("dragleave", onDragLeave);
		window.addEventListener("drop", onDrop);
		return () => {
			window.removeEventListener("dragover", onDragOver);
			window.removeEventListener("dragleave", onDragLeave);
			window.removeEventListener("drop", onDrop);
		};
	}, [attachFiles, store]);
	const media = store.media;
	(0, import_react.useEffect)(() => {
		const node = mediaRef.current;
		if (!node || !media) return;
		if (media.url) {
			node.src = media.url;
			node.crossOrigin = media.isSample ? "anonymous" : null;
			node.load();
		}
		store.setPaused(true);
	}, [media?.id]);
	(0, import_react.useEffect)(() => {
		const node = mediaRef.current;
		if (!node) return;
		node.volume = store.volume;
		node.muted = store.muted;
		node.playbackRate = store.rate;
	}, [
		store.volume,
		store.muted,
		store.rate,
		media
	]);
	const bindGraph = (0, import_react.useCallback)(async () => {
		const node = mediaRef.current;
		if (!node) return null;
		try {
			const graph = ensureGraph(node);
			graphRef.current = graph;
			await graph.resume();
			return graph;
		} catch {
			return null;
		}
	}, []);
	const applyResult = (0, import_react.useCallback)((text, words, offset, language) => {
		let incoming = [];
		if (words.length > 0) incoming = wordsToCues(words, offset);
		else if (text.trim()) incoming = [textToCue(text.trim(), offset, offset + 4.8)];
		if (incoming.length === 0) return;
		store.setCues((prev) => mergeCues(prev, incoming));
		if (language) store.setDetectedLang(language);
	}, [store]);
	const sendBlob = (0, import_react.useCallback)(async (blob, offset, filename) => {
		const fd = new FormData();
		fd.append("language", store.sourceLang);
		fd.append("file", blob, filename);
		const result = await transcribeAudio({ data: fd });
		if (!result.ok) {
			if (result.error !== "No audio in this window") toast.error(result.error);
			return;
		}
		applyResult(result.text, result.words, offset, result.language);
	}, [applyResult, store.sourceLang]);
	const stopLive = (0, import_react.useCallback)(() => {
		liveRef.current = false;
		recRef.current?.stop();
		recRef.current = null;
		store.setLive(false);
		store.setStatus("");
	}, [store]);
	const startLive = (0, import_react.useCallback)(async () => {
		if (liveRef.current) {
			stopLive();
			return;
		}
		if (store.aiAvailable === false) {
			toast.error(t.aiUnavailable);
			return;
		}
		const node = mediaRef.current;
		if (!node) return;
		const graph = await bindGraph();
		if (!graph) {
			toast.error(t.error);
			return;
		}
		liveRef.current = true;
		store.setLive(true);
		store.setStatus(t.listening);
		if (node.paused) try {
			await node.play();
		} catch {}
		(async () => {
			while (liveRef.current) {
				if (node.paused) {
					await sleep(200);
					continue;
				}
				const start = node.currentTime;
				try {
					const blob = await recordWindow(graph.recDest.stream, LIVE_WINDOW_MS);
					if (!liveRef.current) break;
					if (blob.size > 400) {
						const ext = blob.type.includes("mp4") ? "m4a" : "webm";
						await sendBlob(blob, Math.max(0, start), `live.${ext}`);
					}
				} catch {
					await sleep(400);
				}
			}
		})();
	}, [
		bindGraph,
		sendBlob,
		stopLive,
		store,
		t.aiUnavailable,
		t.error,
		t.listening
	]);
	const transcribeFile = (0, import_react.useCallback)(async () => {
		if (!media) return;
		if (store.aiAvailable === false) {
			toast.error(t.aiUnavailable);
			return;
		}
		store.setGenerating(true);
		store.setProgress(4);
		store.setStatus(t.generating);
		try {
			if (media.file) {
				const chunks = await fileToWavChunks(media.file);
				if (chunks && chunks.length > 0) {
					for (let i = 0; i < chunks.length; i++) {
						store.setProgress((i + .2) / chunks.length * 100);
						await sendBlob(chunks[i].wav, chunks[i].offset, `part-${i}.wav`);
					}
					store.setProgress(100);
					store.setStatus(t.done);
					return;
				}
				if (media.file.size < 12582912) {
					await sendBlob(media.file, 0, media.file.name);
					store.setProgress(100);
					store.setStatus(t.done);
					return;
				}
			}
			const node = mediaRef.current;
			const graph = await bindGraph();
			if (!node || !graph) throw new Error("graph");
			if (node.paused) await node.play().catch(() => void 0);
			const start = node.currentTime;
			const blob = await recordWindow(graph.recDest.stream, 8e3);
			await sendBlob(blob, Math.max(0, start), "window.webm");
			store.setProgress(100);
			store.setStatus(t.done);
		} catch {
			toast.error(t.error);
		} finally {
			store.setGenerating(false);
		}
	}, [
		bindGraph,
		media,
		sendBlob,
		store,
		t.aiUnavailable,
		t.done,
		t.error,
		t.generating
	]);
	const onTranslate = (0, import_react.useCallback)(async () => {
		if (store.cues.length === 0) return;
		store.setTranslating(true);
		try {
			const batchSize = 28;
			const next = store.cues.map((c) => ({ ...c }));
			for (let i = 0; i < next.length; i += batchSize) {
				const result = await translateCues({ data: {
					lines: next.slice(i, i + batchSize).map((c) => ({
						id: c.id,
						text: c.text
					})),
					target: store.targetLang
				} });
				if (!result.ok) {
					toast.error(result.error);
					break;
				}
				const map = new Map(result.lines.map((l) => [l.id, l.text]));
				for (const cue of next) {
					const tr = map.get(cue.id);
					if (tr) cue.translated = tr;
				}
				store.setCues(next.map((c) => ({ ...c })));
			}
		} finally {
			store.setTranslating(false);
		}
	}, [store]);
	const onSummarize = (0, import_react.useCallback)(async () => {
		const result = await summarizeTranscript({ data: {
			text: store.cues.map((c) => c.text).join(" "),
			language: store.targetLang === "auto" ? store.uiLang : store.targetLang
		} });
		if (!result.ok) {
			toast.error(result.error);
			return;
		}
		store.setSummary(result.summary);
	}, [store]);
	const onImportSrt = (0, import_react.useCallback)(async (file) => {
		const cues = parseSrt(await file.text());
		if (cues.length === 0) {
			toast.error(t.error);
			return;
		}
		store.setCues(cues);
	}, [store, t.error]);
	const playSample = (0, import_react.useCallback)(() => {
		const item = {
			id: uid(),
			name: "For Bigger Blazes.mp4",
			kind: "video",
			mime: "video/mp4",
			url: SAMPLE_URL,
			playable: true,
			isSample: true
		};
		store.addToQueue([item]);
		store.setMedia(item);
		store.setCues(SAMPLE_CUES_EN);
		store.setStatus(t.sampleNote);
	}, [store, t.sampleNote]);
	const startMic = (0, import_react.useCallback)(async () => {
		const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
		if (!Ctor) {
			toast.error(t.error);
			return;
		}
		const rec = new Ctor();
		rec.continuous = true;
		rec.interimResults = true;
		rec.lang = store.sourceLang === "auto" ? store.uiLang === "bn" ? "bn-BD" : "en-US" : store.sourceLang;
		const item = {
			id: uid(),
			name: store.uiLang === "bn" ? "লাইভ মাইক" : "Live microphone",
			kind: "audio",
			mime: "audio/webm",
			url: "",
			playable: false
		};
		if (!usePlayer.getState().media) store.setMedia(item);
		store.setLive(true);
		liveRef.current = true;
		recRef.current = rec;
		rec.onresult = (event) => {
			const result = event.results[event.results.length - 1];
			if (!result) return;
			const text = result[0]?.transcript?.trim();
			if (!text) return;
			const now = usePlayer.getState().currentTime || performance.now() / 1e3;
			if (result.isFinal) store.setCues((prev) => mergeCues(prev, [textToCue(text, Math.max(0, now - 3), now + .4)]));
		};
		rec.onerror = () => {
			toast.error(t.micDenied);
			stopLive();
		};
		rec.onend = () => {
			if (liveRef.current) rec.start();
		};
		try {
			rec.start();
		} catch {
			toast.error(t.micDenied);
		}
	}, [
		stopLive,
		store,
		t.error,
		t.micDenied
	]);
	const togglePlay = (0, import_react.useCallback)(async () => {
		const node = mediaRef.current;
		if (!node) return;
		await bindGraph();
		if (node.paused) await node.play().catch(() => void 0);
		else node.pause();
	}, [bindGraph]);
	const seekTo = (0, import_react.useCallback)((time) => {
		const node = mediaRef.current;
		if (node) node.currentTime = time;
		store.setCurrentTime(time);
	}, [store]);
	const toggleFullscreen = (0, import_react.useCallback)(async () => {
		const root = stageRef.current;
		if (!root) return;
		if (document.fullscreenElement) await document.exitFullscreen().catch(() => void 0);
		else await root.requestFullscreen().catch(() => void 0);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
			const s = usePlayer.getState();
			if (e.code === "Space") {
				e.preventDefault();
				togglePlay();
			} else if (e.key === "ArrowRight") seekTo(s.currentTime + 5);
			else if (e.key === "ArrowLeft") seekTo(Math.max(0, s.currentTime - 5));
			else if (e.key === "f") toggleFullscreen();
			else if (e.key === "m") s.setMuted(!s.muted);
			else if (e.key === "c") s.setShowCaptions(!s.showCaptions);
			else if (e.key === "l") startLive();
			else if (e.key === "?") setShortcuts(true);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		togglePlay,
		seekTo,
		startLive,
		toggleFullscreen
	]);
	(0, import_react.useEffect)(() => {
		const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
		document.addEventListener("fullscreenchange", onFs);
		return () => document.removeEventListener("fullscreenchange", onFs);
	}, []);
	const onPip = async () => {
		const node = mediaRef.current;
		if (!node) return;
		try {
			if (document.pictureInPictureElement) await document.exitPictureInPicture();
			else await node.requestPictureInPicture();
		} catch {}
	};
	const hasMedia = Boolean(media);
	const isAudio = media?.kind === "audio" || !media?.playable;
	const showStage = hasMedia;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh min-h-0 flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
				ui: store.uiLang,
				panelOpen: store.panelOpen,
				onTogglePanel: () => {
					if (window.matchMedia("(max-width: 900px)").matches) setMobileDock(true);
					else store.setPanelOpen(!store.panelOpen);
				},
				onToggleUi: () => store.setUiLang(store.uiLang === "bn" ? "en" : "bn"),
				onShortcuts: () => setShortcuts(true),
				onOpen: () => fileRef.current?.click()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: ACCEPT_ATTR,
				multiple: true,
				className: "hidden",
				onChange: (e) => {
					if (e.target.files) attachFiles(e.target.files);
					e.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: stageRef,
						className: "relative min-h-0 flex-1 bg-bg",
						children: [!showStage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							ui: store.uiLang,
							onOpen: () => fileRef.current?.click(),
							onSample: playSample,
							onMic: () => void startMic()
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								ref: mediaRef,
								className: cn("h-full w-full bg-bg object-contain", isAudio || !store.playable ? "hidden" : "block"),
								playsInline: true,
								onClick: () => void togglePlay(),
								onPlay: () => store.setPaused(false),
								onPause: () => store.setPaused(true),
								onTimeUpdate: (e) => store.setCurrentTime(e.currentTarget.currentTime),
								onLoadedMetadata: (e) => {
									store.setDuration(e.currentTarget.duration || 0);
									store.setPlayable(true);
								},
								onError: () => {
									if (media && !media.isSample) store.setPlayable(false);
								},
								onEnded: () => store.setPaused(true)
							}),
							(isAudio || !store.playable) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Visualizer, {
								graph: graphRef.current,
								active: !store.paused || Boolean(graphRef.current),
								title: media?.name ?? ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptionOverlay, {
								cues: store.cues,
								time: store.currentTime,
								bilingual: store.bilingual,
								size: store.captionSize,
								visible: store.showCaptions
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controls, {
								ui: store.uiLang,
								paused: store.paused,
								currentTime: store.currentTime,
								duration: store.duration,
								volume: store.volume,
								muted: store.muted,
								rate: store.rate,
								showCaptions: store.showCaptions,
								fullscreen,
								cues: store.cues,
								onToggle: () => void togglePlay(),
								onSeek: seekTo,
								onVolume: (v) => {
									store.setVolume(v);
									store.setMuted(v === 0);
								},
								onMute: () => store.setMuted(!store.muted),
								onRate: store.setRate,
								onCaptions: () => store.setShowCaptions(!store.showCaptions),
								onFullscreen: () => void toggleFullscreen(),
								onPip: () => void onPip()
							})
						] }), store.dragging ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 z-30 flex items-center justify-center bg-bg/80 text-sm tracking-wide text-fg",
							children: t.dropOverlay
						}) : null]
					}), store.queue.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto border-t border-border px-3 py-2",
						children: store.queue.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => store.setMedia(item),
							className: cn("max-w-[180px] shrink-0 truncate rounded-[var(--radius-sm)] px-3 py-2 text-left text-xs", item.id === media?.id ? "bg-elevated text-fg" : "text-muted hover:text-fg"),
							children: item.name
						}, item.id))
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden w-[360px] shrink-0 border-l border-border lg:block",
					children: store.panelOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptionDock, {
						ui: store.uiLang,
						cues: store.cues,
						currentTime: store.currentTime,
						live: store.live,
						generating: store.generating,
						translating: store.translating,
						progress: store.progress,
						status: store.status,
						bilingual: store.bilingual,
						sourceLang: store.sourceLang,
						targetLang: store.targetLang,
						captionSize: store.captionSize,
						summary: store.summary,
						aiAvailable: store.aiAvailable,
						detectedLang: store.detectedLang,
						hasMedia,
						onLive: () => void startLive(),
						onTranscribe: () => void transcribeFile(),
						onTranslate: () => void onTranslate(),
						onImport: onImportSrt,
						onExport: () => downloadText(`${(media?.name ?? "captions").replace(/\.[^.]+$/, "")}.srt`, serializeSrt(store.cues, store.bilingual && store.cues.some((c) => c.translated)), "application/x-subrip"),
						onClear: () => store.setCues([]),
						onSeek: seekTo,
						onBilingual: store.setBilingual,
						onSourceLang: store.setSourceLang,
						onTargetLang: store.setTargetLang,
						onCaptionSize: store.setCaptionSize,
						onSummarize: () => void onSummarize(),
						onEdit: (id, text) => store.setCues((prev) => prev.map((c) => c.id === id ? {
							...c,
							text
						} : c))
					}) : null
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobileDock,
				onOpenChange: setMobileDock,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					side: "bottom",
					className: "h-[78vh] overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptionDock, {
						ui: store.uiLang,
						cues: store.cues,
						currentTime: store.currentTime,
						live: store.live,
						generating: store.generating,
						translating: store.translating,
						progress: store.progress,
						status: store.status,
						bilingual: store.bilingual,
						sourceLang: store.sourceLang,
						targetLang: store.targetLang,
						captionSize: store.captionSize,
						summary: store.summary,
						aiAvailable: store.aiAvailable,
						detectedLang: store.detectedLang,
						hasMedia,
						onLive: () => void startLive(),
						onTranscribe: () => void transcribeFile(),
						onTranslate: () => void onTranslate(),
						onImport: onImportSrt,
						onExport: () => downloadText(`${(media?.name ?? "captions").replace(/\.[^.]+$/, "")}.srt`, serializeSrt(store.cues), "application/x-subrip"),
						onClear: () => store.setCues([]),
						onSeek: seekTo,
						onBilingual: store.setBilingual,
						onSourceLang: store.setSourceLang,
						onTargetLang: store.setTargetLang,
						onCaptionSize: store.setCaptionSize,
						onSummarize: () => void onSummarize(),
						onEdit: (id, text) => store.setCues((prev) => prev.map((c) => c.id === id ? {
							...c,
							text
						} : c))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: shortcuts,
				onOpenChange: setShortcuts,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t.shortcuts }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted",
					children: [
						["Space", "Play / Pause"],
						["← →", "Seek 5s"],
						["F", t.fullscreen],
						["M", t.mute],
						["C", t.captions],
						["L", t.liveSrt],
						["?", t.shortcuts]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-fg",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v })]
					}, k))
				})] })
			})
		]
	}) });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerApp, {});
}
//#endregion
export { Home as component };
