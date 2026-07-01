"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ticks a number up to `value` when it enters view
export function CountUp({ value, suffix = "", duration = 1200 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{n}{suffix}</span>;
}

// hero gauge: a brass arc that fills proportionally
export function GaugeArc({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.min(value / max, 1);
  const R = 52;
  const CIRC = Math.PI * R; // half circle
  return (
    <div className="flex flex-col items-center">
      <svg width="130" height="80" viewBox="0 0 130 80">
        {/* track */}
        <path d="M 13 70 A 52 52 0 0 1 117 70" fill="none"
              stroke="var(--color-patina)" strokeWidth="4" strokeLinecap="round" />
        {/* fill */}
        <motion.path
          d="M 13 70 A 52 52 0 0 1 117 70" fill="none"
          stroke="var(--color-brass)" strokeWidth="4" strokeLinecap="round"
          strokeDasharray={CIRC}
          initial={{ strokeDashoffset: CIRC }}
          whileInView={{ strokeDashoffset: CIRC * (1 - pct) }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>
      <p className="display text-2xl brass-text -mt-4">
        <CountUp value={value} />
      </p>
      <p className="text-[10px] tracking-[0.2em] text-bone/40 uppercase mt-1">{label}</p>
    </div>
  );
}