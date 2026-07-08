"use client";
import { useState } from "react";
import ProfDuxAvatar from "@/components/ProfDuxAvatar";

export default function DuxTest() {
  const [state, setState] = useState<"idle" | "thinking" | "speaking">("idle");
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8" style={{ background: "#0B0F0E" }}>
      <ProfDuxAvatar state={state} size={300} />
      <div className="flex gap-3">
        {(["idle", "thinking", "speaking"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className="px-4 py-2 rounded-full text-xs uppercase tracking-widest border border-brass/40 text-brass"
          >
            {s}
          </button>
        ))}
      </div>
    </main>
  );
}