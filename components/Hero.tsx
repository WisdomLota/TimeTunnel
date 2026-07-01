"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const RINGS = [1, 2, 3, 4, 5]; // concentric depth

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // recede into the tunnel on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ scale, opacity, filter }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center"
      >
        {/* tunnel rings — receding toward vignette center */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "800px" }}
          aria-hidden
        >
          {RINGS.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 0.15 + i * 0.06, scale: 1 }}
              transition={{
                delay: 0.2 + i * 0.12,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute rounded-full border"
              style={{
                width: `${28 + r * 16}vmin`,
                height: `${28 + r * 16}vmin`,
                borderColor: "var(--color-brass)",
                transform: `translateZ(-${i * 120}px)`,
              }}
            />
          ))}
        </div>

        {/* title emerging from depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-6"
        >
          <p className="text-xs tracking-[0.4em] text-brass/70 uppercase mb-6">
            Near East University
          </p>
          <h1 className="display text-6xl md:text-8xl lg:text-9xl brass-text leading-[0.9]">
            Time Tunnel
          </h1>
          <p className="mt-6 max-w-md mx-auto text-bone/60 leading-relaxed">
            A passage through a century of machines and art — from a lone 1899
            survivor to ten metres of silk and ink.
          </p>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[10px] tracking-[0.3em] text-bone/40 uppercase">
            Enter
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-brass to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}