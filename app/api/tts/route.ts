import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "en" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text required" }, { status: 400 });
    }

    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "ash",
      input: text.slice(0, 1000),
      instructions:
        lang === "tr"
          ? "Speak in Turkish, in a warm, measured tone, like a seasoned naval historian."
          : "Speak in English, in a warm, measured tone, like a seasoned naval historian.",
      response_format: "mp3",
    });

    const audioBuffer = Buffer.from(await speech.arrayBuffer());

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("TTS error:", err);
    return NextResponse.json({ error: "TTS failed" }, { status: 500 });
  }
}