import { supabase } from "@/supabase/createClient";
import { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

async function getTeamRecord(teamId: string, year: number) {
    const teamRecordQuery = supabase
        .from('standings')
        .select('id, losses_total, losses_conf, ties_total, ties_conf, wins_total, wins_conf')
        .eq("team_id", teamId)
        .eq("year", year)
        .maybeSingle();

    type GetTeamRecordResponse = QueryData<typeof teamRecordQuery>;

    const { data, error } = await teamRecordQuery;

    if (error) {
        throw new Error("Error code: " + error.code + "\nFailed to fetch standings");
    }

    if (!data) {
        throw new Error("No data found for the given team ID");
    }

    const teamRecord: GetTeamRecordResponse = data;

    return teamRecord;
}

export function useGetTeamRecord(teamId: string, year: number) {
    return useQuery({
        queryKey: ["getTeamRecord", teamId, year],
        queryFn: async () => {
            return getTeamRecord(teamId, year);
        },
        enabled: !!teamId,
    });
}