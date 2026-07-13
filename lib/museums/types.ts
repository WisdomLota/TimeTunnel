// lib/museums/types.ts

export interface NarrationCue {
  /** Seconds into the video */
  time: number;
  /** Text Dux speaks at this moment */
  text: string;
}

export interface MemoryLayer {
  id: string;
  label: { en: string; tr: string };
  yearRange: [number, number];
  color: string;
}

export interface MuseumWork {
  id: string;
  layerId: string;
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  image: string;
  year?: number;
  /** Per-work context injected into Dux system prompt when chatting about this work */
  duxContext: { en: string; tr: string };
}

export interface MuseumConfig {
  slug: string;
  name: string;
  branding: {
    logo?: string;
    colors: {
      primary: string;
      void: string;
      accent: string;
      layerColors: string[];
    };
    font?: string;
  };
  layers: MemoryLayer[];
  works: MuseumWork[];
  video?: {
    src: string;
    durationSec: number;
    narration: { en: NarrationCue[]; tr: NarrationCue[] };
  };
  /** Base system prompt for Dux in this museum context */
  duxSystemPrompt: { en: string; tr: string };
  yearRange: [number, number];
}