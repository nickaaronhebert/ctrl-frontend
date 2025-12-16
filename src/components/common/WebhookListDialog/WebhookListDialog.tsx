import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Webhook } from "@/types/responses/IGetAllWebhook";

type ControlledSelectProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data?: any;
  placeholder: string;
  table?: any;
};

const WebhookListDialog = ({
  value,
  setValue,
  data,
  placeholder,
  table,
}: ControlledSelectProps) => {
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    table.setPageIndex(0);
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] !h-11 border border-gray-300 mb-2 text-black ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.map((webhook: Webhook) => (
            <SelectItem key={webhook.id} value={webhook.id}>
              {webhook?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WebhookListDialog;
