import { useDataTable } from "@/hooks/use-data-table";
import { pharmacyVariantColumns } from "@/components/data-table/columns/pharmacy-columns";
import { DataTable } from "@/components/data-table/data-table";
import { useMemo } from "react";
import type { ProductVariantEntry } from "@/types/responses/pharmacy";

export function PharmacyVariantTable({
  variants,
}: {
  variants: ProductVariantEntry[];
}) {
  const columns = useMemo(() => pharmacyVariantColumns(), []);

  const { table } = useDataTable({
    data: variants || [],
    columns,
    pageCount: -1,
  });

  return <DataTable table={table} />;
}
