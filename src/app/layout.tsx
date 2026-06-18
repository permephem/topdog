import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/business";
import { assetPath } from "@/lib/asset-path";
import SiteChrome from "@/components/SiteChrome";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { getSiteUrl } from "@/lib/site-url";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${business.name} | Power Stroke & Diesel Repair in Billings, MT`,
  description: business.description,
  keywords: [
    "diesel repair Billings MT",
    "Power Stroke repair Billings",
    "6.0 Power Stroke Billings",
    "Cummins repair Billings Montana",
    "Duramax repair Billings",
    "fleet diesel repair Billings",
    "work truck repair Billings MT",
    "auto repair Billings Montana",
    "Top Dog Auto Diesel",
    "truck repair Billings",
    "diesel mechanic Billings MT",
    "Yellowstone County diesel repair",
  ],
  icons: {
    icon: assetPath("/favicon.png"),
    apple: business.logo,
  },
  openGraph: {
    title: business.name,
    description: business.tagline,
    type: "website",
    locale: "en_US",
    url: siteUrl,
    images: [{ url: business.logo, width: 1250, height: 1024 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background pb-14 font-sans text-foreground antialiased lg:pb-0">
        <Script id="accent-preview-init" strategy="beforeInteractive">
          {`try{var a=localStorage.getItem("topdog-accent-preview");if(a==="purple")document.documentElement.setAttribute("data-accent","purple")}catch(e){}`}
        </Script>
        <LocalBusinessSchema />
        {children}
        <SiteChrome />
      </body>
    </html>
  );
}
