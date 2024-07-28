import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { ScheduleAddGameForm } from "./ScheduleAddGameForm";

interface ScheduleAddGameModalProps {
  week: number;
  year: number;
}

export function ScheduleAddGameModal({
  week,
  year,
}: ScheduleAddGameModalProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full md:w-1/6 xl:w-1/12">
            Add a game
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a game</DialogTitle>
            <DialogDescription>
              Enter information about the game you want to add so that it can be
              viewed in the schedule.
            </DialogDescription>
          </DialogHeader>
          <ScheduleAddGameForm
            closeModal={() => setOpen(false)}
            week={week}
            year={year}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          Add a game
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a game</DrawerTitle>
          <DrawerDescription>
            Enter information about the game you want to add so that it can be
            viewed in the schedule.
          </DrawerDescription>
          <ScheduleAddGameForm
            closeModal={() => setOpen(false)}
            week={week}
            year={year}
          />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
