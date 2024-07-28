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
import { Edit } from "lucide-react";
import { useState } from "react";
import { ScheduleItem } from "../api/queries/useGetSchedules";
import { ScheduleAddGameForm } from "./ScheduleAddGameForm";

interface ScheduleEditGameProps {
  scheduleItem: ScheduleItem;
  week: number;
  year: number;
}

export function ScheduleEditGameModal({
  scheduleItem,
  week,
  year,
}: ScheduleEditGameProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit a game</DialogTitle>
            <DialogDescription>
              Enter information about the game you want to edit so that it can
              be viewed in the schedule.
            </DialogDescription>
          </DialogHeader>
          <ScheduleAddGameForm
            closeModal={() => setOpen(false)}
            scheduleItem={scheduleItem}
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
        <Button variant={"ghost"} size={"icon"}>
          <Edit className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit a game</DrawerTitle>
          <DrawerDescription className="mb-2 text-start">
            Enter information about the game you want to edit so that it can be
            viewed in the schedule.
          </DrawerDescription>
          <ScheduleAddGameForm
            closeModal={() => setOpen(false)}
            scheduleItem={scheduleItem}
            week={week}
            year={year}
          />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
