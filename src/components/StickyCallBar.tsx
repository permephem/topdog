import { Phone } from "lucide-react";
import { business } from "@/lib/business";

export default function StickyCallBar() {
  return (
    <a
      href={business.phoneHref}
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 border-t border-accent/30 bg-accent px-4 py-3.5 font-bold text-black shadow-[0_-8px_30px_rgba(0,0,0,0.35)] transition-colors hover:bg-accent-dark lg:hidden"
      aria-label={`Call ${business.name} at ${business.phone}`}
    >
      <Phone className="h-5 w-5" aria-hidden="true" />
      Call {business.phone}
    </a>
  );
}
