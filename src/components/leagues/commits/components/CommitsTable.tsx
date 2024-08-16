import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TEAM_LOGOS_BASE_URL } from "../../schedules/constants/baseUrls";
import { GetCommitsResponse } from "../api/queries/useGetCommits";
import { useCommitStore } from "../store/useCommitStore";
import { CommitCardEditModeOptions } from "./CommitCardEditModeOptions";

interface CommitsTableProps {
  commits: GetCommitsResponse[];
}

export function CommitsTable({ commits }: CommitsTableProps) {
  const isEditMode = useCommitStore((state) => state.isEditMode);
  return (
    <div className="border-[1px] rounded-md w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {isEditMode && <TableHead className="w-36">Actions</TableHead>}
            <TableHead className="min-w-8">Rank</TableHead>
            <TableHead className="min-w-24">School</TableHead>
            <TableHead className="min-w-20">Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Stars</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commits.map((commit) => (
            <TableRow key={commit.id} className="text-lg">
              {isEditMode && (
                <TableCell className="w-min">
                  <CommitCardEditModeOptions commit={commit} />
                </TableCell>
              )}
              <TableCell className="font-medium">
                {commit.rank_national}
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={
                      TEAM_LOGOS_BASE_URL +
                      commit.team?.team_info.logo_id +
                      ".png"
                    }
                    alt="Team Logo"
                    className="object-scale-down w-6 h-6"
                  />
                  <span>{commit.team?.team_info.name_abbreviation}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <span>
                  {commit.first_name.charAt(0)}. {commit.last_name}
                </span>
              </TableCell>
              <TableCell>
                <span>{commit.position}</span>
              </TableCell>
              <TableCell>
                <span>{commit.star_rating}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
