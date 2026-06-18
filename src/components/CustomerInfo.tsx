"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  ClipboardCheck,
  Clock3,
  CreditCard,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { whatToExpect, trustDetails } from "@/lib/customer-info";
import type { LucideIcon } from "lucide-react";

const expectIcons: LucideIcon[] = [CalendarCheck, ClipboardCheck, Clock3];
const trustIcons: LucideIcon[] = [CreditCard, ShieldCheck, Truck];

export default function CustomerInfo() {
  return (
    <section id="good-to-know" className="relative py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Before You Visit
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Good to Know
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg lg:whitespace-nowrap">
            What to expect when you visit — walk-ins, estimates, and how we work with you.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
            What to Expect
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {whatToExpect.map((item, i) => {
              const Icon = expectIcons[i];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <div className="inline-flex rounded-xl bg-accent/10 p-3">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-3 leading-relaxed text-muted">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
            Trust &amp; Policies
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {trustDetails.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <div className="inline-flex rounded-xl bg-accent/10 p-3">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-3 leading-relaxed text-muted">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
