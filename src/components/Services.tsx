"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Shield,
  Cpu,
  Truck,
  Cog,
  Disc2,
} from "lucide-react";
import { services } from "@/lib/business";

const iconMap = {
  engine: Cog,
  wrench: Wrench,
  shield: Shield,
  disc: Disc2,
  cpu: Cpu,
  truck: Truck,
};

export default function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            What We Do
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-muted">
            Full-service diesel and automotive repair for Billings drivers,
            ranchers, and fleet owners.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl border border-border bg-surface p-8 transition-all hover:border-accent/40 hover:bg-surface-light hover:shadow-xl hover:shadow-black/20"
              >
                <div className="mb-5 inline-flex rounded-xl bg-accent/10 p-3 transition-colors group-hover:bg-accent/20">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
