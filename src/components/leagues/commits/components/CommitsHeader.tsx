import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Edit, Plus } from "lucide-react";
import { COMMIT_MODAL_ADD_STRINGS } from "../constants/content";
import { useCommitStore } from "../store/useCommitStore";
import { CommitFilter } from "./CommitFilter";
import { CommitUpsertModal } from "./CommitUpsertModal";

export function CommitsHeader() {
  const isEditMode = useCommitStore((state) => state.isEditMode);
  const setIsEditMode = useCommitStore((state) => state.setIsEditMode);
  const isTableViewMode = useCommitStore((state) => state.isTableViewMode);
  const setIsTableViewMode = useCommitStore(
    (state) => state.setIsTableViewMode
  );
  const year = useCommitStore((state) => state.filterYear);

  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Commits</h1>
        <h3 className="italic">{year}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
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
        <div className="flex items-center self-end gap-2">
          <Switch
            id="table-view-mode"
            checked={isTableViewMode}
            onCheckedChange={() => setIsTableViewMode(!isTableViewMode)}
          />
          <Label htmlFor="table-view-mode">Table View</Label>
        </div>
      </div>
    </div>
  );
}
