"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { business } from "@/lib/business";

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={business.phoneHref}
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 border-t border-accent/30 bg-accent px-4 py-3.5 font-bold text-black shadow-[0_-8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-accent-dark lg:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-label={`Call ${business.name} at ${business.phone}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <Phone className="h-5 w-5" aria-hidden="true" />
      Call {business.phone}
    </a>
  );
}
