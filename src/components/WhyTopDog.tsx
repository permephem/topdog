"use client";

import { motion } from "framer-motion";
import { Cog, Handshake, Clock3, Truck } from "lucide-react";
import { whyTopDog } from "@/lib/business";
import type { LucideIcon } from "lucide-react";

const icons: LucideIcon[] = [Cog, Clock3, Handshake, Truck];

export default function WhyTopDog() {
  return (
    <section
      aria-label="Why choose Top Dog"
      className="border-y border-border bg-surface/80"
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyTopDog.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 px-4 py-4"
              >
                <div className="rounded-lg bg-accent/10 p-2">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
