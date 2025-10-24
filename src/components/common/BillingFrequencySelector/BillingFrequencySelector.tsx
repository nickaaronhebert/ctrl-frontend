import {
  Calendar,
  CalendarDays,
  CalendarMinus as CalendarMonth,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type BillingFrequency = "daily" | "weekly" | "monthly";

interface BillingOption {
  id: BillingFrequency;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const billingOptions: BillingOption[] = [
  {
    id: "daily",
    title: "Daily",
    description: "Invoices generated every day at midnight.",
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    id: "weekly",
    title: "Weekly",
    description: "Invoices generated every Monday at midnight.",
    icon: <CalendarDays className="w-6 h-6" />,
  },
  {
    id: "monthly",
    title: "Monthly",
    description: "Invoices generated on the 1st of each month.",
    icon: <CalendarMonth className="w-6 h-6" />,
  },
];

export function BillingFrequencySelector({ selected, setSelected }: any) {
  return (
    <div className="px-5 pt-4">
      <div className="space-y-3">
        {billingOptions.map((option) => (
          <div
            key={option.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelected(option.id)}
            onKeyDown={(e) => e.key === "Enter" && setSelected(option.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-lg border-1 transition-all ${
              selected === option.id
                ? "border-primary bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div
              className={`flex-shrink-0 p-2 rounded-md ${
                selected === option.id
                  ? "bg-[#F7F1FD] text-primary"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {option.icon}
            </div>

            <div className="flex-1 text-left">
              <h3
                className={`font-semibold text-sm ${
                  selected === option.id ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {option.title}
              </h3>
              <p
                className={`text-sm ${
                  selected === option.id ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {option.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <Checkbox
                checked={selected === option.id}
                onCheckedChange={() => setSelected(option.id)}
                className={`w-6 h-6 ${
                  selected === option.id
                    ? "bg-[#F7F1FD] border-primary"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
