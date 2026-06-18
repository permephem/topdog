"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "topdog-accent-preview";
type AccentTheme = "amber" | "purple";

function applyAccent(theme: AccentTheme) {
  if (theme === "purple") {
    document.documentElement.setAttribute("data-accent", "purple");
  } else {
    document.documentElement.removeAttribute("data-accent");
  }
}

export default function AccentPreviewSwitcher() {
  const [accent, setAccent] = useState<AccentTheme>("amber");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const theme: AccentTheme = stored === "purple" ? "purple" : "amber";
    setAccent(theme);
    applyAccent(theme);
    setMounted(true);
  }, []);

  function selectTheme(theme: AccentTheme) {
    setAccent(theme);
    applyAccent(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-20 right-4 z-[200] rounded-xl border border-border bg-surface/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-sm lg:bottom-4"
      aria-label="Accent color preview"
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
        Accent preview
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => selectTheme("amber")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            accent === "amber"
              ? "bg-[#f59e0b] text-black ring-2 ring-[#f59e0b] ring-offset-2 ring-offset-surface"
              : "border border-border text-muted hover:text-foreground"
          }`}
        >
          Amber
        </button>
        <button
          type="button"
          onClick={() => selectTheme("purple")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            accent === "purple"
              ? "bg-[#a855f7] text-white ring-2 ring-[#a855f7] ring-offset-2 ring-offset-surface"
              : "border border-border text-muted hover:text-foreground"
          }`}
        >
          Purple
        </button>
      </div>
    </div>
  );
}
