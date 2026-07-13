// lib/museums/index.ts

import type { MuseumConfig } from "./types";
import { tealConfig } from "./teal";

const museumRegistry: Record<string, MuseumConfig> = {
  teal: tealConfig,
};

export function getMuseumConfig(slug: string): MuseumConfig | undefined {
  return museumRegistry[slug];
}

export function getAllMuseumSlugs(): string[] {
  return Object.keys(museumRegistry);
}

export { type MuseumConfig, type MemoryLayer, type MuseumWork, type NarrationCue } from "./types";