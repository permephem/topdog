import { Phone } from "lucide-react";
import { business, ctaImage } from "@/lib/business";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-12">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('${ctaImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-background to-background" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Ready to Get Back on the Road?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          Call today to schedule service or stop by our shop on Niehenke Ave.
          No nonsense — just quality diesel and auto repair.
        </p>
        <a
          href={business.phoneHref}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-10 py-4 text-lg font-bold text-black transition-all hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/25"
        >
          <Phone className="h-5 w-5" />
          Call {business.phone}
        </a>
      </div>
    </section>
  );
}
