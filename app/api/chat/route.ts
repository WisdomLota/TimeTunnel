import OpenAI from "openai";
import { getArtwork } from "@/lib/artworks";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// Build Prof Dux's scoped instruction for a given artwork
function systemPrompt(art: NonNullable<ReturnType<typeof getArtwork>>, lang: string) {
  const langName = lang === "tr" ? "Turkish" : "English";
  return `You are Prof Dux, the friendly AI guide of Near East University's museums.
You are standing with a visitor in front of this artwork at the Cyprus Museum of Modern Arts:

TITLE: ${art.title} (${art.titleEn})
ARTIST: ${art.artist}, ${art.country}, ${art.artistYear}
YEAR: ${art.year}
MEDIUM: ${art.medium}
DIMENSIONS: ${art.dimensions}
ABOUT THIS WORK: ${art.narrative}

Voice: warm, plain-spoken, welcoming — like a knowledgeable museum guide talking to one curious visitor. Short, natural paragraphs. No jargon dumps.

Grounding rules:
- Lead with what you actually know about THIS work (the details above).
- You may add helpful general context about the medium, region, era, or art history to enrich the answer — but make clear when you're giving general context versus specific facts about this piece.
- If asked something you truly can't know about this specific work, say so honestly and offer what you can.
- Keep replies concise unless the visitor asks to go deeper.
- Never invent specific facts (prices, provenance, hidden meanings) about this exact piece that aren't in the material above.
IMPORTANT: Respond entirely in ${langName}, in a natural, fluent register. If the visitor writes in another language, still reply in ${langName} unless they explicitly ask otherwise.`;
}

export async function POST(req: Request) {
  try {
    const { artworkId, messages, lang } = await req.json();
    const art = getArtwork(artworkId);
    if (!art) {
      return new Response(JSON.stringify({ error: "Unknown artwork" }), { status: 404 });
    }

    // build the OpenAI message list: system prompt + prior turns
    const chatMessages = [
      { role: "system" as const, content: systemPrompt(art, lang || "en") },
      ...(messages as { role: "user" | "assistant"; content: string }[]).map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      stream: true,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (e) {
          controller.enqueue(encoder.encode("\n\n(Prof Dux lost his train of thought — please try again.)"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (e) {
    console.error("CHAT ERROR:", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
}