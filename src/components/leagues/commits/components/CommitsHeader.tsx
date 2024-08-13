import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { COMMIT_MODAL_STRINGS } from "../constants/content";
import { CommitUpsertModal } from "./CommitUpsertModal";

export function CommitsHeader() {
  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-2xl font-semibold">Commits</h1>
      <div className="flex flex-row gap-2">
        <CommitUpsertModal
          description={COMMIT_MODAL_STRINGS.description}
          requestType="POST"
          title={COMMIT_MODAL_STRINGS.title}
          triggerButton={
            <Button
              className="items-center self-end justify-center w-min md:w-fit"
              variant={"outline"}
            >
              <span>Add a Commit</span> <Plus className="w-4 h-4 ml-2" />
            </Button>
          }
          year={2024}
        />
        <Button
          className="items-center self-end justify-center w-min md:w-fit"
          variant={"outline"}
        >
          <span>Edit</span> <Edit className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
