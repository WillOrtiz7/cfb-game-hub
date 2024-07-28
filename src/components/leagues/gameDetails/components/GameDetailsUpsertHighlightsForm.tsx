import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUpsertHighlight } from "../api/mutations/useUpsertHighlight";

interface GameDetailsUpsertHighlightFormProps {
  closeModal: () => void;
  requestType: "POST" | "PUT";
  scheduleId: string;
}

const upsertHighlightFormSchema = z.object({
  scheduleId: z.string().uuid(),
  title: z.string().optional(),
  url: z.string().url(),
});

export function GameDetailsUpsertHighlightForm({
  closeModal,
  requestType,
  scheduleId,
}: GameDetailsUpsertHighlightFormProps) {
  const { mutate, isPending } = useUpsertHighlight();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const upsertHighlightForm = useForm<
    z.infer<typeof upsertHighlightFormSchema>
  >({
    resolver: zodResolver(upsertHighlightFormSchema),
    defaultValues: {
      url: "",
      scheduleId: scheduleId,
      title: "Untitled",
    },
  });

  function onSubmitSuccess() {
    closeModal();
    if (requestType === "POST") {
      toast.success("Highlight added");
    } else if (requestType === "PUT") {
      toast.success("Highlight edited");
    }
  }

  function onSubmitError() {
    closeModal();
    if (requestType === "POST") {
      toast.error("Failed to add highlight");
    } else if (requestType === "PUT") {
      toast.error("Failed to edit highlight");
    }
  }

  function onSubmit(values: z.infer<typeof upsertHighlightFormSchema>) {
    mutate(values, { onSuccess: onSubmitSuccess, onError: onSubmitError });
  }

  return (
    <Form {...upsertHighlightForm}>
      <form
        onSubmit={upsertHighlightForm.handleSubmit(onSubmit)}
        className="space-y-8 max-h-[80vh] overflow-auto"
      >
        <div className="flex flex-col gap-2">
          <FormField
            control={upsertHighlightForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg md:text-sm"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={upsertHighlightForm.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Highlight URL</FormLabel>
                <FormControl>
                  <Input className="text-lg md:text-sm" type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isDesktop ? (
          <div className="flex flex-row justify-end gap-2">
            <Button type="button" variant={"secondary"} onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-end gap-2">
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
            <Button type="button" variant={"secondary"} onClick={closeModal}>
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
