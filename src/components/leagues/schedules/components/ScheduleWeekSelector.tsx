import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScheduleWeekSelectorProps {
  setWeek: (week: number) => void;
  setYear: (year: number) => void;
  week: number;
  year: number;
}
export function ScheduleWeekSelector({
  setWeek,

  week,
}: ScheduleWeekSelectorProps) {
  return (
    <div className="flex flex-row gap-2">
      <Button onClick={() => setWeek(week - 1)} variant={"outline"}>
        <ChevronLeft />
      </Button>
      <Button onClick={() => setWeek(week + 1)} variant={"outline"}>
        <ChevronRight />
      </Button>
    </div>
  );
}
