import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  // FormMessage,
} from "@/components/ui/form";

import { useFormContext } from "react-hook-form";
import { Switch } from "../ui/switch";

interface SwitchProps {
  name: string;
  label: string;

  isRequired?: boolean;
}

const SwitchElement: React.FC<SwitchProps> = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-[5px] border border-[#9EA5AB] py-1 px-3.5 shadow-sm w-[198px]  h-[56px] mb-2">
          <FormLabel className="leading-4.5">
            {label}

            {/* {isRequired && (
              <span className="text-destructive font-semibold">*</span>
            )} */}
          </FormLabel>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>

          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};

export default SwitchElement;
