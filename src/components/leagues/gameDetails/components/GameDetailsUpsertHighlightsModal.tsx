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
import { GameDetailsUpsertHighlightForm } from "./GameDetailsUpsertHighlightsForm";

interface GameDetailsUpsertHighlightsModalProps {
  description: string;
  requestType: "POST" | "PUT";
  scheduleId: string;
  title: string;
  triggerButton: React.ReactNode;
}

export function GameDetailsUpsertHighlightsModal({
  description,
  requestType,
  scheduleId,
  title,
  triggerButton,
}: GameDetailsUpsertHighlightsModalProps) {
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
          <GameDetailsUpsertHighlightForm
            closeModal={() => setOpen(false)}
            requestType={requestType}
            scheduleId={scheduleId}
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
          <GameDetailsUpsertHighlightForm
            closeModal={() => setOpen(false)}
            requestType={requestType}
            scheduleId={scheduleId}
          />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
