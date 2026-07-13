import OpenAI from "openai";
import { getMuseumConfig } from "@/lib/museums";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { museumSlug, workId, messages, lang = "en" } = await req.json();

    const config = getMuseumConfig(museumSlug);
    if (!config) {
      return new Response(JSON.stringify({ error: "Unknown museum" }), {
        status: 404,
      });
    }

    const langKey = lang === "tr" ? "tr" : "en";
    let systemContent = config.duxSystemPrompt[langKey];

    // If chatting about a specific work, inject its context
    if (workId) {
      const work = config.works.find((w) => w.id === workId);
      if (work) {
        systemContent += `\n\nThe visitor is currently looking at this item:\nTITLE: ${work.title[langKey]}\nYEAR: ${work.year || "Unknown"}\nDETAILS: ${work.duxContext[langKey]}\nDESCRIPTION: ${work.description[langKey]}`;
      }
    }

    const langInstruction =
      langKey === "tr"
        ? "\n\nAlways respond in Turkish."
        : "\n\nAlways respond in English.";

    const chatMessages = [
      { role: "system" as const, content: systemContent + langInstruction },
      ...(messages as { role: "user" | "assistant"; content: string }[]).map(
        (m) => ({ role: m.role, content: m.content }),
      ),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      stream: true,
      temperature: 0.7,
      max_tokens: 220,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch {
          controller.enqueue(
            encoder.encode(
              "\n\n(Prof Dux lost his train of thought — please try again.)",
            ),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (e) {
    console.error("MUSEUM CHAT ERROR:", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
}