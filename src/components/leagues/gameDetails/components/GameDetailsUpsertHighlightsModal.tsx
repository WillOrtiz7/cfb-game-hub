import { ModalForm } from "@/components/shared/ModalForm";
import { useState } from "react";
import { GameDetailsUpsertHighlightForm } from "./GameDetailsUpsertHighlightsForm";

interface GameDetailsUpsertHighlightsModalProps {
  description: string;
  requestType: "POST" | "PUT";
  scheduleId: string;
  title: string;
  triggerButton: React.ReactNode;
}

export function GameDetailsUpsertHighlightsModal({
  description,
  requestType,
  scheduleId,
  title,
  triggerButton,
}: GameDetailsUpsertHighlightsModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <ModalForm
      description={description}
      form={
        <GameDetailsUpsertHighlightForm
          closeModal={() => setOpen(false)}
          requestType={requestType}
          scheduleId={scheduleId}
        />
      }
      open={open}
      setOpen={setOpen}
      title={title}
      triggerButton={triggerButton}
    />
  );
}
