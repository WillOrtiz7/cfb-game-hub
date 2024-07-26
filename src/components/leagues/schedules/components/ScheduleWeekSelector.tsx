import { Button } from "@/components/ui/button";

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
      <Button onClick={() => setWeek(week - 1)}>Previous</Button>
      <Button onClick={() => setWeek(week + 1)}>Next</Button>
    </div>
  );
}
