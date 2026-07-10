export type Stage = "idle" | "connected" | "selected" | "revealing" | "revealed";

export const channelName = (sessionId: string) => `tunnel:${sessionId}`;

export function mintSession() {
  return Math.random().toString(36).slice(2, 10);
}

import { ARTWORKS, type Artwork } from "@/lib/artworks";

export const FEATURED_NUMS = ["17539", "18805", "20197", "34425", "35832", "40114", "40128"];

export const FEATURED: Artwork[] = FEATURED_NUMS
  .map((n) => ARTWORKS.find((a) => a.num === n))
  .filter(Boolean) as Artwork[];