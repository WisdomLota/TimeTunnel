"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ARTWORKS, type Artwork } from "@/lib/artworks";

// 7 featured, by catalog number — identity stays hidden until revealed
const FEATURED_NUMS = ["17539", "18805", "20197", "34425", "35832", "40114", "40128"];
const FEATURED: Artwork[] = FEATURED_NUMS
  .map((n) => ARTWORKS.find((a) => a.num === n))
  .filter(Boolean) as Artwork[];

const OFFSETS = ["mt-0", "mt-8", "mt-3", "mt-10", "mt-2", "mt-8", "mt-5"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function ArtCollection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = FEATURED.find((a) => a.id === activeId) ?? null;

  return (
    <section className="relative h-screen overflow-hidden flex flex-col justify-center px-8">
      <p className="display text-brass/70 text-sm tracking-[0.3em] uppercase mb-3 text-center">
        The Collection
      </p>
      <p className="text-bone/40 text-xs tracking-wide text-center mb-10">
        Seven sealed works. Choose one on your phone to begin the reveal.
      </p>

      <div className="flex flex-wrap justify-center items-center gap-6 max-w-5xl mx-auto">
        {FEATURED.map((art, i) => {
          const dimmed = activeId !== null && activeId !== art.id;
          const n = String(i + 1).padStart(2, "0");
          return (
            <motion.button
              key={art.id}
              layoutId={`art-${art.id}`}
              onClick={() => setActiveId(art.id)}
              animate={
                activeId
                  ? { filter: dimmed ? "blur(5px)" : "blur(0px)", opacity: dimmed ? 0.3 : 1, scale: dimmed ? 0.9 : 1 }
                  : { y: [0, -10, 0], filter: "blur(0px)", opacity: 1, scale: 1 }
              }
              transition={
                activeId
                  ? { duration: 0.55, ease: EASE }
                  : { y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }, delay: i * 0.3 }
              }
              whileHover={!activeId ? { y: -14, scale: 1.04 } : undefined}
              className={`${OFFSETS[i]} group relative w-40 h-56 rounded-sm overflow-hidden flex flex-col items-center justify-center`}
              style={{
                background: "linear-gradient(160deg, var(--color-patina), var(--color-void))",
                boxShadow: "inset 0 0 0 1px var(--color-brass), 0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              {/* brass corner marks */}
              <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-brass/50" />
              <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-brass/50" />
              <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-brass/50" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-brass/50" />

              {/* the number */}
              <span className="display text-6xl brass-text leading-none">{n}</span>
              <span className="text-[10px] tracking-[0.35em] text-bone/40 uppercase mt-4">Sealed</span>

              {/* hover cue */}
              <span className="absolute bottom-4 text-[9px] tracking-[0.25em] text-brass/0 group-hover:text-brass/70 transition-all duration-500 uppercase">
                Reveal
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* opened view — STILL no artwork; a "prepare to reveal" holding state */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onClick={() => setActiveId(null)}
              className="fixed inset-0 z-40 bg-void/90 backdrop-blur-md"
            />
            <motion.div
              layoutId={`art-${active.id}`}
              transition={{ duration: 1.0, ease: EASE }}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-xl h-[70vh] rounded-sm overflow-hidden flex flex-col items-center justify-center"
              style={{
                background: "linear-gradient(160deg, var(--color-patina), var(--color-void))",
                boxShadow: "inset 0 0 0 1px var(--color-brass), 0 40px 100px rgba(0,0,0,0.8)",
              }}
            >
              <button
                onClick={() => setActiveId(null)}
                className="absolute top-4 right-4 text-bone/60 hover:text-brass text-sm tracking-widest z-10"
              >
                CLOSE
              </button>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
                className="text-center px-8"
              >
                <span className="display text-7xl brass-text">
                  {String(FEATURED.findIndex((a) => a.id === active.id) + 1).padStart(2, "0")}
                </span>
                <p className="display text-brass text-sm tracking-[0.3em] uppercase mt-6">Sealed Work</p>
                <p className="text-bone/50 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
                  Scratch on your phone to reveal this piece on the screen.
                </p>
                {/* Phase C: the scratch surface drives the reveal here */}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}