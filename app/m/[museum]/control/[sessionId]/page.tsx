"use client";

import { useEffect, useRef, use, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMuseum } from "@/lib/museums/context";
import { joinAsVisitor } from "@/lib/museums/presence";
import DuxChat from "@/components/museum/DuxChat";
import VideoOverlay from "@/components/museum/VideoOverlay";
import type { MuseumCategory, JournalPage } from "@/lib/museums/types";
import { validateGateCode } from "@/lib/museums/gate";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type Stage = "connecting" | "categories" | "content" | "chat";

function MuseumControlPageInner({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = use(params);
  const config = useMuseum();
  const [lang, setLang] = useState<"en" | "tr">("tr");
  const [stage, setStage] = useState<Stage>("connecting");
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
  const searchParams = useSearchParams();
  const gateKey = searchParams.get("k");
  const [gateValid, setGateValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setGateValid(gateKey ? validateGateCode(gateKey) : false);
  }, [gateKey]);

  if (gateValid === null) {
    return (
      <main className="min-h-dvh flex items-center justify-center" style={{ background: config.branding.colors.void, fontFamily: config.branding.font }}>
        <p className="text-lg tracking-widest" style={{ color: config.branding.colors.accent }}>...</p>
      </main>
    );
  }

  if (gateValid === false) {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center px-8 gap-4" style={{ background: config.branding.colors.void, fontFamily: config.branding.font }}>
        <img src="/museums/prof-dux.png" alt="" className="w-20 h-20 rounded-full object-cover" style={{ border: `2px solid ${config.branding.colors.accent}44` }} />
        <h1 className="text-xl font-bold tracking-widest text-center" style={{ color: config.branding.colors.accent }}>
          {lang === "en" ? "QR Code Expired" : "QR Kodu Süresi Doldu"}
        </h1>
        <p className="text-sm text-center tracking-wider" style={{ color: `${config.branding.colors.accent}88` }}>
          {lang === "en" ? "Please scan the QR code at the museum to explore." : "Keşfetmek için lütfen müzedeki QR kodunu tarayın."}
        </p>
      </main>
    );
  }

  

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
                className="mt-6 px-6 py-3 rounded-lg text-sm font-semibold tracking-wider"
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
              className="absolute top-4 left-4 z-50 text-xs tracking-widest px-3 py-1.5 rounded"
              style={{ color: activeCategory.color, border: `1px solid ${activeCategory.color}44` }}
            >
              ← {lang === "en" ? "Back" : "Geri"}
            </button>

            <div className="px-6 pb-4">
              <h2 className="text-lg font-bold tracking-widest" style={{ color: activeCategory.color }}>
                {lang === "en" ? t(activeCategory.label).toUpperCase() : t(activeCategory.label).toLocaleUpperCase("tr")}
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
              className="absolute top-4 left-4 z-50 text-xs tracking-widest px-3 py-1.5 rounded"
              style={{ color: activeCategory?.color || config.branding.colors.accent, border: `1px solid ${(activeCategory?.color || config.branding.colors.accent)}44` }}
            >
              ← {lang === "en" ? "BACK" : "GERİ"}
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
  const [selected, setSelected] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const works = config.works.filter((w: any) => w.categoryId === "collection");
  if (works.length === 0) return <Placeholder lang={lang} color={color} />;

  if (selected) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
        <div className="w-full rounded-lg overflow-hidden" style={{ border: `1.5px solid ${color}` }}>
          <img src={selected.image} alt="" className="w-full h-auto" />
        </div>
        {selected.year && <p className="text-xs tracking-widest uppercase" style={{ color }}>{selected.year}</p>}
        <h3 className="text-xl font-bold tracking-wider" style={{ color: config.branding.colors.accent }}>{selected.title[lang]}</h3>
        <p className="text-sm leading-relaxed" style={{ color: `${config.branding.colors.accent}99` }}>{selected.description[lang]}</p>
        <button
          onClick={() => setShowChat(!showChat)}
          className="px-5 py-3 rounded-lg text-sm font-semibold tracking-wider self-center mt-2"
          style={{
            color: showChat ? config.branding.colors.void : config.branding.colors.accent,
            background: showChat ? config.branding.colors.accent : `${config.branding.colors.accent}15`,
            border: `1.5px solid ${config.branding.colors.accent}55`,
          }}
        >
          {showChat ? (lang === "en" ? "Close Chat" : "Sohbeti Kapat") : (lang === "en" ? "Ask Prof Dux" : "Prof Dux'a Sor")}
        </button>
        <AnimatePresence>
          {showChat && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <DuxChat
                museumSlug={config.slug}
                workId={selected.id}
                lang={lang}
                accentColor={config.branding.colors.accent}
                voidColor={config.branding.colors.void}
                onClose={() => setShowChat(false)}
                voiceEnabled={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {works.map((work: any, i: number) => (
        <motion.button
          key={work.id}
          onClick={() => setSelected(work)}
          className="rounded-lg overflow-hidden text-left"
          style={{ border: `1.5px solid ${color}33` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={work.image} alt="" className="w-full h-auto" />
          <div className="p-2" style={{ background: `${config.branding.colors.void}ee` }}>
            <p className="text-xs font-bold tracking-wider" style={{ color }}>{work.title[lang]}</p>
            {work.year && <p className="text-[10px] mt-0.5" style={{ color: `${color}66` }}>{work.year}</p>}
          </div>
        </motion.button>
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
  const [selectedVolume, setSelectedVolume] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [displayPage, setDisplayPage] = useState(1);
  const preloadRef = useRef<HTMLImageElement | null>(null);

  const volumes = config.journalVolumes || [];
  if (volumes.length === 0) return <Placeholder lang={lang} color={color} />;

  const getPageUrl = (vol: any, page: number) =>
    `${vol.baseUrl}${String(page).padStart(vol.padDigits, "0")}.jpg`;

  // Prefetch next page
  useEffect(() => {
    if (!selectedVolume) return;
    const nextPage = pageNum + 1;
    if (nextPage <= selectedVolume.pageCount) {
      const img = new Image();
      img.src = getPageUrl(selectedVolume, nextPage);
    }
  }, [pageNum, selectedVolume]);

  if (!selectedVolume) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs tracking-wider mb-2" style={{ color: `${color}66` }}>
          {lang === "en" ? "Select a volume to browse the ship's official logs" : "Geminin resmi kayıtlarına göz atmak için bir cilt seçin"}
        </p>
        {volumes.map((vol: any, i: number) => (
          <motion.button
            key={vol.id}
            onClick={() => { setSelectedVolume(vol); setPageNum(1); setDisplayPage(1); setImgLoading(true); }}
            className="w-full rounded-lg px-5 py-4 text-left overflow-hidden relative"
            style={{ border: `1.5px solid ${color}44`, background: `linear-gradient(135deg, ${color}10, ${config.branding.colors.void})` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ background: color }} />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-bold tracking-wider" style={{ color }}>{vol.label[lang]}</p>
                <p className="text-xs mt-0.5 tracking-wider" style={{ color: `${color}88` }}>{vol.description[lang]}</p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-[10px] tracking-widest" style={{ color: `${color}55` }}>{vol.yearRange}</p>
                <p className="text-[10px] tracking-wider" style={{ color: `${color}44` }}>{vol.pageCount} {lang === "en" ? "pages" : "sayfa"}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => { setSelectedVolume(null); setShowChat(false); }}
        className="text-xs tracking-widest self-start px-3 py-1.5 rounded"
        style={{ color, border: `1px solid ${color}44` }}
      >
        ← {lang === "en" ? "VOLUMES" : "CİLTLER"}
      </button>

      <div className="text-center">
        <p className="text-sm font-bold tracking-wider" style={{ color }}>{selectedVolume.label[lang]}</p>
        <p className="text-[10px] tracking-wider" style={{ color: `${color}66` }}>{selectedVolume.description[lang]} · {selectedVolume.yearRange}</p>
      </div>

      {/* Page image — book style */}
      <div
        className="relative w-full rounded-lg overflow-hidden mx-auto"
        style={{
          border: `2px solid ${color}33`,
          boxShadow: "4px 4px 20px rgba(0,0,0,0.4), inset 0 0 30px rgba(0,0,0,0.1)",
          background: "#f4f0e8",
          minHeight: 300,
        }}
      >
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: "#f4f0e8" }}>
            <motion.p className="text-sm tracking-widest" style={{ color: `${color}88` }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
              {lang === "en" ? "Loading page…" : "Sayfa yükleniyor…"}
            </motion.p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={`${selectedVolume.id}-${displayPage}`}
            src={getPageUrl(selectedVolume, displayPage)}
            alt={`Page ${pageNum}`}
            className="w-full h-auto"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            onLoad={() => setImgLoading(false)}
          />
        </AnimatePresence>
      </div>

      {/* Flip navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            const next = Math.max(1, pageNum - 1);
            setPageNum(next);
            setImgLoading(true);
            const img = new Image();
            img.src = getPageUrl(selectedVolume, next);
            img.onload = () => { setDisplayPage(next); setImgLoading(false); };
          }}
          disabled={pageNum <= 1}
          className="px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider"
          style={{ color, border: `1.5px solid ${color}33`, opacity: pageNum <= 1 ? 0.3 : 1 }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 inline mr-1" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          {lang === "en" ? "Flip" : "Çevir"}
        </button>
        <span className="text-xs tracking-wider" style={{ color: `${color}66` }}>{pageNum} / {selectedVolume.pageCount}</span>
        <button
          onClick={() => {
            const next = Math.min(selectedVolume.pageCount, pageNum + 1);
            setPageNum(next);
            setImgLoading(true);
            const img = new Image();
            img.src = getPageUrl(selectedVolume, next);
            img.onload = () => { setDisplayPage(next); setImgLoading(false); };
          }}
          disabled={pageNum >= selectedVolume.pageCount}
          className="px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider"
          style={{ color, border: `1.5px solid ${color}33`, opacity: pageNum >= selectedVolume.pageCount ? 0.3 : 1 }}
        >
          {lang === "en" ? "Flip" : "Çevir"}
          <svg viewBox="0 0 24 24" className="w-4 h-4 inline ml-1" fill="currentColor"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
        </button>
      </div>

      {/* Ask Dux */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="px-5 py-3 rounded-lg text-sm font-semibold tracking-wider self-center"
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
            <DuxChat museumSlug={config.slug} lang={lang} accentColor={config.branding.colors.accent} voidColor={config.branding.colors.void} onClose={() => setShowChat(false)} voiceEnabled={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Placeholder({ lang, color }: { lang: "en" | "tr"; color: string }) {
  return (
    <motion.div className="flex flex-col items-center justify-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <p className="text-base tracking-widest" style={{ color }}>{lang === "en" ? "COMING SOON" : "YAKINDA"}</p>
      <p className="text-xs mt-2 tracking-wider" style={{ color: `${color}55` }}>{lang === "en" ? "Content will be available shortly" : "İçerik kısa sürede eklenecektir"}</p>
    </motion.div>
  );
}

export default function MuseumControlPage({ params }: { params: Promise<{ sessionId: string }> }) {
  return <Suspense><MuseumControlPageInner params={params} /></Suspense>;
}