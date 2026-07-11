"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/lib/supabase";
import { channelName, mintSession, FEATURED, type Stage } from "@/lib/tunnel";
import { artworkImage } from "@/lib/artworks";
import { motion, AnimatePresence } from "framer-motion";

const RINGS = [1, 2, 3, 4, 5];

export default function ScreenPage() {
  const [sessionId] = useState(mintSession);
  const [stage, setStage] = useState<Stage>("idle");
  const [url, setUrl] = useState("");
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const [selectedNum, setSelectedNum] = useState<string | null>(null);

  const revealCanvasRef = useRef<HTMLCanvasElement>(null);
  const lastRemote = useRef<{ x: number; y: number } | null>(null);
  const clearedRef = useRef(false);

  useEffect(() => {
    setUrl(`${window.location.origin}/control/${sessionId}`);
  }, [sessionId]);

  // own the channel; react to phone events
  useEffect(() => {
    const channel = supabase.channel(channelName(sessionId), {
      config: { broadcast: { self: false } },
    });
    channel.on("broadcast", { event: "hello" }, () => setStage("connected"));
    channel.on("broadcast", { event: "stage" }, ({ payload }) => setStage(payload.stage as Stage));
    channel.on("broadcast", { event: "select" }, ({ payload }) => {
      setSelectedNum(payload.num as string);
      setStage("selected");
    });
    channel.on("broadcast", { event: "scratch" }, ({ payload }) => {
      const canvas = revealCanvasRef.current;
      if (!canvas || clearedRef.current) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      if (payload.lift) { lastRemote.current = null; return; }
      const rect = canvas.getBoundingClientRect();
      const px = payload.nx * rect.width, py = payload.ny * rect.height;
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 46;
      const p = lastRemote.current;
      if (p) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(px, py); ctx.stroke(); }
      else { ctx.beginPath(); ctx.arc(px, py, 23, 0, Math.PI * 2); ctx.fill(); }
      lastRemote.current = { x: px, y: py };
      // progress check
      const { width, height } = canvas;
      const data = ctx.getImageData(0, 0, width, height).data;
      let clear = 0, total = 0;
      for (let i = 3; i < data.length; i += 4 * 40) { total++; if (data[i] === 0) clear++; }
      if (clear / total > 0.6 && !clearedRef.current && total > 100) {
        clearedRef.current = true;
        canvas.style.transition = "opacity 1s ease";
        canvas.style.opacity = "0";
        setStage("revealed");
        channelRef.current?.send({ type: "broadcast", event: "stage", payload: { stage: "revealed" } });
      }
    });
    channel.subscribe();
    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); };
  }, [sessionId]);

  useEffect(() => {
    if (!(stage === "selected" || stage === "revealing") || !selectedNum) return;
    clearedRef.current = false;
    const id = requestAnimationFrame(() => {
      const canvas = revealCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.opacity = "1";
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "#3a3226"); g.addColorStop(0.5, "#5c4a2e"); g.addColorStop(1, "#2e2a20");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    });
    return () => cancelAnimationFrame(id);
  }, [stage, selectedNum]);

  useEffect(() => {
    if (stage !== "revealed") return;
    const t = setTimeout(() => {
      // reset for the next visitor — full page reload gives a clean new session
      window.location.reload();
    }, 30000); // 30s to scan + start chatting
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <main className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, #12211D 0%, var(--color-void) 70%), var(--color-void)" }}>

      {/* preload artwork images so reveal is instant */}
      {stage === "connected" && FEATURED.map((a) => (
        <img key={a.num} src={`/artworks/${a.num}.jpg`} alt="" className="hidden" aria-hidden />
      ))}

      {/* breathing tunnel rings */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
        {RINGS.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 0.12 + i * 0.05, scale: [1, 1.02, 1] }}
            transition={{
              opacity: { delay: 0.2 + i * 0.12, duration: 1 },
              scale: { duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
            }}
            className="absolute rounded-full border"
            style={{ width: `${30 + r * 15}vmin`, height: `${30 + r * 15}vmin`, borderColor: "var(--color-brass)" }}
          />
        ))}
      </div>

      {/* idle: the portal QR */}
      {stage === "idle" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <p className="text-xs tracking-[0.5em] text-brass/70 uppercase mb-8">Near East University</p>
          <h1 className="display text-5xl md:text-7xl brass-text mb-10">Enter the Tunnel</h1>

          {/* QR framed as a portal */}
          <motion.div
            animate={{ boxShadow: [
              "0 0 0px rgba(198,154,75,0.0)",
              "0 0 50px rgba(198,154,75,0.35)",
              "0 0 0px rgba(198,154,75,0.0)",
            ] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative p-5 rounded-lg"
            style={{ background: "var(--color-patina)", boxShadow: "inset 0 0 0 1px var(--color-brass)" }}
          >
            {/* brass corner marks */}
            <span className="absolute top-2 left-2 w-5 h-5 border-t border-l border-brass" />
            <span className="absolute top-2 right-2 w-5 h-5 border-t border-r border-brass" />
            <span className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-brass" />
            <span className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-brass" />
            <div className="bg-bone p-4 rounded">
              {url && <QRCodeSVG value={url} size={200} bgColor="#E8E4DA" fgColor="#0B0F0E" />}
            </div>
          </motion.div>

          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-bone/60 text-sm tracking-[0.2em] uppercase mt-8"
          >
            Scan to begin
          </motion.p>
        </motion.div>
      )}

      {/* connected: placeholder until step 2 wires the sealed cards here */}
      {/* connected: the sealed collection */}
      {stage === "connected" && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="relative z-10 flex flex-col items-center px-8"
        >
          <p className="display text-brass/80 text-sm tracking-[0.3em] uppercase mb-2">The Collection</p>
          <p className="text-bone/50 text-sm mb-10">Pick a sealed work on your phone.</p>
          <div className="flex flex-wrap justify-center items-center gap-6 max-w-5xl">
            {FEATURED.map((art, i) => {
              const OFFSETS = ["mt-0", "mt-8", "mt-3", "mt-10", "mt-2", "mt-8", "mt-5"];
              return (
                <motion.div
                  key={art.id}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  className={`${OFFSETS[i]} relative w-40 h-56 rounded-sm overflow-hidden flex flex-col items-center justify-center`}
                  style={{
                    background: "linear-gradient(160deg, var(--color-patina), var(--color-void))",
                    boxShadow: "inset 0 0 0 1px var(--color-brass), 0 20px 50px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* brass corner marks — matching ArtCollection */}
                  <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-brass/50" />
                  <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-brass/50" />
                  <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-brass/50" />
                  <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-brass/50" />

                  <span className="display text-6xl brass-text leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[10px] tracking-[0.35em] text-bone/40 uppercase mt-4">Sealed</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* selected: the chosen card opens, still sealed */}
      {(stage === "selected" || stage === "revealing" || stage === "revealed") && selectedNum && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* big artwork card */}
          <div
            className="relative w-[28rem] h-[36rem] rounded-sm overflow-hidden"
            style={{ boxShadow: "inset 0 0 0 1px var(--color-brass), 0 40px 100px rgba(0,0,0,0.8)" }}
          >
            {/* artwork underneath */}
            <div
              className="absolute inset-0"
              style={{ background: `url(/artworks/${selectedNum}.jpg) center/cover` }}
            />
            {/* tarnished scratch layer (erased by phone) */}
            <canvas ref={revealCanvasRef} className="absolute inset-0 w-full h-full" />

            {/* bouncy QR nudge — bottom-left, ONLY after reveal */}
            <AnimatePresence>
              {stage === "revealed" && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-4 left-4 flex items-end gap-3"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    className="p-2 rounded-lg"
                    style={{ background: "var(--color-patina)", boxShadow: "inset 0 0 0 1px var(--color-brass), 0 10px 30px rgba(0,0,0,0.6)" }}
                  >
                    <div className="bg-bone p-2 rounded">
                      <QRCodeSVG
                        value={`${window.location.origin}/artwork/${selectedNum}`}
                        size={96}
                        bgColor="#E8E4DA"
                        fgColor="#0B0F0E"
                      />
                    </div>
                    <p className="text-[8px] tracking-[0.2em] text-brass/80 uppercase text-center mt-1">
                      Ask Prof Dux
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* nudge below card, before reveal only */}
          {stage !== "revealed" && (
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-bone/60 text-sm tracking-[0.2em] uppercase mt-8"
            >
              Scratch on your phone to reveal
            </motion.p>
          )}
        </motion.div>
      )}
    </main>
  );
}