import { Database } from "@/db/types";
import { Star } from "lucide-react";

interface RecruitStarRatingProps {
  starRating: Database["public"]["Enums"]["recruit_star_ratings"];
}

export function RecruitStarRating({ starRating }: RecruitStarRatingProps) {
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
