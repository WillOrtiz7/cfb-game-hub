import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

interface ModalDeleteProps {
  deleteAction: () => void;
  deletePending: boolean;
  description: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  triggerButton: React.ReactNode;
}

export function ModalDelete({
  deleteAction,
  deletePending,
  description,
  open,
  setOpen,
  title,
  triggerButton,
}: ModalDeleteProps) {
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
          <DialogFooter className="gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteAction}
              disabled={deletePending}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">{title}</DrawerTitle>
          <DrawerDescription className="mb-2 text-center">
            {description}
          </DrawerDescription>
          <DrawerFooter>
            <Button
              variant="destructive"
              onClick={deleteAction}
              disabled={deletePending}
            >
              Delete
            </Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
