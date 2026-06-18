import { assetPath } from "./asset-path";

export const business = {
  name: "Top Dog Auto & Diesel",
  tagline: "Billings' Trusted Diesel & Auto Repair",
  descriptionLines: [
    "Locally owned diesel and automotive repair shop serving Billings and the surrounding Yellowstone County communities.",
    "From routine maintenance to full engine rebuilds — we keep your trucks and vehicles running strong.",
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
  googlePhotosUrl:
    "https://www.google.com/maps/place/Top+Dog+Auto+%26+Diesel/@45.7307592,-108.5902546,17z/data=!3m1!4b1!4m6!3m5!1s0x534863c997a6eadf:0xcbaf750166f92df0!8m2!3d45.7307555!4d-108.5876797!16s%2Fg%2F11lzd0fc39!5m1!1e1?entry=ttu",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61570588506807",
    facebookPhotos:
      "https://www.facebook.com/profile.php?id=61570588506807&sk=photos",
    instagram: "https://www.instagram.com/top_dog_auto_and_diesel_/",
  },
  logo: {
    full: assetPath("/images/logo.png"),
    md: assetPath("/images/logo-md.png"),
    sm: assetPath("/images/logo-sm.png"),
  },
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
    "Our operating hours are 9 AM to 6 PM, Monday through Friday, and 10 AM to 2 PM on Saturday. We're happy to assist you during this time.",
} as const;

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
  { label: "Good to Know", href: "#good-to-know" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];
