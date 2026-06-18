"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Navigation } from "lucide-react";
import { business } from "@/lib/business";
import CallbackForm from "@/components/CallbackForm";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

function getCompactHoursRows() {
  const weekdays = business.hours.filter((row) =>
    WEEKDAYS.includes(row.day as (typeof WEEKDAYS)[number]),
  );
  const weekdayHours = weekdays[0]?.hours;
  const allWeekdaysMatch = weekdays.every((row) => row.hours === weekdayHours);

  const rows: { label: string; hours: string }[] = [];

  if (allWeekdaysMatch && weekdayHours) {
    rows.push({ label: "Mon – Fri", hours: weekdayHours });
  } else {
    weekdays.forEach((row) => rows.push({ label: row.day, hours: row.hours }));
  }

  const saturday = business.hours.find((row) => row.day === "Saturday");
  const sunday = business.hours.find((row) => row.day === "Sunday");
  if (saturday) rows.push({ label: "Saturday", hours: saturday.hours });
  if (sunday) rows.push({ label: "Sunday", hours: sunday.hours });

  return rows;
}

export default function Contact() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = business.hours.find((h) => h.day === today);
  const compactHours = getCompactHoursRows();

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
          <p className="mt-3 text-muted">
            {business.hoursMessage}{" "}
            Can&apos;t get through? Use the callback form — we&apos;ll get an
            instant alert and call you back.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex h-full flex-col gap-4"
          >
            <a
              href={business.phoneHref}
              className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/40 hover:bg-surface-light"
            >
              <div className="rounded-lg bg-accent/10 p-2.5 transition-colors group-hover:bg-accent/20">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wider text-muted">
                  Phone
                </p>
                <p className="text-lg font-bold text-foreground">
                  {business.phone}
                </p>
              </div>
              <p className="text-xs font-medium text-accent">Tap to call</p>
            </a>

            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-accent/10 p-2.5">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Hours
                  </p>
                  {todayHours && (
                    <p className="mt-1 text-sm font-medium text-accent">
                      Today ({today}): {todayHours.hours}
                    </p>
                  )}
                  <ul className="mt-2 space-y-1">
                    {compactHours.map((row) => (
                      <li
                        key={row.label}
                        className="flex justify-between text-sm text-muted"
                      >
                        <span>{row.label}</span>
                        <span>{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/40 hover:bg-surface-light"
            >
              <div className="rounded-lg bg-accent/10 p-2.5 transition-colors group-hover:bg-accent/20">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wider text-muted">
                  Address
                </p>
                <p className="font-semibold text-foreground">
                  {business.address.street}
                </p>
                <p className="text-sm text-foreground/80">
                  {business.address.city}, {business.address.state}{" "}
                  {business.address.zip}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-accent">
                  <Navigation className="h-3 w-3" />
                  Get directions
                </p>
              </div>
            </a>

            <div className="flex min-h-[200px] flex-1 flex-col overflow-hidden rounded-xl border border-border lg:min-h-0">
              <iframe
                title="Top Dog Auto & Diesel location on Google Maps"
                src={business.mapEmbedUrl}
                className="h-full w-full flex-1 grayscale-[30%] contrast-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full"
          >
            <CallbackForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
