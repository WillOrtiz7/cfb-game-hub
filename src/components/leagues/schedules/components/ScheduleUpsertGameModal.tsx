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
import { ScheduleItem } from "../api/queries/useGetSchedules";
import { ScheduleAddGameForm } from "./ScheduleAddGameForm";

interface ScheduleUpsertGameModalProps {
  description: string;
  scheduleItem?: ScheduleItem;
  title: string;
  triggerButton: React.ReactNode;
  week: number;
  year: number;
}

export function ScheduleUpsertGameModal({
  description,
  scheduleItem,
  title,
  triggerButton,
  week,
  year,
}: ScheduleUpsertGameModalProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
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
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription className="mb-2 text-start">
            {description}
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
