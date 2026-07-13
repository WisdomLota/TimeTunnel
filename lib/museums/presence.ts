import { supabase } from "@/lib/supabase";

/**
 * Shared presence channel per museum — all visitors and screens join this.
 * Presence state tracks which layer each visitor is currently in.
 */
export const museumPresenceChannel = (slug: string) =>
  `museum:${slug}:presence`;

export interface VisitorPresence {
  sessionId: string;
  activeLayerId: string | null; // null = on layer-select screen, not inside a layer
}

/**
 * Phone: join presence and track which layer this visitor is in.
 * Returns the channel and an `updateLayer` function.
 */
export function joinAsVisitor(slug: string, sessionId: string) {
  const channel = supabase.channel(museumPresenceChannel(slug), {
    config: { presence: { key: sessionId } },
  });

  const updateLayer = (layerId: string | null) => {
    if (layerId) {
      channel.track({ sessionId, activeLayerId: layerId } as VisitorPresence);
    } else {
      channel.untrack();
    }
  };

  channel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      updateLayer(null);
    }
  });

  return { channel, updateLayer };
}

/**
 * Screen: subscribe to presence and call back with active layer IDs.
 * Returns the channel for cleanup.
 */
export function watchPresence(
  slug: string,
  onUpdate: (activeLayers: Set<string>) => void,
) {
  const channel = supabase.channel(museumPresenceChannel(slug));

  const sync = () => {
    const state = channel.presenceState<VisitorPresence>();
    const active = new Set<string>();
    for (const presences of Object.values(state)) {
      for (const p of presences) {
        if (p.activeLayerId) active.add(p.activeLayerId);
      }
    }
    onUpdate(active);
  };

  channel
    .on("presence", { event: "sync" }, sync)
    .subscribe();

  return channel;
}