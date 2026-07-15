// lib/museums/types.ts

export interface NarrationCue {
  time: number;
  text: string;
}

export interface MuseumCategory {
  id: string;
  label: { en: string; tr: string };
  /** Short description shown on phone */
  description: { en: string; tr: string };
  color: string;
  /** Icon name or emoji for display */
  icon?: string;
}

export interface MemoryLayer {
  id: string;
  label: { en: string; tr: string };
  yearRange: [number, number];
  color: string;
}

export interface MuseumWork {
  id: string;
  layerId?: string;
  categoryId?: string;
  title: { en: string; tr: string };
  description: { en: string; tr: string };
  image: string;
  year?: number;
  artist?: string;
  duxContext: { en: string; tr: string };
}

export interface JournalPage {
  id: string;
  title: { en: string; tr: string };
  content: { en: string; tr: string };
  image?: string;
  year?: number;
}

export interface JournalVolume {
  id: string;
  label: { en: string; tr: string };
  description: { en: string; tr: string };
  baseUrl: string;
  pageCount: number;
  padDigits: number;
  yearRange: string;
}

export interface MuseumConfig {
  slug: string;
  name: string;
  branding: {
    logo?: string;
    museumLogo?: string;
    colors: {
      primary: string;
      void: string;
      accent: string;
      layerColors: string[];
    };
    font?: string;
  };
  /** Category-based sections (new structure) */
  categories: MuseumCategory[];
  /** Legacy year-based layers (optional, for backward compat) */
  layers: MemoryLayer[];
  works: MuseumWork[];
  /** Journey log pages */
  journalPages: JournalPage[];
  journalVolumes: JournalVolume[];
  /** Floor plan image */
  floorPlan?: { image: string; label: { en: string; tr: string } };
  /** Post card images */
  postCards: { id: string; image: string; caption: { en: string; tr: string } }[];
  video?: {
    src: string;
    durationSec: number;
    narration: { en: NarrationCue[]; tr: NarrationCue[] };
  };
  duxSystemPrompt: { en: string; tr: string };
  yearRange: [number, number];
}