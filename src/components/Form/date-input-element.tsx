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

interface DateInputElementProps
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

const DateInputElement: React.FC<DateInputElementProps> = ({
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
      render={({ field }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let val = e.target.value;
          const prevVal = field.value || "";

          // allow only digits and "/"
          val = val.replace(/[^\d/]/g, "");

          // typing forward
          if (val.length > prevVal.length) {
            if (val.length === 2 && !val.includes("/")) {
              val = val + "/";
            } else if (val.length === 5 && val.split("/").length < 3) {
              val = val + "/";
            }
          }

          // limit to 10 chars
          if (val.length > 10) val = val.slice(0, 10);

          field.onChange(val);
        };

        // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //   let val = e.target.value;

        //   // allow only digits and "/"
        //   val = val.replace(/[^\d/]/g, "");

        //   // auto-insert slashes
        //   if (val.length === 2 && !val.includes("/")) {
        //     val = val + "/";
        //   } else if (val.length === 5 && val.split("/").length < 3) {
        //     val = val + "/";
        //   }

        //   // limit to 10 chars
        //   if (val.length > 10) val = val.slice(0, 10);

        //   field.onChange(val); // ✅ safe here, since `field` is in scope
        // };
        return (
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
                // value={field.value || ""}
                onChange={handleChange}
                placeholder={placeholder}
                className={cn("", inputClassName)}
                type={props.type || "text"}
                disabled={props.disabled}
                maxLength={10}
                autoComplete={props.autoComplete}
                readOnly={props.readOnly}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage className={cn("", messageClassName)} />
          </FormItem>
        );
      }}
    />
  );
};

export default DateInputElement;
