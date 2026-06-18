import type { Metadata } from "next";
import ShopDisplay from "@/components/ShopDisplay";

export const metadata: Metadata = {
  title: "Shop Display — Top Dog Auto & Diesel",
  robots: { index: false, follow: false },
};

export default function ShopPage() {
  return <ShopDisplay />;
}
