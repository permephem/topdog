"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  ClipboardCheck,
  Clock3,
  CreditCard,
  ShieldCheck,
  Truck,
  ShieldOff,
  Receipt,
  Cog,
  MessageSquare,
} from "lucide-react";
import {
  whatToExpect,
  trustDetails,
  whatWeWontDo,
  progressCommitment,
} from "@/lib/customer-info";
import type { LucideIcon } from "lucide-react";

const expectIcons: LucideIcon[] = [Clock3, MessageSquare, ClipboardCheck];
const trustIcons: LucideIcon[] = [CreditCard, ShieldCheck, Truck];
const wontIcons: LucideIcon[] = [ShieldOff, Receipt, Cog];

export default function CustomerInfo() {
  return (
    <section id="good-to-know" className="relative py-10 sm:py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Before You Visit
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Good to Know
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Completion estimates, progress updates, and no surprises on major
            work.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-8 max-w-3xl rounded-2xl border border-accent/25 bg-accent/5 p-6 sm:p-8"
        >
          <p className="text-center font-display text-xl font-bold uppercase tracking-wide text-foreground">
            While Your Truck Is Here
          </p>
          <ul className="mt-5 space-y-3">
            {progressCommitment.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-foreground/90"
              >
                <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
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

        <div className="mt-5 grid gap-5 md:grid-cols-3">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-10 rounded-2xl border border-accent/25 bg-accent/5 p-6 sm:p-8"
        >
          <p className="text-center font-display text-xl font-bold uppercase tracking-wide text-foreground sm:text-2xl">
            Our Promise
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted">
            What sets us apart from dealerships and shops that pad the invoice.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {whatWeWontDo.map((item, i) => {
              const Icon = wontIcons[i];
              return (
                <div key={item.title} className="rounded-xl bg-surface/80 p-5">
                  <div className="inline-flex rounded-xl bg-accent/10 p-2.5">
                    <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <h4 className="mt-3 font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
