import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { StandingsUpdateModal } from "./StandingsUpdateModal";

interface StandingsEditModeOptionsProps {
  teamId: string;
}

export function StandingsEditModeOptions({
  teamId,
}: StandingsEditModeOptionsProps) {
  return (
    <div className="flex flex-row">
      <StandingsUpdateModal
        teamId={teamId}
        title="Update Standings"
        description="Enter the updated record of a team"
        triggerButton={
          <Button variant={"ghost"} size={"icon"}>
            <Edit className="w-4 h-4" />
          </Button>
        }
      />
    </div>
  );
}
