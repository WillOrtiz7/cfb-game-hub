import { Button } from "@/components/ui/button";
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

  const { data, isLoading, isError, error } = useGetCurrentYearWeek();

  useEffect(() => {
    if (data) {
      setYear(data[0].year!);
      setWeek(data[0].week!);
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
      <ScheduleGameList week={week} year={year} />
      <ScheduleUpsertGameModal
        description={ADD_GAME_MODAL_STRINGS.description}
        requestType="POST"
        title={ADD_GAME_MODAL_STRINGS.title}
        triggerButton={
          <Button className="w-full md:w-fit items-center justify-center self-end">
            <span>Add a Game</span> <Plus className="h-4 w-4 ml-2" />
          </Button>
        }
        week={week}
        year={year}
      />
    </div>
  );
}
