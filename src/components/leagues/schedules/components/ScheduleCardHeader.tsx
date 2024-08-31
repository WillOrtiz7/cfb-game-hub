import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { GetSchedulesResponse } from "../api/queries/useGetSchedules";
import { EDIT_GAME_MODAL_STRINGS } from "../constants/content";
import { ScheduleDeleteModal } from "./ScheduleDeleteModal";
import { ScheduleUpsertGameModal } from "./ScheduleUpsertGameModal";

interface ScheduleCardHeaderProps {
  scheduleItem: GetSchedulesResponse[number];
  week: number;
  year: number;
}

export function ScheduleCardHeader({
  scheduleItem,
  week,
  year,
}: ScheduleCardHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-end w-full gap-1 rounded-t-md">
      <ScheduleUpsertGameModal
        description={EDIT_GAME_MODAL_STRINGS.description}
        requestType="PUT"
        scheduleItem={scheduleItem}
        title={EDIT_GAME_MODAL_STRINGS.title}
        triggerButton={
          <Button variant={"ghost"} size={"icon"}>
            <Edit className="w-4 h-4" />
          </Button>
        }
        week={week}
        year={year}
      />
      <ScheduleDeleteModal scheduleItem={scheduleItem} />
    </div>
  );
}
