"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Fuel,
  Handshake,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { business, heroImage } from "@/lib/business";

const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "Diesel", label: "Engine Experts", icon: Fuel },
  { value: "Local", label: "Billings Owned", icon: MapPin },
  { value: "Honest", label: "Fair Pricing", icon: Handshake },
  { value: "Fast", label: "Turnaround", icon: Zap },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8 lg:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16 xl:gap-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
            >
              <Star className="h-4 w-4 fill-accent" />
              Billings&apos; Power Stroke &amp; Work-Truck Specialists
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Top Dog
              <span className="block text-accent">Auto & Diesel</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
            >
              {business.descriptionLines.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-bold text-black transition-all hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/25"
              >
                <Phone className="h-5 w-5" />
                Call {business.phone}
              </a>
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface/50 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-surface"
              >
                <MapPin className="h-5 w-5 text-accent" />
                Get Directions
              </a>
            </motion.div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:w-[280px] lg:grid-cols-1 xl:w-[320px]">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="relative rounded-xl border border-border/40 bg-surface/35 p-4 backdrop-blur-sm sm:p-5"
                >
                  <Icon
                    className="absolute right-3 top-3 h-5 w-5 text-accent/50 sm:right-4 sm:top-4 sm:h-6 sm:w-6"
                    aria-hidden="true"
                  />
                  <p className="font-display text-xl font-bold uppercase text-accent sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent sm:flex"
        aria-label="Scroll to services"
      >
        <span className="text-xs uppercase tracking-widest">Explore</span>
        <ArrowRight className="h-4 w-4 rotate-90" />
      </a>
    </section>
  );
}
