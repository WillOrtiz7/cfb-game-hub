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
import { useGetLeagueId } from "@/hooks/useGetLeagueId";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUpsertGameToSchedule } from "../api/mutations/useUpsertGameToSchedule";
import { ScheduleItem } from "../api/queries/useGetSchedules";
import { ScheduleTeamListDropdown } from "./ScheduleTeamListDropdown";

interface ScheduleUpsertGameFormProps {
  closeModal: () => void;
  requestType: "POST" | "PUT";
  scheduleItem?: ScheduleItem;
  week: number;
  year: number;
}

const upsertGameFormSchema = z.object({
  homeTeamId: z.string().uuid(),
  homeTeamScore: z.coerce.number().int().gte(0),
  awayTeamId: z.string().uuid(),
  awayTeamScore: z.coerce.number().int().gte(0),
  leagueId: z.string().uuid(),
  year: z.coerce.number().int().gte(2024),
  week: z.coerce.number().int().gte(0),
  scheduleId: z.string().uuid().optional(),
});

export function ScheduleUpsertGameForm({
  closeModal,
  requestType,
  scheduleItem,
  week,
  year,
}: ScheduleUpsertGameFormProps) {
  const { mutate, isPending } = useUpsertGameToSchedule();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useGetLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);

  const upsertGameForm = useForm<z.infer<typeof upsertGameFormSchema>>({
    resolver: zodResolver(upsertGameFormSchema),
    defaultValues: {
      homeTeamId: scheduleItem?.home_team.id,
      homeTeamScore: scheduleItem?.home_team_score || 0,
      awayTeamId: scheduleItem?.away_team.id,
      awayTeamScore: scheduleItem?.away_team_score || 0,
      leagueId: leagueId,
      year: year,
      week: week,
      scheduleId: scheduleItem?.id,
    },
  });

  function onSubmitSuccess() {
    closeModal();
    if (requestType === "POST") {
      toast.success("Game added to schedule");
    } else if (requestType === "PUT") {
      toast.success("Game edited in schedule");
    }
  }

  function onSubmitError() {
    closeModal();
    if (requestType === "POST") {
      toast.error("Failed to add game to schedule");
    } else if (requestType === "PUT") {
      toast.error("Failed to edit game in schedule");
    }
  }

  function onSubmit(values: z.infer<typeof upsertGameFormSchema>) {
    mutate(values, { onSuccess: onSubmitSuccess, onError: onSubmitError });
  }

  return (
    <Form {...upsertGameForm}>
      <form
        onSubmit={upsertGameForm.handleSubmit(onSubmit)}
        className="space-y-8 max-h-[80vh] overflow-auto"
      >
        <FormField
          control={upsertGameForm.control}
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
          control={upsertGameForm.control}
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
            control={upsertGameForm.control}
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
            control={upsertGameForm.control}
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
            control={upsertGameForm.control}
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
            control={upsertGameForm.control}
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
