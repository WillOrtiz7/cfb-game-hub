import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useDeleteCommit } from "../api/mutations/useDeleteCommit";
import { GetCommitsResponse } from "../api/queries/useGetRecruits";
import { COMMIT_MODAL_STRINGS } from "../constants/content";
import { CommitUpsertModal } from "./CommitUpsertModal";

interface CommitCardEditModeOptionsProps {
  commit: GetCommitsResponse;
}

export function CommitCardEditModeOptions({
  commit,
}: CommitCardEditModeOptionsProps) {
  const { mutate, isPending } = useDeleteCommit();
  return (
    <div className="flex justify-end border-b-[1px] w-full">
      <CommitUpsertModal
        commit={commit}
        description={COMMIT_MODAL_STRINGS.description}
        requestType="PUT"
        title={COMMIT_MODAL_STRINGS.title}
        triggerButton={
          <Button variant={"ghost"} size={"icon"}>
            <Edit className="w-4 h-4" />
          </Button>
        }
        year={2024}
      />
      <Button
        variant={"ghost"}
        onClick={() => {
          mutate(commit.id);
        }}
        disabled={isPending}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}
