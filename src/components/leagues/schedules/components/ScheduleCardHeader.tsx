import { ScheduleItem } from "../api/queries/useGetSchedules";
import { ScheduleDeleteModal } from "./ScheduleDeleteModal";
import { ScheduleEditGameModal } from "./ScheduleEditGameModal";

interface ScheduleCardHeaderProps {
  scheduleItem: ScheduleItem;
}

export function ScheduleCardHeader({ scheduleItem }: ScheduleCardHeaderProps) {
  return (
    <div className="flex flex-row gap-1 items-center justify-end w-full rounded-t-md">
      <ScheduleEditGameModal scheduleItem={scheduleItem} week={2} year={2024} />
      <ScheduleDeleteModal scheduleItem={scheduleItem} />
    </div>
  );
}
