import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { subDays, subWeeks, subMonths, format } from "date-fns";
import type { Period } from "@/types/global/commonTypes";
import type { SupplyFormValues } from "@/schemas/supplySchema";
import { STATUS_CONFIG } from "@/components/data-table/columns/transmission-fulfillment";

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

export function toStartOfDayUTC(date: Date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString();
}

export function toEndOfDayUTC(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    )
  ).toISOString();
}

export function isISODateString(str: string) {
  const isoRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?Z?)?$/;
  return isoRegex.test(str);
}

export function sortMedicationCatalogue(data: any[]) {
  if (!Array.isArray(data)) return [];

  return [...data]
    .sort((a, b) =>
      a.medicationCatalogue.drugName?.localeCompare(
        b.medicationCatalogue.drugName,
        undefined,
        { numeric: true, sensitivity: "base" }
      )
    )
    .map((item) => ({
      ...item,
      productVariant: [...item.productVariant].sort((a, b) =>
        a.productVariant?.name?.localeCompare(
          b.productVariant?.name,
          undefined,
          { numeric: true, sensitivity: "base" }
        )
      ),
    }));
}

export function toSupplyFormValues(supply: any): SupplyFormValues {
  return {
    id: supply.id,
    name: supply.name,
    sku: supply.sku,
    price: supply.price,
    itemType: supply.itemType,
    quantity: supply.quantity,
    quantityType: supply.quantityType,
    defaultUnitCount: supply.defaultUnitCount,
    configMode: supply.configMode,
  };
}
export function formatDate(isoDateString: string): string {
  const date: Date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

export function formattedDate(date: string | Date) {
  const d = new Date(date);

  return d.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function buildTimeline(tracking: Record<string, string | null>): any[] {
  console.log("Tracking", tracking);
  return Object.entries(tracking)
    .filter(([, value]) => value)
    .map(([key, value]) => ({
      id: key,
      status: STATUS_CONFIG[key]?.status ?? key,
      description: STATUS_CONFIG[key]?.description ?? "",
      icon: STATUS_CONFIG[key]?.icon ?? "default",
      style: STATUS_CONFIG[key]?.style ?? "",
      timestamp: formattedDate(value!),
      rawDate: new Date(value!),
    }))
    .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
}
