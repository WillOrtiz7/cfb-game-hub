import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { GetCommitsResponse } from "../api/queries/useGetCommits";
import { COMMIT_MODAL_EDIT_STRINGS } from "../constants/content";
import { CommitDeleteModal } from "./CommitDeleteModal";
import { CommitUpsertModal } from "./CommitUpsertModal";

interface CommitCardEditModeOptionsProps {
  commit: GetCommitsResponse;
}

export function CommitCardEditModeOptions({
  commit,
}: CommitCardEditModeOptionsProps) {
  return (
    <div className="flex flex-row">
      <CommitUpsertModal
        commit={commit}
        description={COMMIT_MODAL_EDIT_STRINGS.description}
        requestType="PUT"
        title={COMMIT_MODAL_EDIT_STRINGS.title}
        triggerButton={
          <Button variant={"ghost"} size={"icon"}>
            <Edit className="w-4 h-4" />
          </Button>
        }
        year={2024}
      />
      <CommitDeleteModal commit={commit} />
    </div>
  );
}
