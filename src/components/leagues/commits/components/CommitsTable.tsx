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

interface CommitsTableProps {
  commits: GetCommitsResponse[];
}

export function CommitsTable({ commits }: CommitsTableProps) {
  return (
    <div className="border-[1px] rounded-md w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] md:w-[100px]">Rank</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Stars</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commits.map((commit) => (
            <TableRow key={commit.id} className="text-lg">
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
