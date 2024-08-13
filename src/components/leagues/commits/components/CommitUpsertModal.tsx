import { ModalForm } from "@/components/shared/ModalForm";
import { useState } from "react";
import { CommitUpsertForm } from "./CommitUpsertForm";

interface CommitUpsertModalProps {
  description: string;
  requestType: "POST" | "PUT";
  title: string;
  triggerButton: React.ReactNode;
  year: number;
}

export function CommitUpsertModal({
  description,
  requestType,
  title,
  triggerButton,
  year,
}: CommitUpsertModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <ModalForm
      description={description}
      form={
        <CommitUpsertForm
          closeModal={() => setOpen(false)}
          requestType={requestType}
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
