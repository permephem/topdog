"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Bell, BellRing, CheckCircle2, Clock, Phone, Volume2 } from "lucide-react";
import { business } from "@/lib/business";

type ShopAlert = {
  id: string;
  name: string;
  phone: string;
  phoneDigits: string;
  preferredTime: string;
  message: string;
  urgent: boolean;
  status: "pending" | "acknowledged";
  createdAt: string;
};

const POLL_MS = 3000;
const REPEAT_SOUND_MS = 20000;

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatClock(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

function playAlertTone(urgent: boolean) {
  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const pattern = urgent
    ? [880, 0, 880, 0, 1100, 0, 1100]
    : [660, 0, 880];

  let time = ctx.currentTime + 0.05;

  for (const frequency of pattern) {
    if (frequency === 0) {
      time += 0.12;
      continue;
    }

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.35, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.35);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(time);
    oscillator.stop(time + 0.36);
    time += 0.42;
  }

  window.setTimeout(() => {
    void ctx.close();
  }, 3000);
}

function getTokenFromLocation() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("token") ?? sessionStorage.getItem("shop-display-token") ?? "";
}

export default function ShopDisplay() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [alerts, setAlerts] = useState<ShopAlert[]>([]);
  const [audioReady, setAudioReady] = useState(false);
  const [clock, setClock] = useState(() => new Date());
  const [error, setError] = useState("");
  const [ackLoading, setAckLoading] = useState<string | null>(null);

  const seenIdsRef = useRef<Set<string>>(new Set());
  const lastSoundRef = useRef<number>(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    const saved = getTokenFromLocation();
    if (saved) {
      setToken(saved);
      sessionStorage.setItem("shop-display-token", saved);
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const fetchAlerts = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch("/api/shop/alerts", {
        headers: { "x-shop-token": token },
        cache: "no-store",
      });

      if (response.status === 401) {
        setError("Invalid shop display token.");
        setToken("");
        sessionStorage.removeItem("shop-display-token");
        return;
      }

      if (!response.ok) {
        throw new Error("Unable to load alerts.");
      }

      const data = (await response.json()) as { alerts: ShopAlert[] };
      setAlerts(data.alerts);
      setError("");

      if (!initializedRef.current) {
        data.alerts.forEach((alert) => seenIdsRef.current.add(alert.id));
        initializedRef.current = true;
        return;
      }

      const newAlerts = data.alerts.filter(
        (alert) => !seenIdsRef.current.has(alert.id),
      );

      if (newAlerts.length > 0 && audioReady) {
        playAlertTone(newAlerts.some((alert) => alert.urgent));
        lastSoundRef.current = Date.now();
        document.title = newAlerts.some((alert) => alert.urgent)
          ? "URGENT — Callback needed"
          : "Callback needed — Top Dog";
      }

      newAlerts.forEach((alert) => seenIdsRef.current.add(alert.id));
    } catch {
      setError("Connection lost — retrying…");
    }
  }, [audioReady, token]);

  useEffect(() => {
    if (!token) return;

    void fetchAlerts();
    const pollId = window.setInterval(() => {
      void fetchAlerts();
    }, POLL_MS);

    return () => window.clearInterval(pollId);
  }, [fetchAlerts, token]);

  useEffect(() => {
    if (!audioReady || alerts.length === 0) {
      document.title = "Shop Display — Top Dog";
      return;
    }

    const repeatId = window.setInterval(() => {
      if (Date.now() - lastSoundRef.current >= REPEAT_SOUND_MS) {
        playAlertTone(alerts.some((alert) => alert.urgent));
        lastSoundRef.current = Date.now();
      }
    }, REPEAT_SOUND_MS);

    return () => window.clearInterval(repeatId);
  }, [alerts, audioReady]);

  async function handleAck(id: string) {
    if (!token) return;
    setAckLoading(id);

    try {
      const response = await fetch(`/api/shop/alerts/${id}/ack`, {
        method: "POST",
        headers: { "x-shop-token": token },
      });

      if (!response.ok) throw new Error("Ack failed");

      setAlerts((current) => current.filter((alert) => alert.id !== id));
      seenIdsRef.current.delete(id);
      document.title = "Shop Display — Top Dog";
    } finally {
      setAckLoading(null);
    }
  }

  async function handleTestAlert() {
    if (!token) return;

    await fetch("/api/shop/test-alert", {
      method: "POST",
      headers: { "x-shop-token": token },
    });
    await fetchAlerts();
  }

  function handleUnlockAudio() {
    playAlertTone(false);
    setAudioReady(true);
  }

  function handleConnect(event: FormEvent) {
    event.preventDefault();
    const next = tokenInput.trim();
    if (!next) return;
    sessionStorage.setItem("shop-display-token", next);
    initializedRef.current = false;
    seenIdsRef.current.clear();
    setToken(next);
    setError("");
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6">
        <form
          onSubmit={handleConnect}
          className="w-full max-w-md rounded-2xl border border-border bg-surface p-8"
        >
          <h1 className="font-display text-3xl font-bold uppercase text-foreground">
            Shop Display
          </h1>
          <p className="mt-3 text-muted">
            Enter your shop display token to connect this screen.
          </p>
          <input
            type="password"
            value={tokenInput}
            onChange={(event) => setTokenInput(event.target.value)}
            className="mt-6 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent/50"
            placeholder="Display token"
            autoFocus
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-accent py-3 font-bold text-black"
          >
            Connect
          </button>
        </form>
      </div>
    );
  }

  if (!audioReady) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center">
        <Volume2 className="h-16 w-16 text-accent" />
        <h1 className="mt-6 font-display text-4xl font-bold uppercase text-white">
          Enable Shop Alerts
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/70">
          Click once to allow sound alerts on this screen. Drag this tab to your
          shop TV or second monitor after enabling.
        </p>
        <button
          type="button"
          onClick={handleUnlockAudio}
          className="mt-8 rounded-xl bg-accent px-10 py-4 text-lg font-bold text-black"
        >
          Enable Sound Alerts
        </button>
      </div>
    );
  }

  const primary = alerts[0];
  const hasAlerts = alerts.length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-accent">
            Top Dog Shop Display
          </p>
          <p className="mt-1 text-white/60">Callback &amp; action alerts</p>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl font-bold tabular-nums">
            {formatClock(clock)}
          </p>
          <p className="text-sm text-white/50">{business.phone}</p>
        </div>
      </header>

      <main className="px-6 py-8">
        {error && (
          <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-300">
            {error}
          </p>
        )}

        {!hasAlerts ? (
          <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-8 text-center">
            <CheckCircle2 className="h-20 w-20 text-emerald-400" />
            <h2 className="mt-6 font-display text-5xl font-bold uppercase text-emerald-300">
              All Clear
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-white/70">
              No pending callbacks. New website requests will appear here with a
              sound alert.
            </p>
            <div className="mt-8 flex items-center gap-2 text-white/50">
              <Clock className="h-5 w-5" />
              <span>Checking every {POLL_MS / 1000} seconds</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div
              className={`rounded-3xl border-4 px-8 py-10 ${
                primary.urgent
                  ? "animate-pulse border-red-500 bg-red-500/15"
                  : "border-accent bg-accent/10"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wider ${
                      primary.urgent
                        ? "bg-red-500 text-white"
                        : "bg-accent text-black"
                    }`}
                  >
                    {primary.urgent ? (
                      <BellRing className="h-4 w-4" />
                    ) : (
                      <Bell className="h-4 w-4" />
                    )}
                    {primary.urgent ? "Urgent callback" : "Callback needed"}
                  </p>
                  <h2 className="mt-6 font-display text-6xl font-bold uppercase leading-none sm:text-7xl">
                    {primary.name}
                  </h2>
                  <a
                    href={`tel:+1${primary.phoneDigits}`}
                    className="mt-6 inline-flex items-center gap-4 font-display text-5xl font-bold text-accent sm:text-6xl"
                  >
                    <Phone className="h-12 w-12" />
                    {primary.phone}
                  </a>
                </div>
                <div className="text-right text-white/60">
                  <p className="text-sm uppercase tracking-wider">Received</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {formatTime(primary.createdAt)}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl bg-black/30 p-5">
                  <p className="text-sm uppercase tracking-wider text-white/50">
                    Best time to call
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{primary.preferredTime}</p>
                </div>
                <div className="rounded-2xl bg-black/30 p-5">
                  <p className="text-sm uppercase tracking-wider text-white/50">
                    Vehicle / issue
                  </p>
                  <p className="mt-2 text-2xl font-semibold leading-snug">
                    {primary.message}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => void handleAck(primary.id)}
                disabled={ackLoading === primary.id}
                className="mt-8 w-full rounded-2xl bg-white py-5 text-2xl font-bold text-black transition-transform hover:scale-[1.01] disabled:opacity-70"
              >
                {ackLoading === primary.id ? "Clearing…" : "Called Back — Clear Alert"}
              </button>
            </div>

            {alerts.length > 1 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-wider text-white/50">
                  Also waiting ({alerts.length - 1})
                </p>
                <ul className="mt-4 space-y-3">
                  {alerts.slice(1).map((alert) => (
                    <li
                      key={alert.id}
                      className="flex items-center justify-between rounded-xl bg-black/40 px-4 py-3"
                    >
                      <div>
                        <p className="text-lg font-semibold">
                          {alert.name} — {alert.phone}
                        </p>
                        <p className="text-sm text-white/60">
                          {alert.preferredTime} · {formatTime(alert.createdAt)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => void handleAck(alert.id)}
                        className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                      >
                        Clear
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="flex items-center justify-between border-t border-white/10 px-6 py-4 text-sm text-white/40">
        <span>Keep this tab open on your shop monitor.</span>
        <button
          type="button"
          onClick={() => void handleTestAlert()}
          className="rounded-lg border border-white/15 px-3 py-1.5 hover:bg-white/10"
        >
          Test alert
        </button>
      </footer>
    </div>
  );
}
