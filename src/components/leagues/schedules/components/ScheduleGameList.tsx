import { useGetSchedules } from "../api/queries/useGetSchedules";
import { ScheduleCard } from "./ScheduleCard";

interface ScheduleGameListProps {
  week: number;
  year: number;
}

export function ScheduleGameList({ week, year }: ScheduleGameListProps) {
  const {
    data: scheduleItemList,
    isLoading,
    isError,
    error,
  } = useGetSchedules("7b3af6f8-9168-4040-bc92-c45943451e92", year, week);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    scheduleItemList && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scheduleItemList.map((scheduleItem, index) => (
          <ScheduleCard
            key={index}
            scheduleItem={scheduleItem}
            week={week}
            year={year}
          />
        ))}
      </div>
    )
  );
}
