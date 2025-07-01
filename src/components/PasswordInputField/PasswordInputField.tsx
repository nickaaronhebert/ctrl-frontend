import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { type PasswordInputFieldProps } from "@/types/global/commonTypes";

const PasswordInputField = ({
  field,
  showPassword,
  togglePassword,
}: PasswordInputFieldProps) => {
  return (
    <div className="relative">
      <Input
        {...field}
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        className="pr-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-200 focus-visible:ring-blue-200"
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default PasswordInputField;
