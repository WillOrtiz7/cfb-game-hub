import { Database } from "@/db/types";
import { Star } from "lucide-react";

interface CommitStarRatingProps {
  starRating: Database["public"]["Enums"]["commit_star_rating"];
}

export function CommitStarRating({ starRating }: CommitStarRatingProps) {
  const rating = Number(starRating);

  return (
    <div className="flex flex-row">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rating ? "currentColor" : "none"}
          stroke="currentColor"
        />
      ))}
    </div>
  );
}
