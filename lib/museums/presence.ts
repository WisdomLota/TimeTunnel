import { supabase } from "@/lib/supabase";

const channelName = (slug: string) => `museum:${slug}:activity`;

/**
 * Phone: broadcast which layer this visitor is in.
 * Sends a heartbeat every 3s so the screen can detect disconnections.
 */
export function joinAsVisitor(slug: string, _sessionId: string) {
  const visitorId = `${_sessionId}-${Math.random().toString(36).slice(2, 8)}`;

  const channel = supabase.channel(channelName(slug), {
    config: { broadcast: { self: false } },
  });

  let currentLayerId: string | null = null;
  let heartbeatInterval: ReturnType<typeof setInterval> | null = null;

  const sendState = () => {
    channel.send({
      type: "broadcast",
      event: "visitor-state",
      payload: { sessionId: visitorId, activeLayerId: currentLayerId, ts: Date.now() },
    });
  };

  const updateLayer = (layerId: string | null) => {
    currentLayerId = layerId;
    sendState();
  };

  channel.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      sendState();
      // Heartbeat every 3 seconds
      heartbeatInterval = setInterval(sendState, 3000);
    }
  });

  const cleanup = () => {
    currentLayerId = null;
    sendState();
    if (heartbeatInterval) clearInterval(heartbeatInterval);
    channel.unsubscribe();
  };

  return { channel, updateLayer, cleanup };
}

/**
 * Screen: listen for visitor broadcasts and track active layers.
 * If a visitor hasn't sent a heartbeat in 6s, consider them gone.
 */
export function watchPresence(
  slug: string,
  onUpdate: (activeLayers: Set<string>) => void,
) {
  const visitors = new Map<string, { activeLayerId: string | null; ts: number }>();
  const TIMEOUT_MS = 6000;

  const recalculate = () => {
    const now = Date.now();
    const active = new Set<string>();
    for (const [sid, state] of visitors) {
      if (now - state.ts > TIMEOUT_MS) {
        visitors.delete(sid);
      } else if (state.activeLayerId) {
        active.add(state.activeLayerId);
      }
    }
    onUpdate(active);
  };

  const channel = supabase.channel(channelName(slug), {
    config: { broadcast: { self: false } },
  });

  channel
    .on("broadcast", { event: "visitor-state" }, ({ payload }) => {
      const { sessionId, activeLayerId } = payload;
      visitors.set(sessionId, { activeLayerId, ts: Date.now() });
      recalculate();
    })
    .subscribe();

  // Cleanup stale visitors every 4 seconds
  const cleanupInterval = setInterval(recalculate, 4000);

  // Return a channel-like object with cleanup
  const originalUnsub = channel.unsubscribe.bind(channel);
  channel.unsubscribe = () => {
    clearInterval(cleanupInterval);
    return originalUnsub();
  };

  return channel;
}