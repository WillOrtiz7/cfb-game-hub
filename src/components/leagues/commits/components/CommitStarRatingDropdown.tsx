import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/db/types";
import {} from "@radix-ui/react-select";
import { Star } from "lucide-react";

interface CommitPositionsDropdownProps {
  setValue?: (value: Database["public"]["Enums"]["commit_star_rating"]) => void;
  onValueChange?: (value: string) => void;
  triggerWidth?: number;
  value: Database["public"]["Enums"]["commit_star_rating"] | undefined;
}

export function CommitStarRatingDropdown({
  setValue,
  onValueChange,
  triggerWidth,
  value,
}: CommitPositionsDropdownProps) {
  function renderStars(rating: number) {
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

  const handleValueChange = (value: string) => {
    if (onValueChange) {
      onValueChange(value);
    } else if (setValue) {
      setValue(value as Database["public"]["Enums"]["commit_star_rating"]);
    }
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={value}>
      <SelectTrigger style={{ width: triggerWidth }}>
        <SelectValue placeholder="Select a star rating" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="1">{renderStars(1)}</SelectItem>
        <SelectItem value="2">{renderStars(2)}</SelectItem>
        <SelectItem value="3">{renderStars(3)}</SelectItem>
        <SelectItem value="4">{renderStars(4)}</SelectItem>
        <SelectItem value="5">{renderStars(5)}</SelectItem>
      </SelectContent>
    </Select>
  );
}
