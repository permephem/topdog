import Image from "next/image";
import { business } from "@/lib/business";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-10 w-auto sm:h-11",
  md: "h-16 w-auto",
  lg: "h-20 w-auto",
};

export default function Logo({ size = "sm", className = "" }: LogoProps) {
  return (
    <div className={className}>
      <Image
        src={business.logo}
        alt={`${business.name} logo`}
        width={1250}
        height={1024}
        className={`shrink-0 transition-transform group-hover:scale-105 ${sizes[size]}`}
        priority={size === "sm"}
      />
    </div>
  );
}
