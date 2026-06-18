import Image from "next/image";
import { business } from "@/lib/business";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
};

const sizes = {
  sm: { width: 125, height: 102, src: business.logo.full, text: "hidden" },
  md: { width: 56, height: 56, src: business.logo.md, text: "block" },
  lg: { width: 80, height: 80, src: business.logo.md, text: "block" },
};

export default function Logo({
  size = "sm",
  showText = true,
  className = "",
}: LogoProps) {
  const config = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src={config.src}
        alt={`${business.name} logo`}
        width={config.width}
        height={config.height}
        className={`h-auto w-auto shrink-0 transition-transform group-hover:scale-105 ${
          size === "sm" ? "h-10 w-auto sm:h-11" : ""
        }`}
        priority={size === "sm"}
      />
      {showText && (
        <div className={config.text}>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
            Top Dog
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
            Auto & Diesel
          </p>
        </div>
      )}
    </div>
  );
}
