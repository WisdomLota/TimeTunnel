"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CountUp, GaugeArc } from "@/components/gauge";

type Car = {
  id: string; name: string; year: string; origin: string;
  engine: string; power: number; top: number; src: string; story: string;
};

const CARS: Car[] = [
  { id: "lambo", name: "Murciélago Roadster", year: "2006", origin: "Italy",
    engine: "6.2L V12", power: 580, top: 320, src: "/supercar-sample.jpeg",
    story: "A raging bull with the roof torn off. The Roadster traded the coupé's scissor-shut silhouette for open sky, its V12 howl unmuffled by glass — engineering theatre as much as machine." },
  { id: "viper", name: "Viper SRT10 Final Edition", year: "2010", origin: "USA",
    engine: "8.4L V10", power: 600, top: 325, src: "/supercar-sample.jpeg",
    story: "American excess distilled: a truck-derived V10 wedged into a two-seat blade, no traction control, no apology. The Final Edition marked the end of a bloodline before its later revival." },
  { id: "jaguar", name: "Jaguar XK120", year: "1949", origin: "United Kingdom",
    engine: "3.4L I6", power: 160, top: 200, src: "/supercar-sample.jpeg",
    story: "When it debuted, the '120' in its name was a promise — 120 mph, the fastest production car on earth. Sculpted in aluminium over ash, it made speed look like couture." },
  { id: "buick", name: "Buick Model 10", year: "1909", origin: "USA",
    engine: "2.7L I4", power: 22, top: 72, src: "/supercar-sample.jpeg",
    story: "A survivor from motoring's dawn, when a car was a hand-built rarity and 72 km/h felt like flight. Simple, upright, and improbably still here more than a century on." },
];

function TiltCard({ car, index, activeId, onSelect }: {
  car: Car; index: number; activeId: string | null; onSelect: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dimmed = activeId !== null && activeId !== car.id;
  const isActive = activeId === car.id;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || activeId) return; // no tilt while a panel is open
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) scale(1.02)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0) scale(1)";
  };

  return (
    // OUTER: position/clear-out only — never runs the float keyframes
    <motion.div
      className="shrink-0"
      animate={
        activeId === null
          ? { x: 0, opacity: 1 }
          : dimmed
          ? { x: index < 2 ? "-120vw" : "120vw", opacity: 0 }
          : { x: 0, opacity: 1 }
      }
      transition={
        activeId === null
          ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          : dimmed
          ? { duration: 0.7, ease: [0.7, 0, 0.84, 0] }
          : { duration: 0.4 }
      }
    >
      {/* FLOAT: only animates when nothing is open; resets clean to y:0 */}
      <motion.div
        animate={activeId === null ? { y: [0, -14, 0] } : { y: 0 }}
        transition={
          activeId === null
            ? { duration: 5 + index * 0.7, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }
            : { duration: 0.4, ease: "easeOut" }
        }
      >
        {/* GLOW */}
        <motion.div
          animate={{
            boxShadow: [
              "inset 0 0 0 1px var(--color-brass), 0 30px 80px rgba(0,0,0,0.6), 0 0 0px rgba(198,154,75,0)",
              "inset 0 0 0 1px var(--color-brass), 0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(198,154,75,0.25)",
              "inset 0 0 0 1px var(--color-brass), 0 30px 80px rgba(0,0,0,0.6), 0 0 0px rgba(198,154,75,0)",
            ],
          }}
          transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          className="rounded-sm"
        >
          <button
            ref={ref as any}
            onMouseMove={onMove}
            onMouseLeave={reset}
            onClick={() => onSelect(car.id)}
            className="relative w-[70vw] md:w-[42vw] h-[62vh] rounded-sm overflow-hidden transition-transform duration-200 ease-out text-left block"
          >
            <div className="absolute inset-0" style={{ background: `url(${car.src}) center/cover` }} />
            <div className="absolute inset-0 bg-linear-to-t from-void via-void/20 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <p className="display text-brass text-sm tracking-widest">{car.year} · {car.origin}</p>
              <h3 className="display text-4xl brass-text mt-1">{car.name}</h3>
              <div className="flex gap-6 mt-4 text-bone/60 text-xs">
                <span className="text-brass">{car.engine}</span>
                <span className="text-brass">{car.power} hp</span>
                <span className="text-brass">{car.top} km/h</span>
              </div>
            </div>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function CarGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef });
  const x = useTransform(scrollYProgress, [0, 1], ["2vw", "-78vw"]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = CARS.find((c) => c.id === activeId) ?? null;

  return (
    <section ref={trackRef} id="gallery" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <p className="display text-brass/70 text-sm tracking-[0.3em] uppercase mb-8 px-8">
          The Machines
        </p>
        <motion.div style={{ x }} className="flex gap-8 px-8 will-change-transform">
          {CARS.map((car, i) => (
            <TiltCard key={car.id} car={car} index={i} activeId={activeId} onSelect={setActiveId} />
          ))}
        </motion.div>

        {/* gauge-open detail panel */}
        <AnimatePresence>
          {active && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                onClick={() => setActiveId(null)}
                className="absolute inset-0 z-30 bg-void/85 backdrop-blur-md"
              />
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 right-0 bottom-0 z-40 h-[80vh] rounded-t-lg overflow-hidden"
                style={{ background: "var(--color-patina)", boxShadow: "0 -20px 80px rgba(0,0,0,0.7), inset 0 1px 0 var(--color-brass)" }}
              >
                {/* needle sweep on arrival */}
                <motion.div
                  initial={{ x: "-10%", opacity: 0.8 }} animate={{ x: "110%", opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                  className="absolute top-0 h-full w-24 z-10 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(240,217,168,0.15), transparent)" }}
                />

                <button
                  onClick={() => setActiveId(null)}
                  className="absolute top-5 right-6 z-20 text-bone/60 hover:text-brass text-sm tracking-widest"
                >
                  CLOSE
                </button>

                <div className="grid md:grid-cols-2 h-full">
                  {/* image */}
                  <div className="relative h-48 md:h-full">
                    <div className="absolute inset-0" style={{ background: `url(${active.src}) center/cover` }} />
                    <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-patina via-transparent to-transparent" />
                  </div>

                  {/* story + gauges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="p-8 md:p-14 flex flex-col justify-center"
                  >
                    <p className="display text-brass text-sm tracking-widest">{active.year} · {active.origin}</p>
                    <h3 className="display text-4xl md:text-5xl brass-text mt-1">{active.name}</h3>
                    <p className="mt-5 text-bone/70 leading-relaxed text-sm max-w-md">{active.story}</p>

                    <div className="flex items-end gap-10 mt-8">
                      <GaugeArc value={active.top} max={350} label="km/h" />
                      <div>
                        <p className="display text-3xl brass-text"><CountUp value={active.power} suffix=" hp" /></p>
                        <p className="text-[10px] tracking-[0.2em] text-bone/40 uppercase mt-1">Power</p>
                      </div>
                      <div>
                        <p className="display text-xl text-bone/80">{active.engine}</p>
                        <p className="text-[10px] tracking-[0.2em] text-bone/40 uppercase mt-1">Engine</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}