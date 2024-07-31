import { Button } from "@/components/ui/button";
import { useGetLeagueId } from "@/hooks/useGetLeagueId";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetCurrentYearWeek } from "./api/queries/useGetCurrentYearWeek";
import { ScheduleGameList } from "./components/ScheduleGameList";
import { ScheduleHeader } from "./components/ScheduleHeader";
import { ScheduleUpsertGameModal } from "./components/ScheduleUpsertGameModal";
import { ScheduleWeekSelector } from "./components/ScheduleWeekSelector";
import { ADD_GAME_MODAL_STRINGS } from "./constants/content";

export function SchedulesMain() {
  const [year, setYear] = useState(2024);
  const [week, setWeek] = useState(0);

  useGetLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);

  const { data, isLoading, isError, error } = useGetCurrentYearWeek(leagueId);

  useEffect(() => {
    if (data) {
      setYear(data?.year || 2024);
      setWeek(data?.week || 0);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <ScheduleHeader week={week} year={year} />
        <ScheduleWeekSelector
          setWeek={setWeek}
          setYear={setYear}
          week={week}
          year={year}
        />
      </div>
      <div className="flex flex-col gap-4">
        <ScheduleGameList week={week} year={year} />
        <ScheduleUpsertGameModal
          description={ADD_GAME_MODAL_STRINGS.description}
          requestType="POST"
          title={ADD_GAME_MODAL_STRINGS.title}
          triggerButton={
            <Button className="items-center self-end justify-center w-full md:w-fit">
              <span>Add a Game</span> <Plus className="w-4 h-4 ml-2" />
            </Button>
          }
          week={week}
          year={year}
        />
      </div>
    </div>
  );
}
