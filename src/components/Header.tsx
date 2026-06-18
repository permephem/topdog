"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { business, navLinks } from "@/lib/business";
import Logo from "@/components/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="group">
          <Logo size="sm" showText={false} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={business.phoneHref}
          className="hidden items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 lg:flex"
        >
          <Phone className="h-4 w-4" />
          {business.phone}
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-surface-light lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium uppercase tracking-wider text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href={business.phoneHref}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-black"
            >
              <Phone className="h-4 w-4" />
              Call {business.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
