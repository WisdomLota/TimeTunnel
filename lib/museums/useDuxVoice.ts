"use client";

import { useRef, useCallback } from "react";

export function useDuxVoice() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const speak = useCallback(async (text: string, lang: "en" | "tr" = "en") => {
    // Stop any current speech
    stop();

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("TTS request failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audioRef.current = audio;

      await audio.play();

      // Return a promise that resolves when speech finishes
      return new Promise<void>((resolve) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          resolve();
        };
      });
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Dux voice error:", err);
      }
    }
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play();
  }, []);

  return { speak, stop, pause, resume, audioRef };
}