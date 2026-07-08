"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type State = "idle" | "thinking" | "speaking";

export default function ProfDuxAvatar({
  state = "idle",
  size = 280,
}: {
  state?: State;
  size?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // pointer / tilt drives parallax (subtle)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });

  // subtle premium range: small degrees, small px shifts
  const rotateY = useTransform(sx, [-1, 1], [-6, 6]);
  const rotateX = useTransform(sy, [-1, 1], [5, -5]);
  const subjX = useTransform(sx, [-1, 1], [-10, 10]);   // subject moves most
  const subjY = useTransform(sy, [-1, 1], [-8, 8]);
  const glowX = useTransform(sx, [-1, 1], [14, -14]);   // glow behind moves opposite
  const glowY = useTransform(sy, [-1, 1], [12, -12]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onLeave = () => { px.set(0); py.set(0); };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    // device orientation (mobile) — gentle
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      px.set(Math.max(-1, Math.min(1, e.gamma / 30)));
      py.set(Math.max(-1, Math.min(1, (e.beta - 45) / 30)));
    };
    window.addEventListener("deviceorientation", onTilt);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, [px, py]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ width: size, height: size * 1.28, perspective: 900 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* depth glow behind — state-tinted */}
        <motion.div
          animate={{
            opacity: state === "speaking" ? [0.4, 0.7, 0.4] : state === "thinking" ? [0.25, 0.45, 0.25] : 0.3,
            scale: state === "speaking" ? [1, 1.06, 1] : 1,
          }}
          transition={{
            duration: state === "speaking" ? 0.8 : 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(198,154,75,0.55), transparent 65%)",
            x: glowX, y: glowY 
          }}
        />

        {/* the subject — idle float, parallax shift */}
        <motion.div
          style={{ x: subjX, y: subjY }}
          animate={{ y: state === "idle" ? [0, -8, 0] : 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-end justify-center"
        >
          <div className="relative w-full h-full">
            {/* Prof Dux himself */}
            <img
              src="/prof-dux.png"
              alt="Prof Dux"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))" }}
              draggable={false}
            />

            {/* chrome glint — clipped to the silhouette */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{
                maskImage: "url(/prof-dux.png)",
                WebkitMaskImage: "url(/prof-dux.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            >
              <motion.div
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.4) 50%, transparent 58%)",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* thinking dots */}
        {state === "thinking" && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                className="w-1.5 h-1.5 rounded-full bg-brass"
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}