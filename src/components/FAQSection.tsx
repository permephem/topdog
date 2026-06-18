"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/customer-info";
import { business } from "@/lib/business";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-10 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Questions
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            FAQ
          </h2>
          <p className="mt-4 text-lg text-muted">
            Straight answers to the questions we hear most on the phone.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="overflow-hidden rounded-xl border border-border bg-surface"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-light"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-foreground">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-accent transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="border-t border-border px-5 py-4 leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-muted">
          Still have questions?{" "}
          <a
            href={business.phoneHref}
            className="font-semibold text-accent transition-colors hover:text-accent-dark"
          >
            Call {business.phone}
          </a>{" "}
          or use the callback form below.
        </p>
      </div>
    </section>
  );
}
