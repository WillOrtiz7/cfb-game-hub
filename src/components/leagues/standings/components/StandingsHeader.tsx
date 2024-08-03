import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { StandingsUpdateModal } from "./StandingsUpdateModal";

export function StandingsHeader() {
  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-2xl font-semibold">Standings</h1>
      <StandingsUpdateModal
        title="Update Standings"
        description="Enter the updated record of a team"
        triggerButton={
          <Button className="items-center self-end justify-center w-min md:w-fit">
            <span>Update Standings</span> <Edit className="w-4 h-4 ml-2" />
          </Button>
        }
      />
    </div>
  );
}
