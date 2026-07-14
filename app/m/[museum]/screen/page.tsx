"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useMuseum } from "@/lib/museums/context";
import { watchPresence } from "@/lib/museums/presence";
import { mintSession } from "@/lib/tunnel";

export default function MuseumScreenPage() {
  const config = useMuseum();
  const [sessionId, setSessionId] = useState("");
  useEffect(() => { setSessionId(mintSession()); }, []);
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set());

  // Subscribe to presence
  useEffect(() => {
    const channel = watchPresence(config.slug, setActiveLayers);
    return () => {
      channel.unsubscribe();
    };
  }, [config.slug]);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  const controlUrl = `${origin}/m/${config.slug}/control/${sessionId}`;

  return (
    <div
      className="relative flex h-dvh w-full items-center justify-center overflow-hidden"
      style={{
        fontFamily: config.branding.font || "Chakra Petch",
      }}
    >
      {/* Background image + tint */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/museums/teal/teal-background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute"
        style={{
          background: `radial-gradient(ellipse at center, ${config.branding.colors.void}dd 50%, ${config.branding.colors.void}f5 100%)`,
        }}
      />

      {/* Museum name */}
      {/* Logo — bottom left */}
      {config.branding.logo && (
        <img
          src={config.branding.logo}
          alt={config.name}
          className="absolute bottom-6 left-8 h-16 w-auto object-contain z-10"
        />
      )}

      {/* Info — bottom right */}
      <div className="absolute bottom-6 right-8 text-right z-10">
        <h1
          className="text-2xl font-bold tracking-widest uppercase"
          style={{ color: config.branding.colors.accent }}
        >
          {config.name}
        </h1>
        <p className="text-xs tracking-[0.3em] uppercase opacity-50 text-white mt-1">
          Scan to be drawn into our time tunnel
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-30 text-white mt-0.5">
          Zaman tünelimize çekilmek için tarayın
        </p>
      </div>

      {/* Layer rings — each ring = one memory layer */}
      <div className="relative flex items-center justify-center">
        {config.layers.map((layer, i) => {
          const isActive = activeLayers.has(layer.id);
          const size = 420 + i * 120;
          const radius = size / 2;

          return (
            <motion.div
              key={layer.id}
              className="absolute"
              style={{ width: size, height: size }}
              animate={{
                opacity: isActive ? [0.7, 1, 0.7] : 1,
                scale: isActive ? [1, 1.012, 1] : 1,
              }}
              transition={{
                duration: isActive ? 2.5 : 0.6,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <svg
                viewBox={`0 0 ${size} ${size}`}
                className="w-full h-full"
                overflow="visible"
              >
                {/* Ring */}
                <circle
                  cx={radius}
                  cy={radius}
                  r={radius - 3}
                  fill="none"
                  stroke={layer.color}
                  strokeWidth={isActive ? 8 : 4}
                  opacity={isActive ? 1 : 0.35}
                  filter={isActive ? `drop-shadow(0 0 12px ${layer.color})` : "none"}
                />

                {/* Label on ring — curved text along top arc */}
                <defs>
                  <path
                    id={`arc-${layer.id}`}
                    d={`M ${radius - (radius - 3)},${radius} A ${radius - 3},${radius - 3} 0 0,1 ${radius + (radius - 3)},${radius}`}
                    fill="none"
                  />
                </defs>
                <text
                  fill={layer.color}
                  opacity={isActive ? 1 : 0.65}
                  fontSize={22}
                  fontFamily={config.branding.font || "Chakra Petch"}
                  fontWeight={600}
                  letterSpacing="0.2em"
                >
                  <textPath
                    href={`#arc-${layer.id}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {layer.label.en.toUpperCase()} / {layer.label.tr.toUpperCase()} · {layer.yearRange[0]}–{layer.yearRange[1]}
                  </textPath>
                </text>
              </svg>
            </motion.div>
          );
        })}

        {/* QR at center */}
        {sessionId && (
          <motion.div
            className="relative z-10 rounded-2xl p-4"
          style={{
            background: `${config.branding.colors.void}cc`,
            border: `1px solid ${config.branding.colors.accent}44`,
            boxShadow: `0 0 40px ${config.branding.colors.accent}22`,
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <QRCodeSVG
            value={controlUrl}
            size={220}
            bgColor="transparent"
            fgColor={config.branding.colors.accent}
            level="M"
          />
        </motion.div>
        )}
      </div>
    </div>
  );
}