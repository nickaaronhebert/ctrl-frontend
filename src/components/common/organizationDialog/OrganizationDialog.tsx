import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Pharmacy } from "@/types/global/commonTypes";

type ControlledSelectProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data?: any;
  placeholder: string;
};

const OrganizationDialog = ({
  value,
  setValue,
  data,
  placeholder,
}: ControlledSelectProps) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Organizations</SelectLabel>
          {data?.map((pharmacy: Pharmacy) => (
            <SelectItem key={pharmacy.id} value={pharmacy.id}>
              {pharmacy.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrganizationDialog;
