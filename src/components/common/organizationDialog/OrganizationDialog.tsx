import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { organizations } from "@/constants";

type ControlledSelectProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const OrganizationDialog = ({ value, setValue }: ControlledSelectProps) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue placeholder="Organizations" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Organizations</SelectLabel>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrganizationDialog;
