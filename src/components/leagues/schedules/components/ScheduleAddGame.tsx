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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { usePostGameToSchedule } from "../api/mutations/usePostGameToSchedule";

export function ScheduleAddGame() {
  const { mutate, isPending, isSuccess, isError, error } =
    usePostGameToSchedule();

  const queryClient = useQueryClient();

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["getSchedules"] });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add a game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a game</DialogTitle>
          <DialogDescription>
            Enter information about the game you want to add so that it can be
            viewed in the schedule.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Home Team
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Away Team
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {isPending ? (
            <Button disabled>Submitting ...</Button>
          ) : (
            <Button type="submit" onClick={() => mutate()}>
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
