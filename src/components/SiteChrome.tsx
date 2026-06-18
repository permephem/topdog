"use client";

import { usePathname } from "next/navigation";
import AccentPreviewSwitcher from "@/components/AccentPreviewSwitcher";
import StickyCallBar from "@/components/StickyCallBar";

export default function SiteChrome() {
  const pathname = usePathname();

  if (pathname.startsWith("/shop")) {
    return null;
  }

  return (
    <>
      <StickyCallBar />
      <AccentPreviewSwitcher />
    </>
  );
}
