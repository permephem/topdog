export const PLACE_QUERY =
  "Top Dog Auto & Diesel, 6855 Niehenke Ave, Billings, MT 59101";

export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUrl?: string;
};

export type ReviewsData = {
  placeName: string;
  address: string;
  rating: number | null;
  totalReviews: number;
  reviews: GoogleReview[];
  fetchedAt: string | null;
};

export const emptyReviewsData: ReviewsData = {
  placeName: "Top Dog Auto & Diesel",
  address: "6855 Niehenke Ave, Billings, MT 59101",
  rating: null,
  totalReviews: 0,
  reviews: [],
  fetchedAt: null,
};

type GoogleReviewRaw = {
  author_name?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
  profile_photo_url?: string;
};

type PlaceDetailsResult = {
  name?: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReviewRaw[];
};

export function mapGoogleReviews(
  details: PlaceDetailsResult,
): ReviewsData {
  return {
    placeName: details.name ?? emptyReviewsData.placeName,
    address: details.formatted_address ?? emptyReviewsData.address,
    rating: details.rating ?? null,
    totalReviews: details.user_ratings_total ?? 0,
    reviews: (details.reviews ?? []).map((review) => ({
      author: review.author_name ?? "Google User",
      rating: review.rating ?? 5,
      text: review.text ?? "",
      relativeTime: review.relative_time_description ?? "",
      profilePhotoUrl: review.profile_photo_url,
    })),
    fetchedAt: new Date().toISOString(),
  };
}

export async function fetchReviewsFromGoogle(
  apiKey: string,
): Promise<ReviewsData> {
  const findUrl = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
  );
  findUrl.searchParams.set("input", PLACE_QUERY);
  findUrl.searchParams.set("inputtype", "textquery");
  findUrl.searchParams.set("fields", "place_id");
  findUrl.searchParams.set("key", apiKey);

  const findRes = await fetch(findUrl.toString(), {
    next: { revalidate: 86400 },
  });
  const findData = (await findRes.json()) as {
    status: string;
    candidates?: { place_id: string }[];
    error_message?: string;
  };

  if (findData.status !== "OK" || !findData.candidates?.[0]?.place_id) {
    throw new Error(
      `Place lookup failed: ${findData.status} — ${findData.error_message ?? ""}`,
    );
  }

  const placeId = findData.candidates[0].place_id;

  const detailsUrl = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json",
  );
  detailsUrl.searchParams.set("place_id", placeId);
  detailsUrl.searchParams.set(
    "fields",
    "name,formatted_address,rating,user_ratings_total,reviews",
  );
  detailsUrl.searchParams.set("key", apiKey);

  const detailsRes = await fetch(detailsUrl.toString(), {
    next: { revalidate: 86400 },
  });
  const detailsData = (await detailsRes.json()) as {
    status: string;
    result?: PlaceDetailsResult;
    error_message?: string;
  };

  if (detailsData.status !== "OK" || !detailsData.result) {
    throw new Error(
      `Place details failed: ${detailsData.status} — ${detailsData.error_message ?? ""}`,
    );
  }

  return mapGoogleReviews(detailsData.result);
}
