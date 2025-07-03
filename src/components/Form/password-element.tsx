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
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface PasswordInputElementProps
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

const PasswordInputElement: React.FC<PasswordInputElementProps> = ({
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
  const [showPassword, setShowPassword] = useState(false);

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
            <div className="relative">
              <Input
                {...field}
                placeholder={placeholder}
                className={cn("", inputClassName)}
                type={showPassword ? "text" : "password"}
                disabled={props.disabled}
                value={props.value || field.value}
                autoComplete={props.autoComplete}
                onChange={field.onChange}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className={cn("", messageClassName)} />
        </FormItem>
      )}
    />
  );
};

export default PasswordInputElement;
