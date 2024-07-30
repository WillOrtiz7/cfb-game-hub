import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useDeleteGameFromSchedule } from "../api/mutations/useDeleteGameFromSchedule";
import { ScheduleItem } from "../api/queries/useGetSchedules";
import { ScheduleDeleteModalTeamInfo } from "./ScheduleDeleteModalTeamInfo";

interface ScheduleDeleteModalProps {
  scheduleItem: ScheduleItem;
}

export function ScheduleDeleteModal({
  scheduleItem,
}: ScheduleDeleteModalProps) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useDeleteGameFromSchedule();

  function onSubmitSuccess() {
    setOpen(false);
  }

  function onSubmitError() {
    setOpen(false);
  }

  function onSubmit(scheduleId: string) {
    mutate(scheduleId, { onSuccess: onSubmitSuccess, onError: onSubmitError });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete a game</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this game?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-center my-2 gap-12">
          <ScheduleDeleteModalTeamInfo
            coachName={scheduleItem.home_team.coach_name}
            teamLogoId={scheduleItem.home_team.team.logo_id}
            teamName={scheduleItem.home_team.team.name_abbreviation}
            teamScore={scheduleItem.home_team_score}
          />

          <ScheduleDeleteModalTeamInfo
            coachName={scheduleItem.away_team.coach_name}
            teamLogoId={scheduleItem.away_team.team.logo_id}
            teamName={scheduleItem.away_team.team.name_abbreviation}
            teamScore={scheduleItem.away_team_score}
          />
        </div>
        <DialogFooter className="gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={() => onSubmit(scheduleItem.id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
