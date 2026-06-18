"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, PhoneCall, CheckCircle2 } from "lucide-react";
import { business } from "@/lib/business";

type FormStatus = "idle" | "submitting" | "success" | "error";

const timeOptions = [
  "Anytime",
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 6 PM)",
];

const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export default function CallbackForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      if (isStaticPreview) {
        throw new Error(
          "Callback requests aren't sent from this preview site. Please call the shop directly.",
        );
      }

      const response = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          preferredTime: data.get("preferredTime"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-accent" />
        <h3 className="mt-4 font-display text-2xl font-bold uppercase text-foreground">
          Request Received
        </h3>
        <p className="mt-3 max-w-sm text-muted">
          Thanks — we&apos;ll call you back soon. Need help right away? Call{" "}
          <a href={business.phoneHref} className="font-semibold text-accent">
            {business.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-accent/10 p-3">
          <PhoneCall className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
            Request a Callback
          </h3>
          <p className="mt-1 text-sm text-muted">
            Leave your number and we&apos;ll call you back during shop hours.
            {isStaticPreview && (
              <span className="mt-1 block text-accent">
                Preview site — please call {business.phone} to reach the shop.
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="callback-name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="callback-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="callback-phone" className="text-sm font-medium text-foreground">
            Phone
          </label>
          <input
            id="callback-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            placeholder="(406) 555-1234"
          />
        </div>

        <div>
          <label
            htmlFor="callback-time"
            className="text-sm font-medium text-foreground"
          >
            Best time to call
          </label>
          <select
            id="callback-time"
            name="preferredTime"
            defaultValue="Anytime"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          >
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="callback-message"
            className="text-sm font-medium text-foreground"
          >
            Vehicle / issue{" "}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="callback-message"
            name="message"
            rows={3}
            className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            placeholder="e.g. 2015 F-250 Power Stroke — check engine light"
          />
        </div>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {errorMessage}{" "}
          <a href={business.phoneHref} className="font-semibold text-accent">
            Call {business.phone}
          </a>{" "}
          instead.
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        By submitting this form, you agree that we may use your information to
        respond to your callback request. See our{" "}
        <Link
          href="/privacy"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-bold text-black transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending…
          </>
        ) : (
          "Request Callback"
        )}
      </button>
    </form>
  );
}
