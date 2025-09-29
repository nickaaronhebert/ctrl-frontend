import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { subDays, subWeeks, subMonths, format } from "date-fns";
import type { Period } from "@/types/global/commonTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const strongPassword = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: "Password must contain at least one special character",
  });

export function formatDateMMDDYYYY(dateString: string) {
  const date = new Date(dateString);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export function convertExtendedDate(
  value: string,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }
): string {
  const date = new Date(value);
  return date.toLocaleString(locale, options);
}

export const getStartDate = (period: Period) => {
  const now = new Date();
  if (period === "day") return format(subDays(now, 1), "yyyy-MM-dd");
  if (period === "week") return format(subWeeks(now, 1), "yyyy-MM-dd");
  if (period === "month") return format(subMonths(now, 1), "yyyy-MM-dd");
};

export const labels = {
  left: {
    title: "Day",
    value: "day",
  },
  right: {
    title: "Month",
    value: "month",
  },
  center: {
    title: "Week",
    value: "week",
  },
};

interface TransmissionStats {
  status: "Created" | "Queued" | "Transmitted" | "Failed";
  count: number;
}

export const getStatusCounts = (
  stats: TransmissionStats[] = []
): Record<"created" | "queued" | "transmitted" | "failed", number> => {
  console.log("MY Stats>>>>>>>>>>>>>>>>>>>>>", stats);
  const lookup = stats.reduce((acc, item) => {
    acc[item.status] = item.count;
    return acc;
  }, {} as Record<string, number>);

  return {
    created: lookup["Created"] || 0,
    queued: lookup["Queued"] || 0,
    transmitted: lookup["Transmitted"] || 0,
    failed: lookup["Failed"] || 0,
  };
};
