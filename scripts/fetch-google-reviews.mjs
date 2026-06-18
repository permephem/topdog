/**
 * Fetches Google reviews and saves them to public/data/reviews.json
 *
 * Usage:
 *   GOOGLE_MAPS_API_KEY=your_key npm run fetch-reviews
 */

import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/data");
const OUT_FILE = path.join(OUT_DIR, "reviews.json");
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE_QUERY =
  "Top Dog Auto & Diesel, 6855 Niehenke Ave, Billings, MT 59101";

async function findPlaceId() {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
  );
  url.searchParams.set("input", PLACE_QUERY);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id");
  url.searchParams.set("key", API_KEY);

  const res = await fetch(url);
  const data = await res.json();

  if (data.status !== "OK" || !data.candidates?.[0]) {
    throw new Error(
      `Place lookup failed: ${data.status} — ${data.error_message ?? "no candidates"}`,
    );
  }

  return data.candidates[0].place_id;
}

async function getPlaceDetails(placeId) {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json",
  );
  url.searchParams.set("place_id", placeId);
  url.searchParams.set(
    "fields",
    "name,formatted_address,rating,user_ratings_total,reviews",
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
  const placeId = await findPlaceId();
  console.log(`Found: ${placeId}`);

  const details = await getPlaceDetails(placeId);
  const reviews = (details.reviews ?? []).map((review) => ({
    author: review.author_name ?? "Google User",
    rating: review.rating ?? 5,
    text: review.text ?? "",
    relativeTime: review.relative_time_description ?? "",
    profilePhotoUrl: review.profile_photo_url,
  }));

  const payload = {
    placeName: details.name,
    address: details.formatted_address,
    rating: details.rating ?? null,
    totalReviews: details.user_ratings_total ?? 0,
    reviews,
    fetchedAt: new Date().toISOString(),
  };

  await writeFile(OUT_FILE, JSON.stringify(payload, null, 2));

  console.log(`\nSaved ${reviews.length} reviews to public/data/reviews.json`);
  console.log(
    `Overall rating: ${details.rating ?? "N/A"} (${details.user_ratings_total ?? 0} total reviews)`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
