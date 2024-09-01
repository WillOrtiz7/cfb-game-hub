import { Edit } from "lucide-react";
import { Button } from "../ui/button";

interface EditModeButtonProps {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}
export function EditModeButton({
  isEditMode,
  setIsEditMode,
}: EditModeButtonProps) {
  return (
    <Button
      className="w-min md:w-fit"
      variant={isEditMode ? "default" : "outline"}
      onClick={() => setIsEditMode(!isEditMode)}
    >
      {isEditMode ? <span>Done</span> : <Edit className="w-4 h-4" />}
    </Button>
  );
}
