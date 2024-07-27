import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ScheduleItem } from "../api/queries/useGetSchedules";
import { ScheduleDeleteModal } from "./ScheduleDeleteModal";

interface ScheduleCardHeaderProps {
  scheduleItem: ScheduleItem;
}

export function ScheduleCardHeader({ scheduleItem }: ScheduleCardHeaderProps) {
  return (
    <div className="flex flex-row gap-1 items-center justify-end w-full rounded-t-md">
      <Button variant={"ghost"} size={"icon"}>
        <Edit className="h-4 w-4" />
      </Button>
      <ScheduleDeleteModal scheduleItem={scheduleItem} />
    </div>
  );
}
