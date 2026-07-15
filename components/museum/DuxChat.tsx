"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const { speak, stop, unlock } = useDuxVoice();

  // ── Voice recording state ──
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [cancelled, setCancelled] = useState(false);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptRef = useRef("");
  const sendMessageRef = useRef<(text?: string) => void>(() => {});

  const startRecording = useCallback(
    (_clientX?: number) => {
      if (streaming) return;
      unlock();

      const SR =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (!SR) return;

      const recognition = new SR();
      recognition.interimResults = true;
      recognition.continuous = true;
      recognition.maxAlternatives = 1;
      recognition.lang = lang === "tr" ? "tr-TR" : "en-US";
      recognition.onresult = (e: any) => {
        let transcript = "";
        for (let i = 0; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        transcriptRef.current = transcript;
      };
      recognition.onerror = () => {
        setRecording(false);
        setRecordTime(0);
        if (timerRef.current) clearInterval(timerRef.current);
      };
      recognitionRef.current = recognition;

      transcriptRef.current = "";
      setCancelled(false);
      setRecording(true);
      setRecordTime(0);

      try { recognition.start(); } catch { /* already started */ }

      timerRef.current = setInterval(
        () => setRecordTime((t) => t + 0.1),
        100,
      );
    },
    [streaming, lang, unlock],
  );

  const stopRecording = useCallback(
    (cancel = false) => {
      const rec = recognitionRef.current;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setRecording(false);
      setRecordTime(0);

      try { rec?.stop(); } catch { /* not started */ }
      recognitionRef.current = null;

      if (!cancel && !cancelled) {
        setTimeout(() => {
          const text = transcriptRef.current.trim();
          if (text) {
            sendMessageRef.current(text);
          }
        }, 300);
      }
      setCancelled(false);
    },
    [cancelled],
  );

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => () => stop(), [stop]);

  const sendMessage = useCallback(
    async (overrideText?: string) => {
      const text = (overrideText || input).trim();
      if (!text || streaming) return;
      unlock();

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
    },
    [input, streaming, messages, museumSlug, workId, lang, voiceEnabled, speak, unlock],
  );

  // Keep ref in sync with latest sendMessage
  sendMessageRef.current = sendMessage;

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
              {lang === "en" ? "Ask about Teal" : "Teal hakkında sorun"}
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
            {lang === "en" ? "Ask about HMS Jackton – HMAS Teal…" : "HMS Jackton – HMAS Teal hakkında sorun…"}
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

      {/* Input area */}
      <div className="px-4 py-3">
        <AnimatePresence mode="wait">
          {recording ? (
            <motion.div
              key="recording"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
              style={{
                background: `${accentColor}10`,
                border: `1px solid ${accentColor}33`,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-red-500 shrink-0"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span
                className="text-sm font-mono tracking-wider"
                style={{ color: accentColor }}
              >
                {formatTime(recordTime)}
              </span>
              <div className="flex items-center gap-0.75 flex-1 justify-center">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ background: accentColor }}
                    animate={{ height: [4, 8 + Math.random() * 14, 4] }}
                    transition={{
                      duration: 0.4 + Math.random() * 0.3,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => stopRecording(true)}
                className="p-1.5 rounded-full shrink-0"
                style={{ color: `${accentColor}66` }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <button
                onClick={() => stopRecording(false)}
                className="p-2 rounded-full shrink-0"
                style={{ background: accentColor }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill={voidColor}>
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={lang === "en" ? "Ask Dux…" : "Dux'a sorun…"}
                className="flex-1 px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{
                  background: `${accentColor}0a`,
                  border: `1px solid ${accentColor}22`,
                  color: accentColor,
                }}
                disabled={streaming}
              />
              {input.trim() ? (
                <button
                  onClick={() => sendMessage()}
                  disabled={streaming}
                  className="p-2.5 rounded-lg transition-opacity"
                  style={{
                    background: `${accentColor}20`,
                    border: `1px solid ${accentColor}33`,
                    opacity: streaming ? 0.4 : 1,
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill={accentColor}>
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => startRecording(0)}
                  disabled={streaming}
                  className="p-2.5 rounded-lg transition-all"
                  style={{
                    background: `${accentColor}10`,
                    border: `1px solid ${accentColor}33`,
                    opacity: streaming ? 0.4 : 1,
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill={accentColor}>
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 13a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V24h2v-2.06A9 9 0 0 0 21 13h-2z" />
                  </svg>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}