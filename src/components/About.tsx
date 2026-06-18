"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { business, aboutImage } from "@/lib/business";

const highlights = [
  "Locally owned and operated in Billings",
  "Diesel engine rebuilds and diagnostics",
  "All makes and models welcome",
  "Honest assessments — no unnecessary upsells",
  "Work trucks, pickups, and daily drivers",
  "Serving the Billings metro and beyond",
];

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={aboutImage}
                alt="Ford Super Duty diesel work truck in the Montana countryside near Billings"
                fill
                className="object-cover object-left brightness-[0.92] contrast-[1.12] saturate-[0.85]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-background/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-br from-background/45 via-transparent to-accent/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.35)_100%)]" />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-xl border border-border bg-surface p-6 shadow-2xl sm:-right-8">
              <p className="font-display text-3xl font-bold text-accent">6.0+</p>
              <p className="text-sm text-muted">Diesel Platforms</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              About Us
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
              Built for Montana Roads
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Top Dog Auto &amp; Diesel is your neighborhood diesel and auto
              repair shop in Billings. Whether you&apos;re
              hauling hay, commuting across town, or running a fleet — we treat
              every vehicle like it&apos;s our own.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              From Power Stroke 6.0 rebuilds to routine oil changes, our team
              brings the expertise and straight talk Montana drivers deserve.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
