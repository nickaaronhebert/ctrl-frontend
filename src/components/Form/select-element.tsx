import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BaseOption {
  label: string;
  value: string;
  [key: string]: any; // Allow additional properties
}

interface SelectElementProps
  extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, "onChange"> {
  name: string;
  label?: string;
  description?: string;
  isOptional?: boolean;
  isRequired?: boolean;
  errorClassName?: string;
  placeholder?: string;
  options: BaseOption[];
  triggerClassName?: string;
  onChange?: (value: string) => void;
  // Keys to display (if not provided, shows only 'label')
  displayKeys?: string[];
  // Separator for concatenating fields
  separator?: string;
}

const SelectElement: React.FC<SelectElementProps> = ({
  name,
  label,
  placeholder = "",
  description,
  isOptional,
  options,
  isRequired,
  triggerClassName,
  errorClassName,
  onChange,
  displayKeys = ["label"], // Default to showing only label
  separator = " , ",
  ...props
}) => {
  const { control } = useFormContext();

  const getDisplayText = (option: BaseOption): string => {
    const displayValues = displayKeys
      .map((key) => option[key])
      .filter((value) => value !== null && value !== undefined && value !== "")
      .map((value) => String(value));

    return displayValues.join(separator);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", props.className)}>
          {label && (
            <FormLabel>
              {label}
              {isOptional && (
                <span className="text-neutral-400"> (optional)</span>
              )}
              {isRequired && (
                <span className="text-destructive font-semibold">*</span>
              )}
            </FormLabel>
          )}
          <Select
            onValueChange={(value) => {
              field.onChange(value); // Always update the form field
              onChange?.(value); // Call custom onChange if provided
            }}
            defaultValue={props.defaultValue || field.value}
            disabled={props.disabled}
          >
            <FormControl className={cn("bg-white", props.className)}>
              <SelectTrigger
                className={cn("", triggerClassName)}
                ref={field.ref}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={`${option.value}`}>
                  {getDisplayText(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className={cn("", errorClassName)} />
        </FormItem>
      )}
    />
  );
};

export default SelectElement;
