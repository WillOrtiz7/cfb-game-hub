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
import { usePostGameToSchedule } from "../api/mutations/usePostGameToSchedule";
import { ScheduleItem } from "../api/queries/useGetSchedules";
import { ScheduleTeamListDropdown } from "./ScheduleTeamListDropdown";

interface ScheduleAddGameFormProps {
  closeModal: () => void;
  scheduleItem?: ScheduleItem;
  week: number;
  year: number;
}

const addGameFormSchema = z.object({
  homeTeamId: z.string().uuid(),
  homeTeamScore: z.coerce.number().int().gte(0),
  awayTeamId: z.string().uuid(),
  awayTeamScore: z.coerce.number().int().gte(0),
  year: z.coerce.number().int().gte(2024),
  week: z.coerce.number().int().gte(0),
  scheduleId: z.string().uuid().optional(),
});

export function ScheduleAddGameForm({
  closeModal,
  scheduleItem,
  week,
  year,
}: ScheduleAddGameFormProps) {
  const { mutate, isPending } = usePostGameToSchedule();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const addGameForm = useForm<z.infer<typeof addGameFormSchema>>({
    resolver: zodResolver(addGameFormSchema),
    defaultValues: {
      homeTeamId: scheduleItem?.home_team.id,
      homeTeamScore: scheduleItem?.home_team_score || 0,
      awayTeamId: scheduleItem?.away_team.id,
      awayTeamScore: scheduleItem?.away_team_score || 0,
      year: year,
      week: week,
      scheduleId: scheduleItem?.id,
    },
  });

  function onSubmitSuccess() {
    closeModal();
  }

  function onSubmitError() {
    closeModal();
  }

  function onSubmit(values: z.infer<typeof addGameFormSchema>) {
    mutate(values, { onSuccess: onSubmitSuccess, onError: onSubmitError });
    console.log(values);
  }

  return (
    <Form {...addGameForm}>
      <form
        onSubmit={addGameForm.handleSubmit(onSubmit)}
        className="space-y-8 max-h-[80vh] overflow-auto"
      >
        <FormField
          control={addGameForm.control}
          name="homeTeamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Team</FormLabel>
              <FormControl>
                <ScheduleTeamListDropdown
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addGameForm.control}
          name="awayTeamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Away Team</FormLabel>
              <FormControl>
                <ScheduleTeamListDropdown
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2">
          <FormField
            control={addGameForm.control}
            name="homeTeamScore"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Home Team Score</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg md:text-sm"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={addGameForm.control}
            name="awayTeamScore"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Away Team Score</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg md:text-sm"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-2">
          <FormField
            control={addGameForm.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                {" "}
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg md:text-sm"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addGameForm.control}
            name="week"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                {" "}
                <FormLabel>Week</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg md:text-sm"
                    type="number"
                    {...field}
                  />
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
