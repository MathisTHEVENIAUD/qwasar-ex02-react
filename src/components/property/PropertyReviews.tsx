import type { Review } from "@/data/properties";
import ReviewSystem from "@/components/user/ReviewSystem";

type Props = { reviews: Review[]; rating: number; reviewCount: number };

export default function PropertyReviews({ reviews, rating, reviewCount }: Props) {
  return (
    <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        ★ {rating} · {reviewCount} avis
      </h2>
      <ReviewSystem reviews={reviews} />
    </div>
  );
}
