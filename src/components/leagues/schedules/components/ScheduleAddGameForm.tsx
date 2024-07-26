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
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePostGameToSchedule } from "../api/mutations/usePostGameToSchedule";

interface ScheduleAddGameFormProps {
  closeModal: () => void;
}

const addGameFormSchema = z.object({
  homeTeamId: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  homeTeamScore: z.number().int().gte(0),
  awayTeamId: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  awayTeamScore: z.number().int().gte(0),
  year: z.number().int().positive(),
  week: z.number().int().gte(0),
});

export function ScheduleAddGameForm({ closeModal }: ScheduleAddGameFormProps) {
  const { mutate, isPending, isSuccess, isError, error } =
    usePostGameToSchedule();

  const queryClient = useQueryClient();

  const addGameForm = useForm<z.infer<typeof addGameFormSchema>>({
    resolver: zodResolver(addGameFormSchema),
    defaultValues: {
      homeTeamId: "aae",
      homeTeamScore: 0,
      awayTeamId: "aaa",
      awayTeamScore: 0,
      year: 2024,
      week: 0,
    },
  });

  function onSubmit(values: z.infer<typeof addGameFormSchema>) {
    mutate();
    console.log(values);
  }

  if (isError) {
    console.log(error);
    closeModal();
  }

  if (isSuccess) {
    closeModal();
    queryClient.invalidateQueries({ queryKey: ["getSchedules"] });
  }

  return (
    <Form {...addGameForm}>
      <form onSubmit={addGameForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={addGameForm.control}
          name="homeTeamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Team ID</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel>Away Team ID</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
