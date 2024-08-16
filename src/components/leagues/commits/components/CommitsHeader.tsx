import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { COMMIT_MODAL_ADD_STRINGS } from "../constants/content";
import { useCommitStore } from "../store/useCommitStore";
import { CommitFilter } from "./CommitFilter";
import { CommitUpsertModal } from "./CommitUpsertModal";

export function CommitsHeader() {
  const isEditMode = useCommitStore((state) => state.isEditMode);
  const setIsEditMode = useCommitStore((state) => state.setIsEditMode);
  const year = useCommitStore((state) => state.filterYear);

  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-2xl font-semibold">Commits</h1>
      <div className="flex flex-row gap-2">
        <CommitFilter />
        <CommitUpsertModal
          description={COMMIT_MODAL_ADD_STRINGS.description}
          requestType="POST"
          title={COMMIT_MODAL_ADD_STRINGS.title}
          triggerButton={
            <Button className=" w-min md:w-fit" variant={"outline"}>
              <Plus className="w-4 h-4" />
            </Button>
          }
          year={year}
        />
        <Button
          className="w-min md:w-fit"
          variant={isEditMode ? "default" : "outline"}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? <span>Done</span> : <Edit className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
