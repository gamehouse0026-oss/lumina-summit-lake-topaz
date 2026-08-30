import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transcribe-BsKZTLIi.js
var getAiStatus_createServerFn_handler = createServerRpc({
	id: "93d98280c9a9b384250e066ba9aaa3aa49c0d307c6c6b002a4cb0ab03e7107c0",
	name: "getAiStatus",
	filename: "src/lib/ai/transcribe.ts"
}, (opts) => getAiStatus.__executeServer(opts));
var getAiStatus = createServerFn({ method: "GET" }).handler(getAiStatus_createServerFn_handler, async () => {
	return { available: Boolean(process.env.XAI_API_KEY) };
});
var transcribeAudio_createServerFn_handler = createServerRpc({
	id: "a9ea6aa6844e8ad41c163c119ff6b3f7868f3fb568dd63af378eaebdd00561ae",
	name: "transcribeAudio",
	filename: "src/lib/ai/transcribe.ts"
}, (opts) => transcribeAudio.__executeServer(opts));
var transcribeAudio = createServerFn({ method: "POST" }).validator((data) => data).handler(transcribeAudio_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available"
	};
	const file = data.get("file");
	if (!(file instanceof Blob) || file.size < 64) return {
		ok: false,
		error: "No audio in this window"
	};
	if (file.size > 12582912) return {
		ok: false,
		error: "Audio chunk is too large"
	};
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
		body: form
	});
	if (!res.ok) {
		const body = await res.text().catch(() => "");
		if (res.status === 401 || res.status === 403) return {
			ok: false,
			error: "AI is not available"
		};
		return {
			ok: false,
			error: `Transcription failed (${res.status}) ${body.slice(0, 180)}`
		};
	}
	const body = await res.json();
	const words = (body.words ?? []).filter((w) => typeof w.text === "string").map((w) => ({
		text: String(w.text),
		start: Number(w.start) || 0,
		end: Number(w.end) || Number(w.start) || 0
	}));
	return {
		ok: true,
		text: body.text ?? words.map((w) => w.text).join(" "),
		language: body.language ?? "",
		duration: Number(body.duration) || 0,
		words
	};
});
//#endregion
export { getAiStatus_createServerFn_handler, transcribeAudio_createServerFn_handler };
