import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TEAM_LOGOS_BASE_URL } from "../../schedules/constants/baseUrls";
import { GetRecruitsResponse } from "../api/queries/useGetRecruits";
import { RecruitStarRating } from "./RecruitStarRating";

interface RecruitsTableProps {
  recruits: GetRecruitsResponse[];
}

export function RecruitsTable({ recruits }: RecruitsTableProps) {
  return (
    <div className="border-[1px] rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Star</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recruits.map((recruit, index) => (
            <TableRow key={recruit.id} className="text-lg">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                <span>
                  {recruit.first_name.charAt(0)}. {recruit.last_name}
                </span>
              </TableCell>
              <TableCell>{recruit.position}</TableCell>
              <TableCell>
                <RecruitStarRating starRating={recruit.star_rating} />
              </TableCell>
              <TableCell>
                {recruit.team_id ? (
                  <img
                    src={
                      TEAM_LOGOS_BASE_URL +
                      recruit.team?.team_info.logo_id +
                      ".png"
                    }
                    className="object-scale-down w-8 h-8"
                  />
                ) : (
                  "Not Committed"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
