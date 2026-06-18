/**
 * Downloads photos from the Google Business Profile into public/images/gallery/.
 *
 * Usage:
 *   GOOGLE_MAPS_API_KEY=your_key npm run fetch-photos
 *
 * Enable "Places API" and "Places API (New)" in Google Cloud Console.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/images/gallery");
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const PLACE_QUERY = "Top Dog Auto & Diesel, 6855 Niehenke Ave, Billings, MT 59101";
const MAX_PHOTOS = 8;

async function findPlaceId() {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
  );
  url.searchParams.set("input", PLACE_QUERY);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id,name,photos");
  url.searchParams.set("key", API_KEY);

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "OK" || !data.candidates?.[0]) {
    throw new Error(
      `Place lookup failed: ${data.status} — ${data.error_message ?? "no candidates"}`,
    );
  }

  return data.candidates[0];
}

async function getPlaceDetails(placeId) {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json",
  );
  url.searchParams.set("place_id", placeId);
  url.searchParams.set(
    "fields",
    "name,photos,formatted_address,rating,user_ratings_total",
  );
  url.searchParams.set("key", API_KEY);

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "OK") {
    throw new Error(
      `Place details failed: ${data.status} — ${data.error_message ?? ""}`,
    );
  }

  return data.result;
}

async function downloadPhoto(photoRef, index) {
  const url = new URL("https://maps.googleapis.com/maps/api/place/photo");
  url.searchParams.set("maxwidth", "1200");
  url.searchParams.set("photo_reference", photoRef);
  url.searchParams.set("key", API_KEY);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Photo ${index} download failed: ${res.status}`);

  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = `google-${index + 1}.jpg`;
  await writeFile(path.join(OUT_DIR, filename), buffer);
  return filename;
}

async function main() {
  if (!API_KEY) {
    console.error(
      "Missing GOOGLE_MAPS_API_KEY. Get one at https://console.cloud.google.com/",
    );
    process.exit(1);
  }

  if (!existsSync(OUT_DIR)) {
    await mkdir(OUT_DIR, { recursive: true });
  }

  console.log("Looking up place…");
  const candidate = await findPlaceId();
  console.log(`Found: ${candidate.place_id}`);

  const details = await getPlaceDetails(candidate.place_id);
  const photos = details.photos ?? [];

  if (photos.length === 0) {
    console.warn("No photos found on this Google listing.");
    process.exit(0);
  }

  console.log(`Downloading ${Math.min(photos.length, MAX_PHOTOS)} photos…`);

  const manifest = [];
  for (let i = 0; i < Math.min(photos.length, MAX_PHOTOS); i++) {
    const filename = await downloadPhoto(photos[i].photo_reference, i);
    manifest.push({
      src: `/images/gallery/${filename}`,
      alt: `${details.name} — photo ${i + 1}`,
      caption: details.name,
    });
    console.log(`  ✓ ${filename}`);
  }

  await writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(
      {
        fetchedAt: new Date().toISOString(),
        place: details.name,
        address: details.formatted_address,
        rating: details.rating,
        totalReviews: details.user_ratings_total,
        images: manifest,
      },
      null,
      2,
    ),
  );

  console.log("\nDone! Photos saved to public/images/gallery/");
  console.log("Restart the dev server to see updated gallery images.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
