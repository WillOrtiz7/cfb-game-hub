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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ScheduleTeamListDropdown } from "../../schedules/components/ScheduleTeamListDropdown";
import { useUpdateStandings } from "../api/mutations/useUpdateStandings";
import { useGetTeamRecord } from "../api/queries/useGetTeamRecord";

interface StandingsUpdateFormProps {
  closeModal: () => void;
  lossesConf: number;
  lossesOverall: number;
  tiesConf: number;
  tiesOverall: number;
  winsConf: number;
  winsOverall: number;
}

const updateStandingsFormSchema = z.object({
  lossesConf: z.coerce.number().int().gte(0),
  lossesOverall: z.coerce.number().int().gte(0),
  teamId: z.string().uuid(),
  tiesConf: z.coerce.number().int().gte(0),
  tiesOverall: z.coerce.number().int().gte(0),
  winsConf: z.coerce.number().int().gte(0),
  winsOverall: z.coerce.number().int().gte(0),
  year: z.coerce.number().int().gte(2024),
});

export function StandingsUpdateForm({
  closeModal,
  lossesConf,
  lossesOverall,
  tiesConf,
  tiesOverall,
  winsConf,
  winsOverall,
}: StandingsUpdateFormProps) {
  const { mutate, isPending } = useUpdateStandings();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const leagueYear = useLeagueStore((state) => state.leagueYear);

  const updateStandingsForm = useForm<
    z.infer<typeof updateStandingsFormSchema>
  >({
    resolver: zodResolver(updateStandingsFormSchema),
    defaultValues: {
      lossesConf,
      lossesOverall,
      teamId: "ea1759bf-08da-48cd-b1e9-2e989c37eaea",
      tiesConf,
      tiesOverall,
      winsConf,
      winsOverall,
      year: leagueYear,
    },
  });
  const { data: teamStandings } = useGetTeamRecord(
    updateStandingsForm.watch("teamId"),
    leagueYear
  );

  function onSubmitSuccess() {
    closeModal();
    toast.success("Standings updated");
  }

  function onSubmitError() {
    closeModal();
    toast.error("Error updating standings");
  }

  function onSubmit(values: z.infer<typeof updateStandingsFormSchema>) {
    mutate(values, {
      onSuccess: onSubmitSuccess,
      onError: onSubmitError,
    });
  }

  useEffect(() => {
    if (teamStandings) {
      updateStandingsForm.reset({
        lossesConf: teamStandings.losses_conf,
        lossesOverall: teamStandings.losses_total,
        teamId: teamStandings.team_id,
        tiesConf: teamStandings.ties_conf,
        tiesOverall: teamStandings.ties_total,
        winsConf: teamStandings.wins_conf,
        winsOverall: teamStandings.wins_total,
        year: leagueYear,
      });
    }
  }, [leagueYear, teamStandings, updateStandingsForm]);

  return (
    <Form {...updateStandingsForm}>
      <form
        onSubmit={updateStandingsForm.handleSubmit(onSubmit)}
        className="space-y-8 max-h-[80vh] overflow-auto"
      >
        <FormField
          control={updateStandingsForm.control}
          name="teamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
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
            control={updateStandingsForm.control}
            name="winsOverall"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wins Overall</FormLabel>
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
            control={updateStandingsForm.control}
            name="lossesOverall"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Losses Overall</FormLabel>
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
            control={updateStandingsForm.control}
            name="tiesOverall"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ties Overall</FormLabel>
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
            control={updateStandingsForm.control}
            name="winsConf"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Wins Conf</FormLabel>
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
            control={updateStandingsForm.control}
            name="lossesConf"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Losses Conf</FormLabel>
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
            control={updateStandingsForm.control}
            name="tiesConf"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Ties Conf</FormLabel>
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
