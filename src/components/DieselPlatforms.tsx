import { dieselPlatforms } from "@/lib/business";

export default function DieselPlatforms() {
  return (
    <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        Diesel Platforms We Service
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {dieselPlatforms.map((platform) => (
          <div
            key={platform.name}
            className="rounded-xl border border-border/60 bg-surface/80 p-5"
          >
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
              {platform.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {platform.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
