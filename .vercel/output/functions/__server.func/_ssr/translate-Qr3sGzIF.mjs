import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/translate-Qr3sGzIF.js
var translateCues_createServerFn_handler = createServerRpc({
	id: "b7ba596e6924a251ee7b4ad7894da4335e29217f2ce0c5816b7bf9ea49d1b60b",
	name: "translateCues",
	filename: "src/lib/ai/translate.ts"
}, (opts) => translateCues.__executeServer(opts));
var translateCues = createServerFn({ method: "POST" }).validator((input) => input).handler(translateCues_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available"
	};
	if (data.lines.length === 0) return {
		ok: true,
		lines: []
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .2,
			max_tokens: 1800,
			messages: [{
				role: "system",
				content: "You translate video captions. Return ONLY a JSON array of {id, text}. Keep meaning, keep line length similar, no notes."
			}, {
				role: "user",
				content: `Translate each caption into language code "${data.target}".\n${JSON.stringify(data.lines)}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Translate failed (${res.status})`
	};
	const json = extractJson((await res.json()).choices?.[0]?.message?.content ?? "[]");
	if (!Array.isArray(json)) return {
		ok: false,
		error: "Could not parse translation"
	};
	return {
		ok: true,
		lines: json.filter((row) => row && typeof row === "object").map((row) => {
			const r = row;
			return {
				id: String(r.id ?? ""),
				text: String(r.text ?? "")
			};
		}).filter((row) => row.id && row.text)
	};
});
var summarizeTranscript_createServerFn_handler = createServerRpc({
	id: "f709d63662aa300f4cf8f6ab9fcd685538601855c0bc7ea2450773b8bc2686f4",
	name: "summarizeTranscript",
	filename: "src/lib/ai/translate.ts"
}, (opts) => summarizeTranscript.__executeServer(opts));
var summarizeTranscript = createServerFn({ method: "POST" }).validator((input) => input).handler(summarizeTranscript_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available"
	};
	const clip = data.text.slice(0, 8e3);
	if (!clip.trim()) return {
		ok: false,
		error: "No transcript yet"
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .3,
			max_tokens: 420,
			messages: [{
				role: "system",
				content: "Summarize a video transcript in 3–6 short sentences. No preamble. Write in the requested language."
			}, {
				role: "user",
				content: `Language: ${data.language}\n\n${clip}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Summary failed (${res.status})`
	};
	return {
		ok: true,
		summary: (await res.json()).choices?.[0]?.message?.content?.trim() ?? ""
	};
});
function extractJson(raw) {
	const trimmed = raw.trim();
	const start = trimmed.indexOf("[");
	const end = trimmed.lastIndexOf("]");
	if (start >= 0 && end > start) try {
		return JSON.parse(trimmed.slice(start, end + 1));
	} catch {
		return null;
	}
	try {
		return JSON.parse(trimmed);
	} catch {
		return null;
	}
}
//#endregion
export { summarizeTranscript_createServerFn_handler, translateCues_createServerFn_handler };
