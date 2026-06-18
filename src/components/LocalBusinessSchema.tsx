import { business, serviceAreas } from "@/lib/business";
import { getSiteUrl } from "@/lib/site-url";

export default function LocalBusinessSchema() {
  const siteUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.name,
    description: business.description,
    url: siteUrl,
    telephone: business.phone,
    image: `${siteUrl}${business.logo}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: `${area}, MT`,
    })),
    sameAs: [business.social.facebook, business.social.instagram],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
