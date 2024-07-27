import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ScheduleAddGameForm } from "./ScheduleAddGameForm";

export function ScheduleAddGameModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-1/6 xl:w-1/12">
          Add a game
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a game</DialogTitle>
          <DialogDescription>
            Enter information about the game you want to add so that it can be
            viewed in the schedule.
          </DialogDescription>
        </DialogHeader>
        <ScheduleAddGameForm closeModal={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
