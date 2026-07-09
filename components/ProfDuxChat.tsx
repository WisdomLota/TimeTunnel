"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfDuxAvatar from "@/components/ProfDuxAvatar";

type Msg = { role: "user" | "assistant"; content: string };

export default function ProfDuxChat({ artworkId, artworkTitle }: { artworkId: string; artworkTitle: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [muted, setMuted] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [settled, setSettled] = useState(false); // false = big intro, true = compact header
  const [avatarState, setAvatarState] = useState<"idle" | "thinking" | "speaking">("idle");

  const scrollDown = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const speakWithState = (text: string) => {
    if (muted || typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "tr" ? "tr-TR" : "en-US";
    const voices = synth.getVoices();
    const prefix = lang === "tr" ? "tr" : "en";
    const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
    // prefer a voice that looks male by name; fall back to any lang match
    const maleHint = /male|david|james|george|daniel|mark|paul|fred|alex|guy|eric|zira?off|erkek|baş?ar|tolga/i;
    const femaleHint = /female|zira|susan|karen|linda|hazel|kadın|yelda|filiz/i;
    const male = langVoices.find((v) => maleHint.test(v.name) && !femaleHint.test(v.name));
    u.voice = male || langVoices[0];
    // deepen slightly for a more masculine timbre
    u.pitch = 0.85;
    u.onstart = () => setAvatarState("speaking");
    u.onend = () => setAvatarState("idle");
    synth.speak(u);
  };

  const toggleMic = () => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Voice input isn't supported in this browser. Try Chrome.");
      return;
    }
    // already listening → stop
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }
    const rec = new SR();
    rec.lang = lang === "tr" ? "tr-TR" : "en-US";
    rec.interimResults = true;
    rec.continuous = false;

    rec.onresult = (e: any) => {
      const transcript = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setInput(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);

    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  };

  const send = async () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const warm = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(warm);
    }
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setBusy(true);
    setAvatarState("thinking");
    scrollDown();

    // add an empty assistant message we'll stream into
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId, messages: next, lang }),
      });
      if (!res.body) throw new Error("no stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        full += chunk;
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: full };
          return copy;
        });
        scrollDown();
      }
      setAvatarState("idle");
      speakWithState(full); // read the completed reply aloud
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: "Sorry — I couldn't answer just now. Please try again." };
        return copy;
      });
    } finally {
      setBusy(false);
      scrollDown();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    // trigger voice loading
    window.speechSynthesis.getVoices();
    const handler = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setSettled(false);
      const t = setTimeout(() => setSettled(true), 2200);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <>
      {/* trigger */}
      <button
        onClick={() => setOpen(true)}
        className="mt-4 self-start text-xs tracking-[0.2em] uppercase text-brass border border-brass/40 hover:border-brass rounded-full px-5 py-3 transition-colors"
      >
        Ask Prof Dux about this work
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-70 flex items-end md:items-center justify-center md:p-6 bg-void/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg h-[80vh] md:h-[70vh] flex flex-col rounded-t-2xl md:rounded-2xl overflow-hidden"
              style={{ background: "var(--color-patina)", boxShadow: "0 -20px 80px rgba(0,0,0,0.7), inset 0 0 0 1px var(--color-brass)" }}
            >
              {/* BIG INTRO — Prof Dux arrives, then settles */}
              <AnimatePresence>
                {!settled && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6"
                    style={{ background: "var(--color-patina)" }}
                  >
                    <motion.div
                      initial={{ scale: 0.8, y: 20, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ProfDuxAvatar state="idle" size={220} />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.7 }}
                      className="display text-brass text-lg tracking-wide text-center px-8"
                    >
                      {lang === "tr"
                        ? "Merhaba! Ben AI arkadaşınız, Profesör Dux."
                        : "Hello! I'm your AI friend, Professor Dux."}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* header with compact avatar (after settle) */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brass/20">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={false}
                    animate={{ opacity: settled ? 1 : 0, scale: settled ? 1 : 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProfDuxAvatar state={avatarState} size={48} />
                  </motion.div>
                  <div>
                    <p className="display text-brass text-sm tracking-[0.2em] uppercase">Prof Dux</p>
                    <p className="text-bone/40 text-xs mt-0.5">on “{artworkTitle}”</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex rounded-full overflow-hidden border border-brass/30">
                    {(["en", "tr"] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1 text-[10px] tracking-widest uppercase transition-colors ${
                          lang === l ? "bg-brass/25 text-brass" : "text-bone/40 hover:text-brass"
                        }`}
                      >
                        {l === "en" ? "EN" : "TR"}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setMuted((mtd) => {
                        if (!mtd) window.speechSynthesis?.cancel();
                        return !mtd;
                      });
                      setAvatarState("idle");
                    }}
                    className="text-[10px] tracking-widest uppercase text-bone/40 hover:text-brass transition-colors"
                    aria-label={muted ? "Unmute Prof Dux" : "Mute Prof Dux"}
                  >
                    {muted ? "🔇" : "🔊"}
                  </button>
                  <button
                    onClick={() => { window.speechSynthesis?.cancel(); setAvatarState("idle"); setOpen(false); }}
                    className="text-bone/50 hover:text-brass text-xs tracking-widest"
                  >
                    CLOSE
                  </button>
                </div>
              </div>

              {/* messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {messages.length === 0 && (
                  <p className="text-bone/40 text-sm leading-relaxed">
                    {lang === "tr"
                      ? "Merhaba — ben Prof Dux. Bu eser hakkında istediğinizi sorun: sanatçı, hikâyesi, tekniği ya da nelere dikkat etmeniz gerektiği."
                      : "Hello — I'm Prof Dux. Ask me anything about this piece: the artist, the story behind it, the technique, or what to look for."}
                  </p>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                    <span
                      className={`inline-block rounded-2xl px-4 py-2 text-sm leading-relaxed max-w-[85%] ${
                        m.role === "user"
                          ? "bg-brass/20 text-bone"
                          : "text-bone/80"
                      }`}
                    >
                      {m.content || (busy ? "…" : "")}
                    </span>
                  </div>
                ))}
              </div>

              {/* input */}
              <div className="px-4 py-3 border-t border-brass/20 flex gap-2 items-center">
                <button
                  onClick={toggleMic}
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    listening
                      ? "bg-brass/40 text-brass animate-pulse"
                      : "bg-void/50 text-bone/50 hover:text-brass"
                  }`}
                  aria-label={listening ? "Stop listening" : "Speak your question"}
                >
                  🎤
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder={listening ? "Listening…" : "Ask about this artwork…"}
                  className="flex-1 bg-void/50 rounded-full px-4 py-2 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:ring-1 focus:ring-brass/50"
                />
                <button
                  onClick={send}
                  disabled={busy}
                  className="rounded-full px-5 py-2 text-xs tracking-widest uppercase bg-brass/20 text-brass hover:bg-brass/30 disabled:opacity-40 transition-colors"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}