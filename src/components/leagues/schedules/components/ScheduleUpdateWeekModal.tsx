import { ModalForm } from "@/components/shared/ModalForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScheduleUpdateWeekForm } from "./ScheduleUpdateWeekForm";

export function ScheduleUpdateWeekModal() {
  const [open, setOpen] = useState(false);
  return (
    <ModalForm
      description="Enter the current week/year of your league."
      form={<ScheduleUpdateWeekForm closeModal={() => setOpen(false)} />}
      open={open}
      setOpen={setOpen}
      title="Update Week"
      triggerButton={<Button variant={"outline"}>Update Week</Button>}
    />
  );
}
