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
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUpdateWeek } from "../api/mutations/useUpdateWeek";

interface ScheduleUpdateWeekFormProps {
  closeModal: () => void;
}

const scheduleUpdateWeekFormSchema = z.object({
  leagueId: z.string(),
  week: z.coerce.number().int().gte(0),
  year: z.coerce.number().int().gte(2024),
});

export function ScheduleUpdateWeekForm({
  closeModal,
}: ScheduleUpdateWeekFormProps) {
  const leagueId = useLeagueStore((state) => state.leagueId);
  const week = useLeagueStore((state) => state.leagueWeek);
  const year = useLeagueStore((state) => state.leagueYear);
  const setWeek = useLeagueStore((state) => state.setLeagueWeek);
  const setYear = useLeagueStore((state) => state.setLeagueYear);
  const scheduleUpdateWeekForm = useForm<
    z.infer<typeof scheduleUpdateWeekFormSchema>
  >({
    resolver: zodResolver(scheduleUpdateWeekFormSchema),
    defaultValues: {
      leagueId: leagueId,
      week: week,
      year: year,
    },
  });

  const { mutate, isPending } = useUpdateWeek();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  function onSubmitSuccess() {
    closeModal();
    setWeek(scheduleUpdateWeekForm.getValues("week"));
    setYear(scheduleUpdateWeekForm.getValues("year"));
    toast.success("Successfully updated week");
  }

  function onSubmitError() {
    closeModal();
    toast.error("Failed update week");
  }
  function onSubmit(values: z.infer<typeof scheduleUpdateWeekFormSchema>) {
    mutate(values, { onSuccess: onSubmitSuccess, onError: onSubmitError });
  }

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
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-end gap-2 md:flex-row">
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
