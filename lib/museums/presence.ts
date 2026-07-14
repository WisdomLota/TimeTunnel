import { supabase } from "@/lib/supabase";

/**
 * Shared presence channel per museum — all visitors and screens join this.
 * Presence state tracks which layer each visitor is currently in.
 */
export const museumPresenceChannel = (slug: string) =>
  `museum:${slug}:presence`;

export interface VisitorPresence {
  sessionId: string;
  activeLayerId: string | null;
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
    channel.track({ sessionId, activeLayerId: layerId } as VisitorPresence);
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
 * The screen must also track its own presence to participate in the
 * presence protocol and reliably receive sync/join/leave events.
 * Returns the channel for cleanup.
 */
export function watchPresence(
  slug: string,
  onUpdate: (activeLayers: Set<string>) => void,
) {
  const screenKey = `screen-${Math.random().toString(36).slice(2, 6)}`;

  const channel = supabase.channel(museumPresenceChannel(slug), {
    config: { presence: { key: screenKey } },
  });

  const sync = () => {
    const state = channel.presenceState();
    const active = new Set<string>();
    for (const presences of Object.values(state)) {
      for (const p of presences as Record<string, unknown>[]) {
        const layerId = p.activeLayerId;
        if (typeof layerId === "string" && layerId.length > 0) {
          active.add(layerId);
        }
      }
    }
    onUpdate(active);
  };

  channel
    .on("presence", { event: "sync" }, sync)
    .on("presence", { event: "join" }, sync)
    .on("presence", { event: "leave" }, sync)
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ role: "screen" });
      }
    });

  return channel;
}