"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useDuxVoice } from "@/lib/museums/useDuxVoice";

interface DuxChatProps {
  museumSlug: string;
  workId?: string;
  lang: "en" | "tr";
  accentColor: string;
  voidColor: string;
  onClose: () => void;
  voiceEnabled?: boolean;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function DuxChat({
  museumSlug,
  workId,
  lang,
  accentColor,
  voidColor,
  onClose,
  voiceEnabled = true,
}: DuxChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [recording, setRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { speak, stop, unlock } = useDuxVoice();

  // Setup speech recognition
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;
    recognition.onresult = (e: any) => {
      const transcript = e.results?.[0]?.[0]?.transcript;
      if (transcript) setInput(transcript);
      setRecording(false);
    };
    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);
    recognitionRef.current = recognition;
  }, []);

  const toggleMic = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (recording) {
      rec.stop();
      setRecording(false);
    } else {
      rec.lang = lang === "tr" ? "tr-TR" : "en-US";
      rec.start();
      setRecording(true);
    }
  }, [recording, lang]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Cleanup voice on unmount
  useEffect(() => () => stop(), [stop]);

  const send = useCallback(async () => {
    unlock();
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/museum-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ museumSlug, workId, messages: updated, lang }),
      });

      if (!res.ok || !res.body) throw new Error("Chat failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        const captured = assistantText;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: captured };
          return copy;
        });
      }

      if (voiceEnabled && assistantText) {
        speak(assistantText, lang);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            lang === "en"
              ? "Sorry, I lost my train of thought. Try again?"
              : "Üzgünüm, düşüncemi kaybettim. Tekrar dener misiniz?",
        },
      ]);
    } finally {
      setStreaming(false);
    }
  }, [input, streaming, messages, museumSlug, workId, lang, voiceEnabled, speak]);

  return (
    <motion.div
      className="flex flex-col w-full max-w-sm mx-auto"
      style={{ height: "100%" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/museums/prof-dux.png"
            alt="Prof Dux"
            className="w-10 h-10 rounded-full object-cover"
            style={{ border: `1.5px solid ${accentColor}44` }}
          />
          <div>
            <p
              className="text-sm font-bold tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              Prof Dux
            </p>
            <p
              className="text-[10px] tracking-wider"
              style={{ color: `${accentColor}55` }}
            >
              {lang === "en" ? "Ask me anything" : "Bana her şeyi sorun"}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            stop();
            onClose();
          }}
          className="text-xs tracking-widest uppercase px-3 py-1.5 rounded"
          style={{
            color: accentColor,
            border: `1px solid ${accentColor}44`,
          }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-3"
      >
        {messages.length === 0 && (
          <p
            className="text-xs text-center mt-8 tracking-wider"
            style={{ color: `${accentColor}44` }}
          >
            {lang === "en"
              ? "Ask Prof Dux about what you see…"
              : "Gördükleriniz hakkında Prof Dux'a sorun…"}
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <img
                src="/museums/prof-dux.png"
                alt=""
                className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
                style={{ border: `1px solid ${accentColor}33` }}
              />
            )}
            <div
              className="text-sm leading-relaxed rounded-lg px-3 py-2 max-w-[80%]"
              style={{
                background:
                  msg.role === "user"
                    ? `${accentColor}20`
                    : `${accentColor}0a`,
                color:
                  msg.role === "user" ? accentColor : `${accentColor}cc`,
                border: `1px solid ${accentColor}${
                  msg.role === "user" ? "33" : "15"
                }`,
              }}
            >
              {msg.content || (
                <span
                  className="inline-block animate-pulse"
                  style={{ color: `${accentColor}55` }}
                >
                  …
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={lang === "en" ? "Ask Dux…" : "Dux'a sorun…"}
          className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
          style={{
            background: `${accentColor}0a`,
            border: `1px solid ${accentColor}22`,
            color: accentColor,
          }}
          disabled={streaming || recording}
        />
        {/* Mic */}
        <button
          onClick={toggleMic}
          disabled={streaming}
          className="px-3 py-2 rounded-lg transition-all"
          style={{
            background: recording ? `${accentColor}30` : `${accentColor}10`,
            border: `1px solid ${recording ? accentColor : `${accentColor}33`}`,
            color: accentColor,
            opacity: streaming ? 0.4 : 1,
          }}
          aria-label={recording ? "Stop recording" : "Voice input"}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            {recording ? (
              <rect x="6" y="6" width="12" height="12" rx="2" />
            ) : (
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zm-1 18.93A7 7 0 0 1 5 13h2a5 5 0 0 0 10 0h2a7 7 0 0 1-6 6.93V22h4v2H8v-2h4v-2.07z" />
            )}
          </svg>
        </button>
        <button
          onClick={send}
          disabled={streaming || !input.trim()}
          className="px-4 py-2 rounded-lg text-sm font-semibold tracking-wider uppercase transition-opacity"
          style={{
            background: `${accentColor}20`,
            color: accentColor,
            border: `1px solid ${accentColor}33`,
            opacity: streaming || !input.trim() ? 0.4 : 1,
          }}
        >
          {lang === "en" ? "Send" : "Gönder"}
        </button>
      </div>
    </motion.div>
  );
}