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
import { ScheduleTeamListDropdown } from "../../schedules/components/ScheduleTeamListDropdown";
import { useUpsertCommit } from "../api/mutations/useUpsertCommit";
import { GetCommitsResponse } from "../api/queries/useGetRecruits";
import { CommitPositionsDropdown } from "./CommitPositionsDropdown";
import { CommitStarRatingDropdown } from "./CommitStarRatingDropdown";

interface CommitUpsertFormProps {
  closeModal: () => void;
  commit?: GetCommitsResponse;
  requestType: "POST" | "PUT";
  year: number;
}

const upsertCommitFormSchema = z.object({
  commitId: z.string().uuid().optional(),
  firstName: z.string().min(2).max(25),
  lastName: z.string().min(2).max(25),
  leagueId: z.string().uuid(),
  position: z.enum([
    "QB",
    "HB",
    "WR",
    "TE",
    "OT",
    "OG",
    "DE",
    "DT",
    "OLB",
    "MLB",
    "CB",
    "FS",
    "SS",
    "K",
    "P",
    "ATH",
  ]),
  starRating: z.enum(["1", "2", "3", "4", "5"]),
  teamId: z.string().uuid(),
  year: z.coerce.number().int().gte(2024),
});

export function CommitUpsertForm({
  closeModal,
  commit,
  requestType,
  year,
}: CommitUpsertFormProps) {
  const { mutate, isPending } = useUpsertCommit();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useGetLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);

  const upsertCommitForm = useForm<z.infer<typeof upsertCommitFormSchema>>({
    resolver: zodResolver(upsertCommitFormSchema),
    defaultValues: {
      commitId: commit?.id || undefined,
      firstName: commit?.first_name || "",
      lastName: commit?.last_name || "",
      leagueId: leagueId,
      position: commit?.position || "QB",
      starRating: commit?.star_rating || "1",
      teamId: commit?.team?.id || "",
      year: year,
    },
  });

  function onSubmitSuccess() {
    closeModal();
    if (requestType === "POST") {
      toast.success("Commit added");
    } else if (requestType === "PUT") {
      toast.success("Commit edited");
    }
  }

  function onSubmitError() {
    closeModal();
    if (requestType === "POST") {
      toast.error("Failed to add commit");
    } else if (requestType === "PUT") {
      toast.error("Failed to edit commit");
    }
  }

  function onSubmit(values: z.infer<typeof upsertCommitFormSchema>) {
    mutate(values, { onSuccess: onSubmitSuccess, onError: onSubmitError });
  }

  return (
    <Form {...upsertCommitForm}>
      <form
        onSubmit={upsertCommitForm.handleSubmit(onSubmit)}
        className="space-y-8 max-h-[80vh] overflow-auto"
      >
        <FormField
          control={upsertCommitForm.control}
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
        <FormField
          control={upsertCommitForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input className="text-lg md:text-sm" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={upsertCommitForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input className="text-lg md:text-sm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2">
          <FormField
            control={upsertCommitForm.control}
            name="position"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Positon</FormLabel>
                <FormControl>
                  <CommitPositionsDropdown
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={upsertCommitForm.control}
            name="starRating"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Star Rating</FormLabel>
                <FormControl>
                  <CommitStarRatingDropdown
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-2">
          <FormField
            control={upsertCommitForm.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
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
