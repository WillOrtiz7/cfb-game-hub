import {
  useInitializeLeagueId,
  useLeagueStore,
} from "@/zustand/useLeagueStore";
import { useGetSchedules } from "../api/queries/useGetSchedules";
import { ScheduleCard } from "./ScheduleCard";

interface ScheduleGameListProps {
  week: number;
  year: number;
}

export function ScheduleGameList({ week, year }: ScheduleGameListProps) {
  useInitializeLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);

  const {
    data: scheduleItemList,
    isLoading,
    isError,
    error,
  } = useGetSchedules(year, week, leagueId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    scheduleItemList && (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
