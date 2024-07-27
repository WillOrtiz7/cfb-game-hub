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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePostGameToSchedule } from "../api/mutations/usePostGameToSchedule";
import { ScheduleTeamListDropdown } from "./ScheduleTeamListDropdown";

interface ScheduleAddGameFormProps {
  closeModal: () => void;
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
});

export function ScheduleAddGameForm({
  closeModal,
  week,
  year,
}: ScheduleAddGameFormProps) {
  const { mutate, isPending } = usePostGameToSchedule();

  const addGameForm = useForm<z.infer<typeof addGameFormSchema>>({
    resolver: zodResolver(addGameFormSchema),
    defaultValues: {
      homeTeamId: "bbfb1a24-2d92-4168-a178-b2a90d49cd81",
      homeTeamScore: 0,
      awayTeamId: "bbfb1a24-2d92-4168-a178-b2a90d49cd81",
      awayTeamScore: 0,
      year: year,
      week: week,
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
      <form onSubmit={addGameForm.handleSubmit(onSubmit)} className="space-y-8">
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
          name="homeTeamScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Team Score</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
        <FormField
          control={addGameForm.control}
          name="awayTeamScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Away Team Score</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addGameForm.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addGameForm.control}
          name="week"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Week</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end gap-2">
          <Button type="button" variant={"destructive"} onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
