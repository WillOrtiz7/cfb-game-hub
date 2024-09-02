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
import { z } from "zod";

interface ScheduleUpdateWeekFormProps {
  closeModal: () => void;
}

const scheduleUpdateWeekFormSchema = z.object({
  leagueId: z.string(),
  week: z.coerce.number().int().gte(0),
  year: z.coerce.number().int().gte(2024),
});

function onSubmit(values: z.infer<typeof scheduleUpdateWeekFormSchema>) {
  console.log("Submitting form data: ", values);
}

export function ScheduleUpdateWeekForm({
  closeModal,
}: ScheduleUpdateWeekFormProps) {
  const scheduleUpdateWeekForm = useForm<
    z.infer<typeof scheduleUpdateWeekFormSchema>
  >({
    resolver: zodResolver(scheduleUpdateWeekFormSchema),
    defaultValues: {
      leagueId: "",
      week: 1,
      year: 2024,
    },
  });

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Form {...scheduleUpdateWeekForm}>
      <form
        onSubmit={scheduleUpdateWeekForm.handleSubmit(onSubmit)}
        className="space-y-8 max-h-[80vh] overflow-auto"
      >
        <div className="flex flex-row w-full gap-2">
          <FormField
            control={scheduleUpdateWeekForm.control}
            name="week"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Week</FormLabel>
                <FormControl>
                  <Input className="text-lg md:text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={scheduleUpdateWeekForm.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input className="text-lg md:text-sm" {...field} />
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
            <Button type="submit" disabled={false}>
              Submit
            </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-end gap-2 md:flex-row">
            <Button type="submit" disabled={false}>
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
