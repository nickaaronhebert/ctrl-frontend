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
  table?: any;
  triggerClassName?: string;
};

const OrganizationDialog = ({
  value,
  setValue,
  data,
  placeholder,
  table,
  triggerClassName,
}: ControlledSelectProps) => {
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    table.setPageIndex(0);
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger
        className={`w-[180px] text-black ${triggerClassName ?? ""}`}
      >
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
