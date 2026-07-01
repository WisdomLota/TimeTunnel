"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Car = { id: string; name: string; year: string; story: string; src: string };

const CARS: Car[] = [
  { id: "crest", name: "Crestmobile", year: "1899", src: "/crest-sample.jpg",
    story: "The only surviving example in the world." },
  { id: "wolseley", name: "Wolseley", year: "1903", src: "/crest-sample.jpg",
    story: "An early survivor of the motoring age." },
  { id: "jaguar", name: "Jaguar XK120", year: "1949", src: "/crest-sample.jpg",
    story: "Once the fastest production car in the world." },
  { id: "royal", name: "The Royal Gift", year: "1953", src: "/crest-sample.jpg",
    story: "Presented to Dr. Fazıl Küçük by Queen Elizabeth II." },
];

const OFFSETS = ["mt-0", "mt-24", "mt-8", "mt-32"];

// tuned ease — authored, not bouncy
const EASE = [0.16, 1, 0.3, 1] as const;
const MORPH = { duration: 1.0, ease: EASE };

export default function CarWall() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = CARS.find((c) => c.id === activeId) ?? null;

  return (
    <section className="relative min-h-screen px-8 py-32">
      <p className="display text-brass/70 text-sm tracking-[0.3em] uppercase mb-16 text-center">
        The Collection
      </p>

      <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
        {CARS.map((car, i) => {
          const dimmed = activeId !== null && activeId !== car.id;
          return (
            <motion.button
              key={car.id}
              layoutId={`card-${car.id}`}
              onClick={() => setActiveId(car.id)}
              // ambient float — slow, offset per card, only when wall is idle
              animate={
                activeId
                  ? {
                      filter: dimmed ? "blur(5px)" : "blur(0px)",
                      opacity: dimmed ? 0.3 : 1,
                      scale: dimmed ? 0.9 : 1,
                    }
                  : {
                      y: [0, -10, 0],
                      filter: "blur(0px)",
                      opacity: 1,
                      scale: 1,
                    }
              }
              transition={
                activeId
                  ? { duration: 0.55, ease: EASE }
                  : { y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }, delay: i * 0.3 }
              }
              // hover lift + brighten the affordance
              whileHover={!activeId ? { y: -16, scale: 1.03 } : undefined}
              className={`${OFFSETS[i]} group relative w-64 h-44 rounded-sm overflow-hidden text-left`}
              style={{ boxShadow: "inset 0 0 0 1px var(--color-brass), 0 20px 50px rgba(0,0,0,0.5)" }}
            >
              <div className="absolute inset-0" style={{ background: `url(${car.src}) center/cover` }} />
              <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60"
                   style={{ background: "linear-gradient(160deg, rgba(46,42,32,0.85), rgba(20,16,12,0.9))" }} />
              <div className="absolute bottom-0 p-4">
                <p className="display text-brass text-xs tracking-widest">{car.year}</p>
                <h3 className="display text-xl brass-text">{car.name}</h3>
              </div>
              {/* open affordance — appears on hover */}
              <span className="absolute top-3 right-3 text-[10px] tracking-[0.25em] text-brass/0 group-hover:text-brass/80 transition-all duration-500">
                RESTORE →
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <>
            {/* tunnel-dark envelops gradually */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onClick={() => setActiveId(null)}
              className="fixed inset-0 z-40 bg-void/85 backdrop-blur-sm"
            />

            {/* the card, drawn down the tunnel — slow morph */}
            <motion.div
              layoutId={`card-${active.id}`}
              transition={MORPH}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl h-[70vh] rounded-sm overflow-hidden"
              style={{ boxShadow: "inset 0 0 0 1px var(--color-brass), 0 40px 100px rgba(0,0,0,0.8)" }}
            >
              <div className="absolute inset-0" style={{ background: `url(${active.src}) center/cover` }} />
              <div className="absolute inset-0 bg-linear-to-t from-void via-transparent to-transparent" />

              {/* content fades up AFTER the card lands */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                onClick={() => setActiveId(null)}
                className="absolute top-4 right-4 text-bone/60 hover:text-brass text-sm tracking-widest z-10"
              >
                CLOSE
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6, ease: EASE }}
                className="absolute bottom-0 p-8"
              >
                <p className="display text-brass text-sm tracking-widest">{active.year}</p>
                <h3 className="display text-4xl brass-text">{active.name}</h3>
                <p className="mt-2 text-bone/70 text-sm max-w-md">{active.story}</p>
                {/* (b): "entered the tunnel" beat + scratch surface goes here */}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}