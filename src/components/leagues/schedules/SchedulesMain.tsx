import { EditModeButton } from "@/components/shared/EditModeButton";
import { Button } from "@/components/ui/button";
import {
  useInitializeLeagueId,
  useLeagueStore,
} from "@/zustand/useLeagueStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetCurrentYearWeek } from "./api/queries/useGetCurrentYearWeek";
import { ScheduleGameList } from "./components/ScheduleGameList";
import { ScheduleHeader } from "./components/ScheduleHeader";
import { ScheduleUpdateWeekModal } from "./components/ScheduleUpdateWeekModal";
import { ScheduleUpsertGameModal } from "./components/ScheduleUpsertGameModal";
import { ScheduleWeekSelector } from "./components/ScheduleWeekSelector";
import { ADD_GAME_MODAL_STRINGS } from "./constants/content";
import { schedulesStore } from "./store/schedulesStore";

export function SchedulesMain() {
  const [year, setYear] = useState(2024);
  const [week, setWeek] = useState(0);
  const isEditMode = schedulesStore((state) => state.isEditMode);
  const setIsEditMode = schedulesStore((state) => state.setIsEditMode);

  useInitializeLeagueId();
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
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <ScheduleHeader week={week} year={year} />
          <div className="flex flex-row gap-2">
            <ScheduleUpsertGameModal
              description={ADD_GAME_MODAL_STRINGS.description}
              requestType="POST"
              title={ADD_GAME_MODAL_STRINGS.title}
              triggerButton={
                <Button className=" w-min md:w-fit" variant={"outline"}>
                  <Plus className="w-4 h-4" />
                </Button>
              }
              week={week}
              year={year}
            />
            <EditModeButton
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <ScheduleUpdateWeekModal />
            <ScheduleWeekSelector
              setWeek={setWeek}
              setYear={setYear}
              week={week}
              year={year}
            />
          </div>
        </div>
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
