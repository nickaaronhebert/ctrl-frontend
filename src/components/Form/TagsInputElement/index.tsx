import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { TagsInput } from "./tags-input";
import { useFormContext } from "react-hook-form";

interface TagsInputProps {
  name: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  type: React.HTMLInputTypeAttribute;
  width?: string;
}

const TagsInputElement: React.FC<TagsInputProps> = ({
  name,
  label,
  isRequired,
  type,
  placeholder,
  width = "w-[620px]",
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}

            {isRequired && (
              <span className="text-destructive font-semibold">*</span>
            )}
          </FormLabel>
          <FormControl>
            <TagsInput
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
              width={`w-[${width}]`}
              inputType={type}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TagsInputElement;
