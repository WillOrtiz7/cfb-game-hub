import { ModalForm } from "@/components/shared/ModalForm";
import { useState } from "react";
import { ScheduleItem } from "../api/queries/useGetSchedules";
import { ScheduleUpsertGameForm } from "./ScheduleUpsertGameForm";

interface ScheduleUpsertGameModalProps {
  description: string;
  requestType: "POST" | "PUT";
  scheduleItem?: ScheduleItem;
  title: string;
  triggerButton: React.ReactNode;
  week: number;
  year: number;
}

export function ScheduleUpsertGameModal({
  description,
  requestType,
  scheduleItem,
  title,
  triggerButton,
  week,
  year,
}: ScheduleUpsertGameModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <ModalForm
      description={description}
      form={
        <ScheduleUpsertGameForm
          closeModal={() => setOpen(false)}
          requestType={requestType}
          scheduleItem={scheduleItem}
          week={week}
          year={year}
        />
      }
      open={open}
      setOpen={setOpen}
      title={title}
      triggerButton={triggerButton}
    />
  );
}
