"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Navigation } from "lucide-react";
import { business } from "@/lib/business";
import CallbackForm from "@/components/CallbackForm";

export default function Contact() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = business.hours.find((h) => h.day === today);

  return (
    <section id="contact" className="py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Get In Touch
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Visit the Shop
          </h2>
          <p className="mt-4 text-lg text-muted">
            {business.hoursMessage} Can&apos;t get through on the phone? Use the
            callback form — we get an instant alert and will call you back.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <a
              href={business.phoneHref}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:bg-surface-light"
            >
              <div className="rounded-xl bg-accent/10 p-3 transition-colors group-hover:bg-accent/20">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-muted">
                  Phone
                </p>
                <p className="mt-1 text-xl font-bold text-foreground">
                  {business.phone}
                </p>
                <p className="mt-1 text-sm text-accent">Tap to call</p>
              </div>
            </a>

            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40 hover:bg-surface-light"
            >
              <div className="rounded-xl bg-accent/10 p-3 transition-colors group-hover:bg-accent/20">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-muted">
                  Address
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {business.address.street}
                </p>
                <p className="text-foreground/80">
                  {business.address.city}, {business.address.state}{" "}
                  {business.address.zip}
                </p>
                <p className="mt-2 flex items-center gap-1 text-sm text-accent">
                  <Navigation className="h-3.5 w-3.5" />
                  Get directions
                </p>
              </div>
            </a>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-accent/10 p-3">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm uppercase tracking-wider text-muted">
                    Hours
                  </p>
                  {todayHours && (
                    <p className="mt-1 text-sm font-medium text-accent">
                      Today ({today}): {todayHours.hours}
                    </p>
                  )}
                  <ul className="mt-4 space-y-2">
                    {business.hours.map((row) => (
                      <li
                        key={row.day}
                        className={`flex justify-between text-sm ${
                          row.day === today
                            ? "font-semibold text-foreground"
                            : "text-muted"
                        }`}
                      >
                        <span>{row.day}</span>
                        <span>{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CallbackForm />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 overflow-hidden rounded-2xl border border-border"
        >
          <iframe
            title="Top Dog Auto & Diesel location on Google Maps"
            src={business.mapEmbedUrl}
            className="h-[400px] w-full grayscale-[30%] contrast-[1.1] sm:h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
