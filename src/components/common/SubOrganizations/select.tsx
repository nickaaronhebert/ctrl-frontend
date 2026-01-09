import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type SubOrganization } from "@/types/global/commonTypes";

type ControlledSelectProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data?: any;
  placeholder: string;
  table?: any;
  triggerClassName?: string;
};

const SubOrgSelect = ({
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
          <SelectLabel>Sub Organizations</SelectLabel>
          {data?.map((subOrg: SubOrganization) => (
            <SelectItem key={subOrg.id} value={subOrg.id}>
              {subOrg.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubOrgSelect;
