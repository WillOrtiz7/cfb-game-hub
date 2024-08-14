import { ModalDelete } from "@/components/shared/ModalDelete";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { TEAM_LOGOS_BASE_URL } from "../../schedules/constants/baseUrls";
import { useDeleteCommit } from "../api/mutations/useDeleteCommit";
import { GetCommitsResponse } from "../api/queries/useGetRecruits";

interface CommitDeleteModalProps {
  commit: GetCommitsResponse;
}

export function CommitDeleteModal({ commit }: CommitDeleteModalProps) {
  const { mutate, isPending } = useDeleteCommit();
  const [open, setOpen] = useState(false);
  return (
    <ModalDelete
      deleteAction={() => mutate(commit.id)}
      deletePending={isPending}
      description={
        <div className="flex flex-row items-center justify-center">
          Are you sure you want to delete {commit.first_name} {commit.last_name}{" "}
          from {commit.team?.team_info.name_abbreviation}{" "}
          <img
            src={TEAM_LOGOS_BASE_URL + commit.team?.team_info.logo_id + ".png"}
            alt="Away Team Logo"
            className="object-scale-down w-8 h-8 mx-1"
          />
          ?
        </div>
      }
      open={open}
      setOpen={setOpen}
      title="Delete Commit"
      triggerButton={
        <Button variant={"ghost"}>
          <Trash className="w-4 h-4" />
        </Button>
      }
    />
  );
}
