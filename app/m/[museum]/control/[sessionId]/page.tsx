"use client";

import { useEffect, useRef, use, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMuseum } from "@/lib/museums/context";
import { joinAsVisitor } from "@/lib/museums/presence";
import DuxChat from "@/components/museum/DuxChat";
import VideoOverlay from "@/components/museum/VideoOverlay";
import type { MuseumCategory, JournalPage } from "@/lib/museums/types";

type Stage = "connecting" | "categories" | "content" | "chat";

export default function MuseumControlPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = use(params);
  const config = useMuseum();

  const [stage, setStage] = useState<Stage>("connecting");
  const [lang, setLang] = useState<"en" | "tr">("tr");
  const [settled, setSettled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MuseumCategory | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const presenceRef = useRef<ReturnType<typeof joinAsVisitor> | null>(null);
  const t = (obj: { en: string; tr: string }) => obj[lang];

  // Join presence
  useEffect(() => {
    const presence = joinAsVisitor(config.slug, sessionId);
    presenceRef.current = presence;
    const timer = setTimeout(() => setStage("categories"), 600);

    const handleExit = () => presence.cleanup();
    window.addEventListener("beforeunload", handleExit);
    window.addEventListener("pagehide", handleExit);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") handleExit();
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleExit);
      window.removeEventListener("pagehide", handleExit);
      handleExit();
    };
  }, [config.slug, sessionId]);

  // Settle animation
  useEffect(() => {
    if (stage === "categories") {
      const t = setTimeout(() => setSettled(true), config.categories.length * 200 + 300);
      return () => clearTimeout(t);
    }
  }, [stage, config.categories.length]);

  const enterCategory = useCallback((cat: MuseumCategory) => {
    setActiveCategory(cat);
    presenceRef.current?.updateLayer(cat.id);
    // Ask Dux goes straight to chat, others go to content
    setStage(cat.id === "ask-dux" ? "chat" : "content");
  }, []);

  const exitCategory = useCallback(() => {
    presenceRef.current?.updateLayer(null);
    setActiveCategory(null);
    setStage("categories");
  }, []);

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

      <AnimatePresence mode="wait">
        {/* ─── CONNECTING ─── */}
        {stage === "connecting" && (
          <motion.div key="connecting" className="flex-1 flex items-center justify-center" exit={{ opacity: 0 }}>
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

        {/* ─── CATEGORY SELECT ─── */}
        {stage === "categories" && (
          <motion.div
            key="categories"
            className="flex-1 flex flex-col items-center px-6 pt-14 pb-8 overflow-y-auto"
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
              {lang === "en" ? "CHOOSE A SECTION" : "BİR BÖLÜM SEÇİN"}
            </motion.p>

            <div className="flex flex-col gap-3 w-full max-w-sm">
              {config.categories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  onClick={() => settled && enterCategory(cat)}
                  className="relative w-full rounded-lg px-5 py-4 text-left overflow-hidden"
                  style={{
                    border: `1.5px solid ${cat.color}55`,
                    background: `linear-gradient(135deg, ${cat.color}15, ${config.branding.colors.void})`,
                  }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    delay: i * 0.2,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileTap={settled ? { scale: 0.97 } : {}}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                    style={{ background: cat.color }}
                  />
                  <p className="text-base font-bold tracking-wider" style={{ color: cat.color }}>
                    {lang === "en" ? t(cat.label).toUpperCase() : t(cat.label).toLocaleUpperCase("tr")}
                  </p>
                  <p className="text-xs mt-0.5 tracking-wider" style={{ color: `${cat.color}88` }}>
                    {t(cat.description)}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Get to know Teal */}
            {settled && config.video && (
              <motion.button
                onClick={() => setShowVideo(true)}
                className="mt-6 px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase"
                style={{
                  border: `1.5px solid ${config.branding.colors.accent}55`,
                  color: config.branding.colors.accent,
                  background: `${config.branding.colors.accent}10`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: config.categories.length * 0.2 + 0.3 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === "en" ? `Get to know ${config.name}` : `${config.name}'ı Tanıyın`}
              </motion.button>
            )}
          </motion.div>
        )}

        {/* ─── CATEGORY CONTENT ─── */}
        {stage === "content" && activeCategory && (
          <motion.div
            key="content"
            className="flex-1 flex flex-col pt-14 pb-8 overflow-y-auto"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Back button */}
            <button
              onClick={exitCategory}
              className="absolute top-4 left-4 z-50 text-xs tracking-widest uppercase px-3 py-1.5 rounded"
              style={{ color: activeCategory.color, border: `1px solid ${activeCategory.color}44` }}
            >
              ← {lang === "en" ? "Back" : "Geri"}
            </button>

            <div className="px-6 pb-4">
              <h2 className="text-lg font-bold tracking-widest uppercase" style={{ color: activeCategory.color }}>
                {t(activeCategory.label)}
              </h2>
              <p className="text-xs mt-1 tracking-wider" style={{ color: `${activeCategory.color}88` }}>
                {t(activeCategory.description)}
              </p>
            </div>

            <div className="flex-1 px-6">
              {activeCategory.id === "floor-plan" && <FloorPlanView config={config} lang={lang} color={activeCategory.color} />}
              {activeCategory.id === "collection" && <CollectionView config={config} lang={lang} color={activeCategory.color} />}
              {activeCategory.id === "post-cards" && <PostCardsView config={config} lang={lang} color={activeCategory.color} />}
              {activeCategory.id === "journey-log" && <JourneyLogView config={config} lang={lang} color={activeCategory.color} />}
            </div>
          </motion.div>
        )}

        {/* ─── CHAT ─── */}
        {stage === "chat" && (
          <motion.div key="chat" className="flex-1 flex flex-col pt-14 pb-4 h-dvh" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              onClick={exitCategory}
              className="absolute top-4 left-4 z-50 text-xs tracking-widest uppercase px-3 py-1.5 rounded"
              style={{ color: activeCategory?.color || config.branding.colors.accent, border: `1px solid ${(activeCategory?.color || config.branding.colors.accent)}44` }}
            >
              ← {lang === "en" ? "Back" : "Geri"}
            </button>
            <DuxChat
              museumSlug={config.slug}
              lang={lang}
              accentColor={activeCategory?.color || config.branding.colors.accent}
              voidColor={config.branding.colors.void}
              onClose={exitCategory}
              voiceEnabled={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video overlay */}
      <AnimatePresence>
        {showVideo && (
          <VideoOverlay config={config} lang={lang} onClose={() => setShowVideo(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

// ── Sub-views ──

function FloorPlanView({ config, lang, color }: { config: any; lang: "en" | "tr"; color: string }) {
  if (!config.floorPlan) return <Placeholder lang={lang} color={color} />;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
      <div className="w-full rounded-lg overflow-hidden" style={{ border: `1.5px solid ${color}44` }}>
        <img src={config.floorPlan.image} alt="" className="w-full h-auto" />
      </div>
      <p className="text-xs tracking-wider" style={{ color: `${color}77` }}>{config.floorPlan.label[lang]}</p>
    </motion.div>
  );
}

function CollectionView({ config, lang, color }: { config: any; lang: "en" | "tr"; color: string }) {
  const works = config.works.filter((w: any) => w.categoryId === "collection");
  if (works.length === 0) return <Placeholder lang={lang} color={color} />;
  return (
    <div className="grid grid-cols-2 gap-3">
      {works.map((work: any, i: number) => (
        <motion.div
          key={work.id}
          className="rounded-lg overflow-hidden"
          style={{ border: `1.5px solid ${color}33` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="aspect-3/4" style={{ background: `url(${work.image}) center/cover` }} />
          <div className="p-2" style={{ background: `${config.branding.colors.void}ee` }}>
            <p className="text-xs font-bold tracking-wider" style={{ color }}>{work.title[lang]}</p>
            {work.year && <p className="text-[10px] mt-0.5" style={{ color: `${color}66` }}>{work.year}</p>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PostCardsView({ config, lang, color }: { config: any; lang: "en" | "tr"; color: string }) {
  if (config.postCards.length === 0) return <Placeholder lang={lang} color={color} />;
  return (
    <div className="flex flex-col gap-4">
      {config.postCards.map((card: any, i: number) => (
        <motion.div
          key={card.id}
          className="rounded-lg overflow-hidden"
          style={{ border: `1.5px solid ${color}33` }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
        >
          <img src={card.image} alt="" className="w-full h-auto" />
          <div className="p-3" style={{ background: `${config.branding.colors.void}ee` }}>
            <p className="text-xs tracking-wider" style={{ color: `${color}cc` }}>{card.caption[lang]}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function JourneyLogView({ config, lang, color }: { config: any; lang: "en" | "tr"; color: string }) {
  const [pageIdx, setPageIdx] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const pages: JournalPage[] = config.journalPages;
  if (pages.length === 0) return <Placeholder lang={lang} color={color} />;
  const page = pages[pageIdx];

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={page.id}
          className="rounded-lg p-5"
          style={{ background: `${color}08`, border: `1.5px solid ${color}33` }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          {page.year && <p className="text-xs tracking-widest uppercase mb-1" style={{ color }}>{page.year}</p>}
          <h3 className="text-lg font-bold tracking-wider" style={{ color: config.branding.colors.accent }}>{page.title[lang]}</h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: `${config.branding.colors.accent}99` }}>{page.content[lang]}</p>
          {page.image && <img src={page.image} alt="" className="w-full rounded-md mt-3" />}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setPageIdx((p) => Math.max(0, p - 1))}
          disabled={pageIdx === 0}
          className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase"
          style={{ color, border: `1px solid ${color}33`, opacity: pageIdx === 0 ? 0.3 : 1 }}
        >
          ← {lang === "en" ? "Prev" : "Önceki"}
        </button>
        <span className="text-xs tracking-wider" style={{ color: `${color}66` }}>{pageIdx + 1} / {pages.length}</span>
        <button
          onClick={() => setPageIdx((p) => Math.min(pages.length - 1, p + 1))}
          disabled={pageIdx === pages.length - 1}
          className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase"
          style={{ color, border: `1px solid ${color}33`, opacity: pageIdx === pages.length - 1 ? 0.3 : 1 }}
        >
          {lang === "en" ? "Next" : "Sonraki"} →
        </button>
      </div>

      <button
        onClick={() => setShowChat(!showChat)}
        className="px-5 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase self-center"
        style={{
          color: showChat ? config.branding.colors.void : config.branding.colors.accent,
          background: showChat ? config.branding.colors.accent : `${config.branding.colors.accent}15`,
          border: `1.5px solid ${config.branding.colors.accent}55`,
        }}
      >
        {showChat ? (lang === "en" ? "Close Chat" : "Sohbeti Kapat") : (lang === "en" ? "Ask Dux About This Page" : "Bu Sayfa Hakkında Dux'a Sor")}
      </button>

      <AnimatePresence>
        {showChat && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <DuxChat
              museumSlug={config.slug}
              lang={lang}
              accentColor={config.branding.colors.accent}
              voidColor={config.branding.colors.void}
              onClose={() => setShowChat(false)}
              voiceEnabled={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Placeholder({ lang, color }: { lang: "en" | "tr"; color: string }) {
  return (
    <motion.div className="flex flex-col items-center justify-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <p className="text-base tracking-widest uppercase" style={{ color }}>{lang === "en" ? "Coming Soon" : "Yakında"}</p>
      <p className="text-xs mt-2 tracking-wider" style={{ color: `${color}55` }}>{lang === "en" ? "Content will be available shortly" : "İçerik kısa sürede eklenecektir"}</p>
    </motion.div>
  );
}