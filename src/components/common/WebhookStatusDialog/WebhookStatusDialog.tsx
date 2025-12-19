import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";

type ControlledSelectProps = {
  value: string;
  setValue: Dispatch<SetStateAction<"success" | "failed" | "">>;
  placeholder: string;
  table?: any;
};

const WebhookStatusDialog = ({
  value,
  setValue,
  placeholder,
  table,
}: ControlledSelectProps) => {
  const handleValueChange = (newValue: string) => {
    setValue(newValue as "success" | "failed");
    table.setPageIndex(0);
  };

  const options: Array<"success" | "failed"> = ["success", "failed"];

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] !h-11 border border-gray-300 mb-2 text-black ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((direction) => (
            <SelectItem key={direction} value={direction}>
              {direction.charAt(0).toUpperCase() + direction.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WebhookStatusDialog;
