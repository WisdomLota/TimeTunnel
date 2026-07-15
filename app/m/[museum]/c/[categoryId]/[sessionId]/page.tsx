"use client";

import { useEffect, useRef, use, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMuseum } from "@/lib/museums/context";
import { joinAsVisitor } from "@/lib/museums/presence";
import DuxChat from "@/components/museum/DuxChat";
import type { MuseumCategory, JournalPage } from "@/lib/museums/types";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ museum: string; categoryId: string; sessionId: string }>;
}) {
  const { categoryId, sessionId } = use(params);
  const config = useMuseum();

  const [lang, setLang] = useState<"en" | "tr">("tr");
  const [connected, setConnected] = useState(false);

  const presenceRef = useRef<ReturnType<typeof joinAsVisitor> | null>(null);

  const category = config.categories.find((c) => c.id === categoryId);
  const t = (obj: { en: string; tr: string }) => obj[lang];

  // Join presence and track this category
  useEffect(() => {
    const presence = joinAsVisitor(config.slug, sessionId);
    presenceRef.current = presence;

    const timer = setTimeout(() => {
      presence.updateLayer(categoryId);
      setConnected(true);
    }, 400);

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
  }, [config.slug, sessionId, categoryId]);

  if (!category) {
    return (
      <div
        className="min-h-dvh flex items-center justify-center"
        style={{ background: config.branding.colors.void, color: config.branding.colors.accent }}
      >
        <p className="text-lg tracking-widest uppercase">Category not found</p>
      </div>
    );
  }

  return (
    <main
      className="min-h-dvh w-full flex flex-col overflow-hidden"
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

      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <h1
          className="text-2xl font-bold tracking-widest uppercase"
          style={{ color: category.color }}
        >
          {t(category.label)}
        </h1>
        <p
          className="text-sm mt-1 tracking-wider"
          style={{ color: `${category.color}88` }}
        >
          {t(category.description)}
        </p>
      </div>

      {/* Category content */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        {categoryId === "floor-plan" && (
          <FloorPlanView config={config} lang={lang} category={category} />
        )}

        {categoryId === "collection" && (
          <CollectionView config={config} lang={lang} category={category} />
        )}

        {categoryId === "post-cards" && (
          <PostCardsView config={config} lang={lang} category={category} />
        )}

        {categoryId === "journey-log" && (
          <JourneyLogView config={config} lang={lang} category={category} />
        )}

        {categoryId === "ask-dux" && (
          <div className="flex-1 h-full">
            <DuxChat
              museumSlug={config.slug}
              lang={lang}
              accentColor={category.color}
              voidColor={config.branding.colors.void}
              onClose={() => {}}
              voiceEnabled={true}
            />
          </div>
        )}
      </div>
    </main>
  );
}

// ── Floor Plan ──
function FloorPlanView({ config, lang, category }: { config: any; lang: "en" | "tr"; category: MuseumCategory }) {
  if (!config.floorPlan) {
    return <Placeholder lang={lang} color={category.color} />;
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
      <div
        className="w-full rounded-lg overflow-hidden"
        style={{ border: `1.5px solid ${category.color}44` }}
      >
        <img src={config.floorPlan.image} alt="" className="w-full h-auto" />
      </div>
      <p className="text-xs tracking-wider" style={{ color: `${category.color}77` }}>
        {config.floorPlan.label[lang]}
      </p>
    </motion.div>
  );
}

// ── Collection ──
function CollectionView({ config, lang, category }: { config: any; lang: "en" | "tr"; category: MuseumCategory }) {
  const works = config.works.filter((w: any) => w.categoryId === "collection");
  if (works.length === 0) {
    return <Placeholder lang={lang} color={category.color} />;
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      {works.map((work: any, i: number) => (
        <motion.div
          key={work.id}
          className="rounded-lg overflow-hidden"
          style={{ border: `1.5px solid ${category.color}33` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="aspect-3/4" style={{ background: `url(${work.image}) center/cover` }} />
          <div className="p-2" style={{ background: `${config.branding.colors.void}ee` }}>
            <p className="text-xs font-bold tracking-wider" style={{ color: category.color }}>
              {work.title[lang]}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Post Cards ──
function PostCardsView({ config, lang, category }: { config: any; lang: "en" | "tr"; category: MuseumCategory }) {
  if (config.postCards.length === 0) {
    return <Placeholder lang={lang} color={category.color} />;
  }
  return (
    <div className="flex flex-col gap-4">
      {config.postCards.map((card: any, i: number) => (
        <motion.div
          key={card.id}
          className="rounded-lg overflow-hidden"
          style={{ border: `1.5px solid ${category.color}33` }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <img src={card.image} alt="" className="w-full h-auto" />
          <div className="p-3" style={{ background: `${config.branding.colors.void}ee` }}>
            <p className="text-xs tracking-wider" style={{ color: `${category.color}cc` }}>
              {card.caption[lang]}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Journey Log ──
function JourneyLogView({ config, lang, category }: { config: any; lang: "en" | "tr"; category: MuseumCategory }) {
  const [pageIdx, setPageIdx] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const pages: JournalPage[] = config.journalPages;

  if (pages.length === 0) {
    return <Placeholder lang={lang} color={category.color} />;
  }

  const page = pages[pageIdx];

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={page.id}
          className="rounded-lg p-5"
          style={{
            background: `${category.color}08`,
            border: `1.5px solid ${category.color}33`,
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          {page.year && (
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: category.color }}>
              {page.year}
            </p>
          )}
          <h3 className="text-lg font-bold tracking-wider" style={{ color: config.branding.colors.accent }}>
            {page.title[lang]}
          </h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: `${config.branding.colors.accent}99` }}>
            {page.content[lang]}
          </p>
          {page.image && (
            <img src={page.image} alt="" className="w-full rounded-md mt-3" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setPageIdx((p) => Math.max(0, p - 1))}
          disabled={pageIdx === 0}
          className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase"
          style={{
            color: category.color,
            border: `1px solid ${category.color}33`,
            opacity: pageIdx === 0 ? 0.3 : 1,
          }}
        >
          ← {lang === "en" ? "Prev" : "Önceki"}
        </button>

        <span className="text-xs tracking-wider" style={{ color: `${category.color}66` }}>
          {pageIdx + 1} / {pages.length}
        </span>

        <button
          onClick={() => setPageIdx((p) => Math.min(pages.length - 1, p + 1))}
          disabled={pageIdx === pages.length - 1}
          className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase"
          style={{
            color: category.color,
            border: `1px solid ${category.color}33`,
            opacity: pageIdx === pages.length - 1 ? 0.3 : 1,
          }}
        >
          {lang === "en" ? "Next" : "Sonraki"} →
        </button>
      </div>

      {/* Ask Dux about this page */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="px-5 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase self-center"
        style={{
          color: showChat ? config.branding.colors.void : config.branding.colors.accent,
          background: showChat ? config.branding.colors.accent : `${config.branding.colors.accent}15`,
          border: `1.5px solid ${config.branding.colors.accent}55`,
        }}
      >
        {showChat
          ? (lang === "en" ? "Close Chat" : "Sohbeti Kapat")
          : (lang === "en" ? "Ask Dux About This Page" : "Bu Sayfa Hakkında Dux'a Sor")}
      </button>

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
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

// ── Placeholder ──
function Placeholder({ lang, color }: { lang: "en" | "tr"; color: string }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p className="text-base tracking-widest uppercase" style={{ color }}>
        {lang === "en" ? "Coming Soon" : "Yakında"}
      </p>
      <p className="text-xs mt-2 tracking-wider" style={{ color: `${color}55` }}>
        {lang === "en" ? "Content will be available shortly" : "İçerik kısa sürede eklenecektir"}
      </p>
    </motion.div>
  );
}