"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDuxVoice } from "@/lib/museums/useDuxVoice";
import DuxChat from "@/components/museum/DuxChat";
import type { MuseumConfig, NarrationCue } from "@/lib/museums/types";

interface VideoOverlayProps {
  config: MuseumConfig;
  lang: "en" | "tr";
  onClose: () => void;
}

export default function VideoOverlay({
  config,
  lang,
  onClose,
}: VideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const narrationTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { speak, stop: stopVoice, pause: pauseVoice, resume: resumeVoice, unlock } =
    useDuxVoice();

  const [playing, setPlaying] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [started, setStarted] = useState(false);

  const narrationCues: NarrationCue[] =
    config.video?.narration[lang] || [];

  // Schedule narration cues relative to video playback
  const scheduleNarration = useCallback(() => {
    // Clear any existing timers
    narrationTimers.current.forEach(clearTimeout);
    narrationTimers.current = [];

    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;

    narrationCues.forEach((cue) => {
      const delay = (cue.time - currentTime) * 1000;
      if (delay >= 0) {
        const timer = setTimeout(() => {
          if (!videoRef.current?.paused) {
            speak(cue.text, lang);
          }
        }, delay);
        narrationTimers.current.push(timer);
      }
    });
  }, [narrationCues, lang, speak]);

  const clearNarrationTimers = useCallback(() => {
    narrationTimers.current.forEach(clearTimeout);
    narrationTimers.current = [];
  }, []);

  // Start playback
  const startVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    unlock();
    video.play();
    setPlaying(true);
    setStarted(true);
    scheduleNarration();
  }, [scheduleNarration, unlock]);

  // Pause everything
  const pauseAll = useCallback(() => {
    videoRef.current?.pause();
    pauseVoice();
    clearNarrationTimers();
    setPlaying(false);
  }, [pauseVoice, clearNarrationTimers]);

  // Resume everything
  const resumeAll = useCallback(() => {
    videoRef.current?.play();
    resumeVoice();
    scheduleNarration();
    setPlaying(true);
  }, [resumeVoice, scheduleNarration]);

  // Ask Dux — pause video + open chat
  const openChat = useCallback(() => {
    pauseAll();
    stopVoice(); // fully stop current speech so chat voice is clean
    setShowChat(true);
  }, [pauseAll, stopVoice]);

  // Close chat — resume video
  const closeChat = useCallback(() => {
    setShowChat(false);
    resumeAll();
  }, [resumeAll]);

  // Close entire overlay
  const handleClose = useCallback(() => {
    pauseAll();
    stopVoice();
    clearNarrationTimers();
    onClose();
  }, [pauseAll, stopVoice, clearNarrationTimers, onClose]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearNarrationTimers();
      stopVoice();
    };
  }, [clearNarrationTimers, stopVoice]);

  const accentColor = config.branding.colors.accent;
  const voidColor = config.branding.colors.void;

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col"
      style={{
        background: voidColor,
        fontFamily: config.branding.font || "Chakra Petch",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <p
          className="text-sm font-bold tracking-widest uppercase"
          style={{ color: accentColor }}
        >
          {lang === "en"
            ? `Get to know ${config.name}`
            : `${config.name}'ı Tanıyın`}
        </p>
        <button
          onClick={handleClose}
          className="text-xs tracking-widest uppercase px-3 py-1.5 rounded"
          style={{
            color: accentColor,
            border: `1px solid ${accentColor}44`,
          }}
        >
          ✕
        </button>
      </div>

      {/* Video — always visible */}
      <div className="relative w-full shrink-0" style={{ maxHeight: showChat ? "35dvh" : "55dvh" }}>
        <video
          ref={videoRef}
          src={config.video?.src}
          className="w-full h-full object-contain"
          playsInline
          onEnded={() => setPlaying(false)}
        />

        {/* Play overlay before start */}
        {!started && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            style={{ background: `${voidColor}aa` }}
            onClick={startVideo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{
                  border: `2px solid ${accentColor}`,
                  background: `${accentColor}15`,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 ml-1"
                  fill={accentColor}
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: `${accentColor}88` }}
              >
                {lang === "en" ? "Tap to play" : "Oynatmak için dokunun"}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls — below video */}
      {started && (
        <div className="flex items-center justify-center gap-4 py-3 shrink-0">
          {/* Play/Pause */}
          <button
            onClick={playing ? pauseAll : resumeAll}
            className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase"
            style={{
              color: accentColor,
              border: `1px solid ${accentColor}33`,
              background: `${accentColor}10`,
            }}
          >
            {playing
              ? lang === "en"
                ? "Pause"
                : "Duraklat"
              : lang === "en"
                ? "Resume"
                : "Devam Et"}
          </button>

          {/* Ask Dux */}
          <button
            onClick={showChat ? closeChat : openChat}
            className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase"
            style={{
              color: showChat ? voidColor : accentColor,
              background: showChat ? accentColor : `${accentColor}10`,
              border: `1px solid ${accentColor}55`,
            }}
          >
            {showChat
              ? lang === "en"
                ? "Close Chat & Resume"
                : "Sohbeti Kapat ve Devam Et"
              : lang === "en"
                ? "Ask Dux"
                : "Dux'a Sor"}
          </button>
        </div>
      )}

      {/* Chat panel — slides up below video */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="flex-1 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <DuxChat
              museumSlug={config.slug}
              lang={lang}
              accentColor={accentColor}
              voidColor={voidColor}
              onClose={closeChat}
              voiceEnabled={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}