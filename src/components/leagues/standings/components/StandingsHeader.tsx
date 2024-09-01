import { EditModeButton } from "@/components/shared/EditModeButton";
import { standingsStore } from "../store/standingsStore";

export function StandingsHeader() {
  const isEditMode = standingsStore((state) => state.isEditMode);
  const setIsEditMode = standingsStore((state) => state.setIsEditMode);
  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-2xl font-semibold">Standings</h1>
      <EditModeButton isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
    </div>
  );
}
