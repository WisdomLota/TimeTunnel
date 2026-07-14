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

type Stage = "connecting" | "layers" | "tunnel" | "works" | "revealed" | "chat";

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
  const [showVideo, setShowVideo] = useState(false);
  const { speak } = useDuxVoice();

  const presenceRef = useRef<ReturnType<typeof joinAsVisitor> | null>(null);

  // Join presence
  useEffect(() => {
    const presence = joinAsVisitor(config.slug, sessionId);
    presenceRef.current = presence;

    // Small delay for cinematic entry
    const t = setTimeout(() => setStage("layers"), 600);

    const handleExit = () => presence.cleanup();
    window.addEventListener("beforeunload", handleExit);
    window.addEventListener("pagehide", handleExit);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") handleExit();
    });

    return () => {
      clearTimeout(t);
      window.removeEventListener("beforeunload", handleExit);
      window.removeEventListener("pagehide", handleExit);
      handleExit();
    };
  }, [config.slug, sessionId]);

  // Layers settle after stacking animation
  useEffect(() => {
    if (stage === "layers") {
      const t = setTimeout(() => setLayersSettled(true), config.layers.length * 200 + 300);
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

  const selectWork = useCallback((work: MuseumWork) => {
    setActiveWork(work);
    setStage("revealed");
  }, []);

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
              className="text-2xl font-bold tracking-widest uppercase text-center mb-1"
              style={{ color: config.branding.colors.accent }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {config.name}
            </motion.h1>
            <motion.p
              className="text-sm tracking-[0.25em] mb-8"
              style={{ color: `${config.branding.colors.accent}77` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {lang === "en" ? "CHOOSE A MEMORY LAYER" : "BİR HAFIZA KATMANI SEÇİN"}
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
                    delay: stage === "layers" ? i * 0.2 : 0,
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
                    className="text-base font-bold tracking-wider uppercase"
                    style={{ color: layer.color }}
                  >
                    {t(layer.label)}
                  </p>
                  <p
                    className="text-sm mt-0.5 tracking-widest"
                    style={{ color: `${layer.color}88` }}
                  >
                    {layer.yearRange[0]} — {layer.yearRange[1]}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Get to know HMS Jackton – Teal button */}
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
                transition={{ delay: config.layers.length * 0.2 + 0.3 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === "en"
                  ? `Get to know ${config.name}`
                  : `${config.name}'ı Tanıyın`}
              </motion.button>
            )}

            {layersSettled && (
              <motion.button
                onClick={() => { setActiveWork(null); setStage("chat"); }}
                className="mt-3 px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase"
                style={{
                  border: `1.5px solid ${config.branding.colors.accent}55`,
                  color: config.branding.colors.accent,
                  background: `${config.branding.colors.accent}10`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: config.layers.length * 0.2 + 0.5 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === "en" ? "Ask Prof Dux" : "Prof Dux'a Sor"}
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
              {layerWorks.map((work, i) => (
                <motion.button
                  key={work.id}
                  onClick={() => selectWork(work)}
                  className="relative aspect-3/4 rounded-lg overflow-hidden"
                  style={{
                    border: `1.5px solid ${activeLayer.color}44`,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: `url(${work.image}) center/cover` }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-2"
                    style={{
                      background: `linear-gradient(transparent, ${config.branding.colors.void}ee)`,
                    }}
                  >
                    <p
                      className="text-xs font-bold tracking-wider uppercase"
                      style={{ color: activeLayer.color }}
                    >
                      {t(work.title)}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
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
                className="text-2xl font-bold tracking-wider uppercase"
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
        {stage === "chat" && (
          <motion.div key="chat" className="flex-1 flex flex-col pt-14 pb-4 h-dvh" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <DuxChat
              museumSlug={config.slug}
              workId={activeWork?.id}
              lang={lang}
              accentColor={activeLayer?.color || config.branding.colors.accent}
              voidColor={config.branding.colors.void}
              onClose={() => setStage(activeWork ? "revealed" : "layers")}
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