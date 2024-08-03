import { ModalForm } from "@/components/shared/ModalForm";
import { useState } from "react";
import { StandingsUpdateForm } from "./StandingsUpdateForm";

interface StandingsUpdateModalProps {
  description: string;
  title: string;
  triggerButton: React.ReactNode;
}

export function StandingsUpdateModal({
  description,
  title,
  triggerButton,
}: StandingsUpdateModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <ModalForm
      description={description}
      form={
        <StandingsUpdateForm
          closeModal={() => setOpen(false)}
          lossesConf={0}
          lossesOverall={0}
          tiesConf={0}
          tiesOverall={0}
          winsConf={0}
          winsOverall={0}
        />
      }
      open={open}
      setOpen={setOpen}
      title={title}
      triggerButton={triggerButton}
    />
  );
}
