import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputElementProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  isOptional?: boolean;
  isRequired?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  messageClassName?: string;
}

const InputElement: React.FC<InputElementProps> = ({
  name,
  label,
  placeholder,
  description,
  isOptional,
  isRequired,
  labelClassName,
  inputClassName,
  messageClassName,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", props.className)}>
          {label && (
            <FormLabel className={cn("", labelClassName)}>
              {label}
              {isOptional && (
                <span className="text-neutral-400"> (optional)</span>
              )}
              {isRequired && (
                <span className="text-destructive font-semibold">*</span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className={cn("", inputClassName)}
              type={props.type || "text"}
              disabled={props.disabled}
              value={props.value || field.value}
              autoComplete={props.autoComplete}
              onChange={field.onChange}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className={cn("", messageClassName)} />
        </FormItem>
      )}
    />
  );
};

export default InputElement;
