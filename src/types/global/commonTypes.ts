export interface User {
  id: string;
  name: string;
  email: string;
  role: "internalAdmin" | "orgAdmin" | "provider";
  orgId?: string;
  metadata?: {
    npi?: string;
    dea?: string;
    stateLicenses?: string[];
  };
  status?: "invited" | "active";
}

// Password Input Component with Toggle
export interface PasswordInputFieldProps {
  field: React.InputHTMLAttributes<HTMLInputElement>;
  showPassword: boolean;
  togglePassword: () => void;
}
