"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Images } from "lucide-react";
import { business, type GalleryImage } from "@/lib/business";

type GalleryProps = {
  images: GalleryImage[];
};

export default function Gallery({ images }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Our Work
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
              Gallery
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Photos from the shop — diesel repairs, engine work, and the
              trucks we keep on the road. For the latest project photos and
              updates, follow us on{" "}
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-2 hover:underline"
              >
                Facebook
              </a>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={business.social.facebookPhotos}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/50 hover:bg-surface"
            >
              <Images className="h-4 w-4 text-accent" />
              Facebook Photos
              <ExternalLink className="h-3.5 w-3.5 text-muted" />
            </a>
            <a
              href={business.googlePhotosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/50 hover:bg-surface"
            >
              <Images className="h-4 w-4 text-accent" />
              Google Photos
              <ExternalLink className="h-3.5 w-3.5 text-muted" />
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, i) => (
            <motion.button
              key={image.src}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onClick={() => setSelected(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <p className="absolute bottom-4 left-4 text-sm font-semibold text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {image.caption}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-full bg-surface p-2 text-foreground transition-colors hover:bg-surface-light"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selected].src}
                alt={images[selected].alt}
                width={1200}
                height={900}
                className="h-auto w-full object-contain"
              />
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6 text-center text-lg font-medium">
                {images[selected].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
