import { assetPath } from "./asset-path";

export const business = {
  name: "Top Dog Auto & Diesel",
  tagline: "Billings' Honest Power Stroke & Work-Truck Diesel Shop",
  descriptionLines: [
    "Locally owned diesel and auto repair shop in Billings, MT — Power Stroke, Cummins, and Duramax specialists for work trucks, fleets, and daily drivers.",
    "We give you a realistic completion estimate, keep you updated on progress, and never upsell what you don't need.",
  ],
  get description() {
    return this.descriptionLines.join(" ");
  },
  phone: "(406) 839-6260",
  phoneHref: "tel:+14068396260",
  address: {
    street: "6855 Niehenke Ave",
    city: "Billings",
    state: "MT",
    zip: "59101",
    full: "6855 Niehenke Ave, Billings, MT 59101",
  },
  coordinates: {
    lat: 45.7307555,
    lng: -108.5876797,
  },
  /** Centered between shop and downtown Billings at z=11 for context */
  mapEmbedUrl:
    "https://maps.google.com/maps?q=45.7307555,-108.5876797&ll=45.757,-108.546&z=12&output=embed",
  googleMapsUrl:
    "https://www.google.com/maps/place/Top+Dog+Auto+%26+Diesel/@45.7307592,-108.5902546,17z/data=!3m1!4b1!4m6!3m5!1s0x534863c997a6eadf:0xcbaf750166f92df0!8m2!3d45.7307555!4d-108.5876797!16s%2Fg%2F11lzd0fc39?entry=ttu",
  /** Opens Google Maps listing where customers can leave a review */
  googleReviewUrl:
    "https://www.google.com/maps/place/Top+Dog+Auto+%26+Diesel/@45.7307592,-108.5902546,17z/data=!3m1!4b1!4m6!3m5!1s0x534863c997a6eadf:0xcbaf750166f92df0!8m2!3d45.7307555!4d-108.5876797!16s%2Fg%2F11lzd0fc39?entry=ttu",
  googlePhotosUrl:
    "https://www.google.com/maps/place/Top+Dog+Auto+%26+Diesel/@45.7307592,-108.5902546,17z/data=!3m1!4b1!4m6!3m5!1s0x534863c997a6eadf:0xcbaf750166f92df0!8m2!3d45.7307555!4d-108.5876797!16s%2Fg%2F11lzd0fc39!5m1!1e1?entry=ttu",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61570588506807",
    facebookPhotos:
      "https://www.facebook.com/profile.php?id=61570588506807&sk=photos",
    instagram: "https://www.instagram.com/top_dog_auto_and_diesel_/",
  },
  logo: assetPath("/images/logo.png"),
  hours: [
    { day: "Monday", hours: "9:00 AM – 6:00 PM" },
    { day: "Tuesday", hours: "9:00 AM – 6:00 PM" },
    { day: "Wednesday", hours: "9:00 AM – 6:00 PM" },
    { day: "Thursday", hours: "9:00 AM – 6:00 PM" },
    { day: "Friday", hours: "9:00 AM – 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 2:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  hoursMessage:
    "Open Monday–Friday, 9 AM–6 PM, and Saturday, 10 AM–2 PM. Walk-ins welcome — call ahead for major diesel work or fleet scheduling.",
} as const;

export const serviceAreas = [
  "Billings",
  "Laurel",
  "Lockwood",
  "Shepherd",
  "Huntley",
  "Worden",
  "Park City",
  "Columbus",
  "Red Lodge",
  "Yellowstone County",
] as const;

export const dieselPlatforms = [
  {
    name: "Power Stroke",
    detail:
      "6.0, 6.4, and 6.7 — injectors, turbos, head work, oil cooler leaks, and full rebuilds.",
  },
  {
    name: "Cummins",
    detail:
      "Ram HD diagnostics, fuel system, emissions, and hard-start or power-loss issues.",
  },
  {
    name: "Duramax",
    detail:
      "GM diesel trucks — CP4 and injector failures, turbos, DEF, and routine service.",
  },
] as const;

export const whyTopDog = [
  {
    title: "Power Stroke Specialists",
    description: "6.0, 6.4, and 6.7 diagnostics and rebuilds done in-house.",
  },
  {
    title: "Progress Updates",
    description: "Completion estimates up front — and we tell you if the timeline changes.",
  },
  {
    title: "No Unnecessary Upsells",
    description: "We fix what's broken — and tell you when something can wait.",
  },
  {
    title: "Fleet & Work Trucks",
    description: "Priority scheduling and timeline updates when multiple rigs are down.",
  },
] as const;

export const fleetHighlights = [
  "Multiple trucks down? We've handled urgent fleet situations before.",
  "Completion estimates and progress updates so you can plan around downtime.",
  "Written estimates before major work — no surprise invoices.",
  "Fleet and commercial billing available — ask about account options.",
] as const;

export const services = [
  {
    title: "Diesel Engine Repair",
    description:
      "Expert diagnostics and repair for Power Stroke, Cummins, Duramax, and all diesel platforms — from 6.0 rebuilds to injector service.",
    icon: "engine" as const,
  },
  {
    title: "General Auto Repair",
    description:
      "Full-service automotive maintenance and repair for cars, trucks, and SUVs. Honest work, fair pricing.",
    icon: "wrench" as const,
  },
  {
    title: "Preventative Maintenance",
    description:
      "Oil changes, fluid flushes, filter replacements, and scheduled service to keep your vehicle on the road longer.",
    icon: "shield" as const,
  },
  {
    title: "Brake & Suspension",
    description:
      "Complete brake system service, rotors, pads, and suspension work for safe handling on Montana roads.",
    icon: "disc" as const,
  },
  {
    title: "Diagnostics & Electrical",
    description:
      "Advanced computer diagnostics to pinpoint issues fast — saving you time and money on unnecessary repairs.",
    icon: "cpu" as const,
  },
  {
    title: "Fleet & Work Trucks",
    description:
      "Reliable service for work trucks and fleet vehicles. We understand downtime costs money.",
    icon: "truck" as const,
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export const galleryPhotos: GalleryImage[] = [
  {
    src: assetPath("/images/powerstroke.jpg"),
    alt: "Power Stroke V8 turbo diesel engine bay at Top Dog Auto & Diesel",
    caption: "Power Stroke diesel service",
  },
  {
    src: assetPath("/images/hero.png"),
    alt: "Mechanic working on a truck in the Top Dog Auto & Diesel shop bay",
    caption: "In the shop bay",
  },
  {
    src: assetPath("/images/haul.png"),
    alt: "Ford Super Duty diesel work truck in the Montana countryside",
    caption: "Built for Montana work",
  },
];

export const heroImage = assetPath("/images/hero.png");
export const aboutImage = assetPath("/images/haul.png");
export const ctaImage = assetPath("/images/powerstroke.jpg");

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Fleet", href: "#fleet" },
  { label: "Good to Know", href: "#good-to-know" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];
