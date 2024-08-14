import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/db/types";
import {} from "@radix-ui/react-select";

interface CommitPositionsDropdownProps {
  onValueChange: (value: string) => void;
  value: Database["public"]["Enums"]["commit_position"];
}

export function CommitPositionsDropdown({
  onValueChange,
  value,
}: CommitPositionsDropdownProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select a position" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="QB">QB</SelectItem>
        <SelectItem value="HB">HB</SelectItem>
        <SelectItem value="WR">WR</SelectItem>
        <SelectItem value="TE">TE</SelectItem>
        <SelectItem value="OT">OT</SelectItem>
        <SelectItem value="OG">OG</SelectItem>
        <SelectItem value="DE">DE</SelectItem>
        <SelectItem value="DT">DT</SelectItem>
        <SelectItem value="OLB">OLB</SelectItem>
        <SelectItem value="MLB">MLB</SelectItem>
        <SelectItem value="CB">CB</SelectItem>
        <SelectItem value="FS">FS</SelectItem>
        <SelectItem value="SS">SS</SelectItem>
        <SelectItem value="K">K</SelectItem>
        <SelectItem value="P">P</SelectItem>
        <SelectItem value="ATH">ATH</SelectItem>
      </SelectContent>
    </Select>
  );
}
