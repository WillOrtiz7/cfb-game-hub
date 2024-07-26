import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScheduleTeamListDropdownProps {
  defaultValue: string;
  onValueChange: (value: string) => void;
}

export function ScheduleTeamListDropdown({
  defaultValue,
  onValueChange,
}: ScheduleTeamListDropdownProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a team" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Team List</SelectLabel>
          <SelectItem value="ae36c2eb-476f-4d93-83c6-53255622a2c6">
            KSU Wildcats
          </SelectItem>
          <SelectItem value="35a8b989-5b1a-492c-aee9-de8f8731e79a">
            Colorado Buffaloes
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
