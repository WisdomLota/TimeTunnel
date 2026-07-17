// lib/museums/gate.ts
// Time-based access gate — shared between screen (generates) and phone (validates)

// Change to 300 (5 minutes) for production
const WINDOW_SECONDS = 60;

// Simple secret — not cryptographic, just enough to prevent casual URL sharing
const SECRET = "teal-museum-2026";

function getWindow(offsetSeconds = 0): number {
  return Math.floor((Date.now() / 1000 + offsetSeconds) / WINDOW_SECONDS);
}

function hashWindow(w: number): string {
  // Simple numeric hash — deterministic, no crypto needed
  let h = 0;
  const s = `${SECRET}-${w}`;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

/** Screen calls this to get the current gate code */
export function generateGateCode(): string {
  return hashWindow(getWindow());
}

/** Phone calls this to check if a code is valid (allows current + previous window for clock drift) */
export function validateGateCode(code: string): boolean {
  const current = hashWindow(getWindow());
  const previous = hashWindow(getWindow(-WINDOW_SECONDS));
  return code === current || code === previous;
}

/** How many seconds until the current code expires */
export function secondsUntilExpiry(): number {
  const now = Date.now() / 1000;
  const windowEnd = (getWindow() + 1) * WINDOW_SECONDS;
  return Math.ceil(windowEnd - now);
}