"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMuseum } from "@/lib/museums/context";
import DuxChat from "@/components/museum/DuxChat";

export default function WorkPage({
  params,
}: {
  params: Promise<{ workId: string }>;
}) {
  const { workId } = use(params);
  const config = useMuseum();
  const [lang, setLang] = useState<"en" | "tr">("tr");
  const [showChat, setShowChat] = useState(false);

  const work = config.works.find((w) => w.id === workId);

  if (!work) {
    return (
      <div
        className="min-h-dvh flex items-center justify-center"
        style={{ background: config.branding.colors.void, color: config.branding.colors.accent }}
      >
        <p className="text-lg tracking-widest uppercase">Work not found</p>
      </div>
    );
  }

  const t = (obj: { en: string; tr: string }) => obj[lang];

  return (
    <main
      className="min-h-dvh w-full flex flex-col"
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

      {/* Work image */}
      <motion.div
        className="w-full aspect-4/3 overflow-hidden"
        style={{ borderBottom: `1.5px solid ${config.branding.colors.accent}33` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-full h-full" style={{ background: `url(${work.image}) center/cover` }} />
      </motion.div>

      {/* Work info */}
      <motion.div
        className="px-6 pt-5 pb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {work.year && (
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: config.branding.colors.accent }}>
            {work.year}
          </p>
        )}
        <h1
          className="text-2xl font-bold tracking-wider uppercase"
          style={{ color: config.branding.colors.accent }}
        >
          {t(work.title)}
        </h1>
        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: `${config.branding.colors.accent}99` }}
        >
          {t(work.description)}
        </p>
      </motion.div>

      {/* Ask Dux button */}
      <div className="px-6 pb-4">
        <motion.button
          onClick={() => setShowChat(!showChat)}
          className="w-full px-5 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase"
          style={{
            color: showChat ? config.branding.colors.void : config.branding.colors.accent,
            background: showChat ? config.branding.colors.accent : `${config.branding.colors.accent}15`,
            border: `1.5px solid ${config.branding.colors.accent}55`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.95 }}
        >
          {showChat
            ? (lang === "en" ? "Close Chat" : "Sohbeti Kapat")
            : (lang === "en" ? "Ask Prof Dux About This" : "Bu Hakkında Prof Dux'a Sor")}
        </motion.button>
      </div>

      {/* Chat */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="px-6 pb-6 flex-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <DuxChat
              museumSlug={config.slug}
              workId={work.id}
              lang={lang}
              accentColor={config.branding.colors.accent}
              voidColor={config.branding.colors.void}
              onClose={() => setShowChat(false)}
              voiceEnabled={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Museum branding footer */}
      <div className="px-6 py-4 mt-auto flex items-center justify-between">
        {config.branding.logo && (
          <img src={config.branding.logo} alt="" className="h-8 w-auto opacity-40" />
        )}
        <p className="text-[10px] tracking-widest uppercase" style={{ color: `${config.branding.colors.accent}33` }}>
          {config.name}
        </p>
      </div>
    </main>
  );
}