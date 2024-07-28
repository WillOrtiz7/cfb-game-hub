import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ScheduleItem } from "../api/queries/useGetSchedules";
import { EDIT_GAME_MODAL_STRINGS } from "../constants/content";
import { ScheduleDeleteModal } from "./ScheduleDeleteModal";
import { ScheduleUpsertGameModal } from "./ScheduleUpsertGameModal";

interface ScheduleCardHeaderProps {
  scheduleItem: ScheduleItem;
}

export function ScheduleCardHeader({ scheduleItem }: ScheduleCardHeaderProps) {
  return (
    <div className="flex flex-row gap-1 items-center justify-end w-full rounded-t-md">
      <ScheduleUpsertGameModal
        description={EDIT_GAME_MODAL_STRINGS.description}
        scheduleItem={scheduleItem}
        title={EDIT_GAME_MODAL_STRINGS.title}
        triggerButton={
          <Button variant={"ghost"} size={"icon"}>
            <Edit className="h-4 w-4" />
          </Button>
        }
        week={2}
        year={2024}
      />
      <ScheduleDeleteModal scheduleItem={scheduleItem} />
    </div>
  );
}
