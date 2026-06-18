import { getReviews } from "@/lib/reviews-data";
import ReviewsDisplay from "@/components/ReviewsDisplay";

export default function ReviewsSection() {
  const data = getReviews();
  return <ReviewsDisplay data={data} />;
}
