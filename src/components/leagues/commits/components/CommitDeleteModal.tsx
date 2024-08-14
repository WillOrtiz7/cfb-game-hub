import { ModalDelete } from "@/components/shared/ModalDelete";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
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
      description={`Are you sure you want to delete ${commit.first_name} ${commit.last_name} from ${commit.team?.team_info.name_abbreviation}?`}
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
