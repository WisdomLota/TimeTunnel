"use client";

import { useRef, useCallback } from "react";

export function useDuxVoice() {
  // Reuse a single Audio element so iOS doesn't block subsequent plays
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const unlockedRef = useRef(false);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    return audioRef.current;
  }, []);

  const unlock = useCallback(() => {
    if (unlockedRef.current) return;
    const audio = getAudio();
    audio.src = "data:audio/mp3;base64,SUQzBAA=";
    audio.play().catch(() => {});
    unlockedRef.current = true;
  }, [getAudio]);

  const speak = useCallback(
    async (text: string, lang: "en" | "tr" = "en") => {
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

        const audio = getAudio();
        audio.src = url;
        await audio.play();

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
    },
    [getAudio],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play();
  }, []);

  return { speak, stop, pause, resume, unlock, audioRef };
}