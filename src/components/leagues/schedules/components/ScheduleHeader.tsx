interface ScheduleHeaderProps {
  week: number;
  year: number;
}

export function ScheduleHeader({ week, year }: ScheduleHeaderProps) {
  return (
    <div>
      <h1 className="font-semibold text-2xl">Schedule</h1>
      <h2>
        {year} Week {week}
      </h2>
    </div>
  );
}
