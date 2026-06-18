"use client";

import { motion } from "framer-motion";
import { Phone, CheckCircle2 } from "lucide-react";
import { business, fleetHighlights } from "@/lib/business";

export default function FleetSection() {
  return (
    <section id="fleet" className="relative py-10 sm:py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Fleet &amp; Commercial
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
              Downtime Costs Money
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Contractors, ranchers, and fleet operators across Billings trust
              us when work trucks need to be back on the job — not sitting in a
              bay for weeks. Two rigs down? Call us first.
            </p>
            <a
              href={business.phoneHref}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-bold text-black transition-all hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/25"
            >
              <Phone className="h-5 w-5" />
              Call for Fleet Service
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 rounded-2xl border border-border bg-surface p-8"
          >
            {fleetHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
