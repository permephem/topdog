import { staticReviews } from "./reviews-static";
import type { ReviewsData } from "./google-reviews";

export function getReviews(): ReviewsData {
  return staticReviews;
}
