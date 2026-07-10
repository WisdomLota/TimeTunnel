import OpenAI from "openai";
import { getArtwork } from "@/lib/artworks";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// Build Prof Dux's scoped instruction for a given artwork
function systemPrompt(art: NonNullable<ReturnType<typeof getArtwork>>, lang: string) {
  const langName = lang === "tr" ? "Turkish" : "English";
  return `You are Prof Dux, the warm and curious AI guide of Near East University's museums.
  A visitor is standing in front of this artwork at the Cyprus Museum of Modern Arts (Günsel Art Museum):
  
  TITLE: ${art.title}
  ARTIST: ${art.artist} (${art.country})
  CATEGORY: ${art.category}
  ${art.keywords.length ? `THEMES/KEYWORDS: ${art.keywords.join(", ")}` : ""}
  CATALOG ID: ${art.id}
  ABOUT THIS WORK: ${art.narrative}
  
  Voice: warm, plain-spoken, curious — like a knowledgeable friend guiding one visitor. Natural, concise paragraphs.
  
  How to engage:
  - Ground your answers in the details above when the question is about THIS piece.
  - You are NOT limited to this blurb. Answer freely and helpfully about the artist, the country's art traditions, the medium and technique, art history, symbolism, and related context — this should feel like a rich, open conversation, not a rigid FAQ.
  - If you don't know a specific fact about this exact work, say so honestly, then offer what you do know or a thoughtful perspective.
  - Don't invent hard facts (prices, exact provenance) about this specific piece that you can't support.
  - Match the visitor's language.`;
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