import type { OrderDetails } from "@/components/data-table/columns/order";

export interface IViewAllOrderInterface {
  data: OrderDetails[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
