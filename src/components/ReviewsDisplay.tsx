"use client";

import { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Star,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { business } from "@/lib/business";
import type { GoogleReview, ReviewsData } from "@/lib/google-reviews";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const starClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starClass} ${
            star <= rating
              ? "fill-accent text-accent"
              : "fill-none text-border"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewAvatar({
  name,
  photoUrl,
}: {
  name: string;
  photoUrl?: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (photoUrl) {
    return (
      <Image
        src={photoUrl}
        alt={name}
        width={36}
        height={36}
        className="h-9 w-9 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
      {initials}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className="px-5 py-5 sm:px-8 sm:py-6">
      <div className="flex items-center gap-3">
        <ReviewAvatar
          name={review.author}
          photoUrl={review.profilePhotoUrl}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{review.author}</p>
          <div className="mt-0.5">
            <StarRating rating={review.rating} />
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        &ldquo;{review.text || "Left a star rating on Google."}&rdquo;
      </p>
    </article>
  );
}

function ReviewsCarousel({ reviews }: { reviews: GoogleReview[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const measureHeights = useCallback(() => {
    if (!measureRef.current) return;
    const cards = measureRef.current.querySelectorAll("[data-review-card]");
    let max = 0;
    cards.forEach((el) => {
      max = Math.max(max, (el as HTMLElement).offsetHeight);
    });
    if (max > 0) setCardHeight(max);
  }, []);

  useLayoutEffect(() => {
    measureHeights();
  }, [measureHeights, reviews]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => measureHeights());
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [measureHeights]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % reviews.length);
  }, [reviews.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (paused || reviews.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next, reviews.length]);

  return (
    <div
      ref={containerRef}
      className="relative bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={measureRef}
        className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10 opacity-0"
        aria-hidden="true"
      >
        {reviews.map((review, i) => (
          <div key={`measure-${review.author}-${i}`} data-review-card>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      <div
        className="relative overflow-hidden"
        style={{ height: cardHeight ?? "auto" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0"
          >
            <ReviewCard review={reviews[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {reviews.length > 1 && (
        <div className="flex items-center justify-between gap-3 border-t border-border/60 px-4 py-2.5">
          <button
            type="button"
            onClick={prev}
            className="shrink-0 rounded-full border border-border bg-background p-1.5 text-foreground transition-colors hover:border-accent/50 hover:bg-surface-light"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex flex-1 justify-center gap-1.5">
            {reviews.map((review, i) => (
              <button
                key={`${review.author}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-5 bg-accent"
                    : "w-1.5 bg-border hover:bg-muted"
                }`}
                aria-label={`Go to review ${i + 1} of ${reviews.length}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="shrink-0 rounded-full border border-border bg-background p-1.5 text-foreground transition-colors hover:border-accent/50 hover:bg-surface-light"
            aria-label="Next review"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

type ReviewsDisplayProps = {
  data: ReviewsData;
};

export default function ReviewsDisplay({ data }: ReviewsDisplayProps) {
  const hasReviews = data.reviews.length > 0;

  return (
    <section id="reviews" className="relative py-12 sm:py-14">
      <div className="absolute inset-0 bg-surface/50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Customer Feedback
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
            Google Reviews
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-xl border border-border bg-surface shadow-xl shadow-black/20"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-light px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <Image
                src={business.logo.sm}
                alt={`${business.name} logo`}
                width={40}
                height={40}
                className="shrink-0 rounded-lg"
              />
              <div className="min-w-0">
                <h3 className="truncate font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  {data.placeName}
                </h3>
                <p className="truncate text-xs text-muted">{data.address}</p>
              </div>
            </div>

            {data.rating !== null && (
              <div className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
                <p className="font-display text-xl font-bold text-accent">
                  {data.rating.toFixed(1)}
                </p>
                <StarRating rating={Math.round(data.rating)} size="sm" />
              </div>
            )}
          </div>

          {hasReviews ? (
            <ReviewsCarousel reviews={data.reviews} />
          ) : (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-muted">
                Customer reviews from our Google listing will appear here.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-border bg-surface-light px-4 py-3 sm:px-5">
            <p className="text-[11px] text-muted">
              Reviews from our Google Business Profile.
            </p>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-accent/50 hover:bg-background"
            >
              <Star className="h-3.5 w-3.5 text-accent" />
              Leave a Review
              <ExternalLink className="h-3 w-3 text-muted" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
