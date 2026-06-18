import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/business";
import AccentPreviewSwitcher from "@/components/AccentPreviewSwitcher";
import StickyCallBar from "@/components/StickyCallBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${business.name} | Diesel & Auto Repair in Billings, MT`,
  description: business.description,
  keywords: [
    "diesel repair Billings MT",
    "auto repair Billings Montana",
    "Top Dog Auto Diesel",
    "Power Stroke repair",
    "truck repair Billings",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/images/logo-sm.png",
  },
  openGraph: {
    title: business.name,
    description: business.tagline,
    type: "website",
    locale: "en_US",
    images: [{ url: business.logo.md, width: 512, height: 512 }],
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
        {children}
        <StickyCallBar />
        <AccentPreviewSwitcher />
      </body>
    </html>
  );
}
