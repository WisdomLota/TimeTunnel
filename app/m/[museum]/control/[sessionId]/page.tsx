"use client";

import { useEffect, useRef, use, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMuseum } from "@/lib/museums/context";
import { joinAsVisitor } from "@/lib/museums/presence";
import { supabase } from "@/lib/supabase";
import { useDuxVoice } from "@/lib/museums/useDuxVoice";
import type { MemoryLayer, MuseumWork } from "@/lib/museums/types";
import DuxChat from "@/components/museum/DuxChat";
import VideoOverlay from "@/components/museum/VideoOverlay";

type Stage =
  | "connecting"
  | "layers"
  | "tunnel"
  | "works"
  | "scratching"
  | "revealed"
  | "chat";

export default function MuseumControlPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = use(params);
  const config = useMuseum();

  const [stage, setStage] = useState<Stage>("connecting");
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [layersSettled, setLayersSettled] = useState(false);
  const [activeLayer, setActiveLayer] = useState<MemoryLayer | null>(null);
  const [activeWork, setActiveWork] = useState<MuseumWork | null>(null);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [showVideo, setShowVideo] = useState(false);
  const { speak } = useDuxVoice();

  const presenceRef = useRef<ReturnType<typeof joinAsVisitor> | null>(null);

  // Join presence
  useEffect(() => {
    const presence = joinAsVisitor(config.slug, sessionId);
    presenceRef.current = presence;

    // Small delay for cinematic entry
    const t = setTimeout(() => setStage("layers"), 600);

    return () => {
      clearTimeout(t);
      presence.channel.unsubscribe();
    };
  }, [config.slug, sessionId]);

  // Layers settle after stacking animation
  useEffect(() => {
    if (stage === "layers") {
      const t = setTimeout(() => setLayersSettled(true), config.layers.length * 300 + 400);
      return () => clearTimeout(t);
    }
  }, [stage, config.layers.length]);

  const enterLayer = useCallback(
    (layer: MemoryLayer) => {
      setActiveLayer(layer);
      presenceRef.current?.updateLayer(layer.id);
      setStage("tunnel");
      // After tunnel animation, show works
      setTimeout(() => setStage("works"), 1200);
    },
    [],
  );

  const exitLayer = useCallback(() => {
    presenceRef.current?.updateLayer(null);
    setActiveLayer(null);
    setActiveWork(null);
    setStage("layers");
  }, []);

  const startScratch = useCallback((work: MuseumWork) => {
    setActiveWork(work);
    setStage("scratching");
  }, []);

  const onRevealed = useCallback(() => {
    if (!activeWork) return;
    setRevealedIds((prev) => new Set(prev).add(activeWork.id));
    setStage("revealed");
  }, [activeWork]);

  const layerWorks = activeLayer
    ? config.works.filter((w) => w.layerId === activeLayer.id)
    : [];

  const t = (obj: { en: string; tr: string }) => obj[lang];

  return (
    <main
      className="relative min-h-dvh w-full overflow-hidden flex flex-col"
      style={{
        background: config.branding.colors.void,
        fontFamily: config.branding.font || "Chakra Petch",
      }}
    >
      {/* Language toggle */}
      <div className="absolute top-4 right-4 z-50 flex gap-1">
        {(["en", "tr"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="px-2 py-1 text-[10px] uppercase tracking-widest rounded transition-all"
            style={{
              color: lang === l ? config.branding.colors.void : config.branding.colors.accent,
              background: lang === l ? config.branding.colors.accent : "transparent",
              border: `1px solid ${config.branding.colors.accent}44`,
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* ─── CONNECTING ─── */}
      <AnimatePresence mode="wait">
        {stage === "connecting" && (
          <motion.div
            key="connecting"
            className="flex-1 flex items-center justify-center"
            exit={{ opacity: 0 }}
          >
            <motion.p
              className="text-2xl font-bold tracking-widest uppercase"
              style={{ color: config.branding.colors.accent }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {lang === "en" ? "Entering the tunnel…" : "Tünele giriliyor…"}
            </motion.p>
          </motion.div>
        )}

        {/* ─── LAYER SELECT ─── */}
        {(stage === "layers" || stage === "tunnel") && (
          <motion.div
            key="layers"
            className="flex-1 flex flex-col items-center px-6 pt-14 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              className="text-xl font-bold tracking-widest uppercase text-center mb-1"
              style={{ color: config.branding.colors.accent }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {config.name}
            </motion.h1>
            <motion.p
              className="text-xs tracking-[0.25em] uppercase mb-8"
              style={{ color: `${config.branding.colors.accent}77` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {lang === "en" ? "Choose a memory layer" : "Bir hafıza katmanı seçin"}
            </motion.p>

            {/* Stacking layer cards */}
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {config.layers.map((layer, i) => (
                <motion.button
                  key={layer.id}
                  onClick={() => layersSettled && enterLayer(layer)}
                  className="relative w-full rounded-lg px-5 py-4 text-left overflow-hidden"
                  style={{
                    border: `1.5px solid ${layer.color}55`,
                    background: `linear-gradient(135deg, ${layer.color}15, ${config.branding.colors.void})`,
                  }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, scale: 0.9 }}
                  animate={
                    stage === "tunnel" && activeLayer?.id === layer.id
                      ? { scale: 1.1, opacity: 1, zIndex: 10 }
                      : stage === "tunnel" && activeLayer?.id !== layer.id
                        ? { opacity: 0, scale: 0.8 }
                        : { opacity: 1, x: 0, scale: 1 }
                  }
                  transition={{
                    delay: stage === "layers" ? i * 0.3 : 0,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileTap={layersSettled ? { scale: 0.97 } : {}}
                >
                  {/* Color accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                    style={{ background: layer.color }}
                  />

                  <p
                    className="text-sm font-bold tracking-wider uppercase"
                    style={{ color: layer.color }}
                  >
                    {t(layer.label)}
                  </p>
                  <p
                    className="text-xs mt-0.5 tracking-widest"
                    style={{ color: `${layer.color}88` }}
                  >
                    {layer.yearRange[0]} — {layer.yearRange[1]}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Get to know Teal button */}
            {layersSettled && config.video && (
              <motion.button
                onClick={() => setShowVideo(true)}
                className="mt-8 px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase"
                style={{
                  border: `1.5px solid ${config.branding.colors.accent}55`,
                  color: config.branding.colors.accent,
                  background: `${config.branding.colors.accent}10`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: config.layers.length * 0.3 + 0.6 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === "en"
                  ? `Get to know ${config.name}`
                  : `${config.name}'ı Tanıyın`}
              </motion.button>
            )}
          </motion.div>
        )}

        {/* ─── WORKS GRID ─── */}
        {stage === "works" && activeLayer && (
          <motion.div
            key="works"
            className="flex-1 flex flex-col items-center px-6 pt-14 pb-8"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back button */}
            <button
              onClick={exitLayer}
              className="absolute top-4 left-4 z-50 text-xs tracking-widest uppercase px-3 py-1.5 rounded"
              style={{
                color: activeLayer.color,
                border: `1px solid ${activeLayer.color}44`,
              }}
            >
              ← {lang === "en" ? "Layers" : "Katmanlar"}
            </button>

            <h2
              className="text-lg font-bold tracking-widest uppercase"
              style={{ color: activeLayer.color }}
            >
              {t(activeLayer.label)}
            </h2>
            <p
              className="text-xs tracking-widest mb-6"
              style={{ color: `${activeLayer.color}77` }}
            >
              {activeLayer.yearRange[0]} — {activeLayer.yearRange[1]}
            </p>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {layerWorks.map((work, i) => {
                const isRevealed = revealedIds.has(work.id);
                return (
                  <motion.button
                    key={work.id}
                    onClick={() => !isRevealed && startScratch(work)}
                    className="relative aspect-3/4 rounded-lg overflow-hidden"
                    style={{
                      border: `1.5px solid ${isRevealed ? activeLayer.color : activeLayer.color + "44"}`,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.4 }}
                    whileTap={!isRevealed ? { scale: 0.95 } : {}}
                  >
                    {isRevealed ? (
                      /* Revealed — show thumbnail */
                      <>
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `url(${work.image}) center/cover`,
                          }}
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 p-2"
                          style={{
                            background: `linear-gradient(transparent, ${config.branding.colors.void}ee)`,
                          }}
                        >
                          <p
                            className="text-[10px] font-bold tracking-wider uppercase"
                            style={{ color: activeLayer.color }}
                          >
                            {t(work.title)}
                          </p>
                        </div>
                      </>
                    ) : (
                      /* Sealed */
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        style={{
                          background: `linear-gradient(160deg, ${activeLayer.color}18, ${config.branding.colors.void})`,
                        }}
                      >
                        <span
                          className="text-3xl font-bold"
                          style={{ color: activeLayer.color }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-[8px] tracking-[0.3em] uppercase mt-1"
                          style={{ color: `${activeLayer.color}55` }}
                        >
                          {lang === "en" ? "Sealed" : "Mühürlü"}
                        </span>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── SCRATCHING ─── */}
        {stage === "scratching" && activeWork && activeLayer && (
          <motion.div
            key="scratching"
            className="flex-1 flex flex-col items-center px-6 pt-14 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setStage("works")}
              className="absolute top-4 left-4 z-50 text-xs tracking-widest uppercase px-3 py-1.5 rounded"
              style={{
                color: activeLayer.color,
                border: `1px solid ${activeLayer.color}44`,
              }}
            >
              ← {lang === "en" ? "Back" : "Geri"}
            </button>

            <h2
              className="text-base font-bold tracking-widest uppercase mb-1"
              style={{ color: activeLayer.color }}
            >
              {lang === "en" ? "Scratch to reveal" : "Ortaya çıkarmak için kazıyın"}
            </h2>
            <p
              className="text-xs tracking-widest mb-4"
              style={{ color: `${activeLayer.color}66` }}
            >
              {t(activeLayer.label)} · {activeWork.year || ""}
            </p>

            <MuseumScratchCard
              work={activeWork}
              layerColor={activeLayer.color}
              voidColor={config.branding.colors.void}
              onRevealed={onRevealed}
            />
          </motion.div>
        )}

        {/* ─── REVEALED ─── */}
        {stage === "revealed" && activeWork && activeLayer && (
          <motion.div
            key="revealed"
            className="flex-1 flex flex-col items-center px-6 pt-14 pb-8 overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => {
                setActiveWork(null);
                setStage("works");
              }}
              className="absolute top-4 left-4 z-50 text-xs tracking-widest uppercase px-3 py-1.5 rounded"
              style={{
                color: activeLayer.color,
                border: `1px solid ${activeLayer.color}44`,
              }}
            >
              ← {lang === "en" ? "Back" : "Geri"}
            </button>

            {/* Revealed image */}
            <motion.div
              className="w-full max-w-sm aspect-4/3 rounded-lg overflow-hidden mb-4"
              style={{
                border: `1.5px solid ${activeLayer.color}`,
                boxShadow: `0 0 30px ${activeLayer.color}33`,
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: `url(${activeWork.image}) center/cover`,
                }}
              />
            </motion.div>

            {/* Info */}
            <motion.div
              className="w-full max-w-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {activeWork.year && (
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: activeLayer.color }}
                >
                  {activeWork.year}
                </p>
              )}
              <h3
                className="text-xl font-bold tracking-wider uppercase"
                style={{ color: config.branding.colors.accent }}
              >
                {t(activeWork.title)}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: `${config.branding.colors.accent}99` }}
              >
                {t(activeWork.description)}
              </p>
            </motion.div>

            {/* Ask Dux button */}
            <motion.button
              onClick={() => setStage("chat")}
              className="mt-6 px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase"
              style={{
                background: `${config.branding.colors.accent}15`,
                border: `1.5px solid ${config.branding.colors.accent}55`,
                color: config.branding.colors.accent,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === "en" ? "Ask Prof Dux" : "Prof Dux'a Sor"}
            </motion.button>
          </motion.div>
        )}

        {/* ─── CHAT (stub — built in task e/f) ─── */}
        {stage === "chat" && activeWork && activeLayer && (
          <motion.div key="chat" className="flex-1 flex flex-col pt-14 pb-4 h-dvh" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <DuxChat
              museumSlug={config.slug}
              workId={activeWork.id}
              lang={lang}
              accentColor={activeLayer.color}
              voidColor={config.branding.colors.void}
              onClose={() => setStage("revealed")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── VIDEO OVERLAY (stub — built in task f) ─── */}
      <AnimatePresence>
        {showVideo && (
          <VideoOverlay config={config} lang={lang} onClose={() => setShowVideo(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ──────────────────────────────────────────────
   Museum Scratch Card — local reveal, no broadcast
   ────────────────────────────────────────────── */

function MuseumScratchCard({
  work,
  layerColor,
  voidColor,
  onRevealed,
}: {
  work: MuseumWork;
  layerColor: string;
  voidColor: string;
  onRevealed: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const cleared = useRef(false);
  const lastCheck = useRef(0);
  const lastPt = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    cleared.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#3a3226");
    g.addColorStop(0.5, "#5c4a2e");
    g.addColorStop(1, "#2e2a20");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    // Patina speckle
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = `rgba(${180 + Math.random() * 40},${140 + Math.random() * 40},${80 + Math.random() * 30},${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }

    ctx.fillStyle = "rgba(240,217,168,0.45)";
    ctx.font = "600 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO RESTORE", width / 2, height / 2);
  }, [work.id]);

  const scratch = (cx: number, cy: number) => {
    const canvas = canvasRef.current;
    if (!canvas || cleared.current) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const r = canvas.getBoundingClientRect();
    const lx = cx - r.left;
    const ly = cy - r.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 28;
    const p = lastPt.current;
    if (p) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(lx, ly);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(lx, ly, 14, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPt.current = { x: lx, y: ly };

    const now = performance.now();
    if (now - lastCheck.current > 200) {
      lastCheck.current = now;
      checkProgress(ctx, canvas);
    }
  };

  const checkProgress = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 20) {
      total++;
      if (data[i] === 0) clear++;
    }
    if (clear / total > 0.55 && !cleared.current) {
      cleared.current = true;
      canvas.style.transition = "opacity 0.8s ease";
      canvas.style.opacity = "0";
      setTimeout(onRevealed, 900);
    }
  };

  return (
    <div
      className="relative w-full max-w-sm aspect-3/4 rounded-lg overflow-hidden touch-none"
      style={{
        border: `1.5px solid ${layerColor}`,
        boxShadow: `inset 0 0 0 1px ${layerColor}33, 0 20px 60px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Pristine image beneath */}
      <div
        className="absolute inset-0"
        style={{ background: `url(${work.image}) center/cover` }}
      />

      {/* Scratch layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
        onPointerDown={(e) => {
          drawing.current = true;
          lastPt.current = null;
          e.currentTarget.setPointerCapture(e.pointerId);
          scratch(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
        onPointerUp={() => {
          drawing.current = false;
          lastPt.current = null;
        }}
      />
    </div>
  );
}