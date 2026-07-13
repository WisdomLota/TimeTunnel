import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { NextRequest, NextResponse } from "next/server";

const VOICES = {
  en: "en-US-ChristopherNeural",
  tr: "tr-TR-AhmetNeural",
} as const;

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "en" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text required" }, { status: 400 });
    }

    const voice = VOICES[lang as keyof typeof VOICES] || VOICES.en;

    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    const { audioStream } = await tts.toStream(text);

    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("TTS error:", err);
    return NextResponse.json({ error: "TTS failed" }, { status: 500 });
  }
}