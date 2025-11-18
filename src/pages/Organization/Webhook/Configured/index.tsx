// import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { webhookColumns } from "@/components/data-table/columns/webhook";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

export type WebhookColumns = {
  name: string;
  targetUrl: string;
  authType: string;
  events: number;
  status: string;
  lastTriggered: string;
};

const mockData: WebhookColumns[] = [
  {
    name: "Order Created Webhook",
    targetUrl: "https://api.example.com/webhooks/order-created",
    authType: "API_KEY",
    events: 12,
    status: "active",
    lastTriggered: "2025-01-12T10:23:45Z",
  },
  {
    name: "User Signup Webhook",
    targetUrl: "https://hooks.example.com/user-signup",
    authType: "BASIC_AUTH",
    events: 5,
    status: "active",
    lastTriggered: "2025-01-15T08:12:10Z",
  },
  {
    name: "Payment Success Webhook",
    targetUrl: "https://webhooks.example.com/payment-success",
    authType: "NONE",
    events: 30,
    status: "failed",
    lastTriggered: "2025-01-10T14:45:00Z",
  },
  {
    name: "Inventory Low Webhook",
    targetUrl: "https://api.store.com/hooks/inventory-low",
    authType: "API_KEY",
    events: 3,
    status: "active",
    lastTriggered: "2025-01-14T09:33:12Z",
  },
  {
    name: "Shipment Update Webhook",
    targetUrl: "https://logistics.example.com/webhook/shipment-update",
    authType: "BASIC_AUTH",
    events: 18,
    status: "inactive",
    lastTriggered: "2024-12-30T16:22:51Z",
  },
  {
    name: "Refund Processed Webhook",
    targetUrl: "https://finance.example.com/hooks/refund",
    authType: "NONE",
    events: 9,
    status: "active",
    lastTriggered: "2025-01-11T11:10:05Z",
  },
  {
    name: "Subscription Renewal Webhook",
    targetUrl: "https://saas.example.com/webhooks/subscription-renewal",
    authType: "API_KEY",
    events: 20,
    status: "active",
    lastTriggered: "2025-01-16T07:55:12Z",
  },
  {
    name: "Email Delivered Webhook",
    targetUrl: "https://mailer.example.com/hooks/email-delivered",
    authType: "NONE",
    events: 50,
    status: "failed",
    lastTriggered: "2025-01-05T18:40:30Z",
  },
  {
    name: "Account Deleted Webhook",
    targetUrl: "https://users.example.com/hooks/account-deleted",
    authType: "BASIC_AUTH",
    events: 2,
    status: "inactive",
    lastTriggered: "2024-12-29T12:10:00Z",
  },
  {
    name: "Product Updated Webhook",
    targetUrl: "https://catalog.example.com/webhook/product-updated",
    authType: "API_KEY",
    events: 15,
    status: "active",
    lastTriggered: "2025-01-13T15:24:40Z",
  },
];

export default function ConfiguredWebhooks() {
  // const [searchParams] = useSearchParams();
  // const page = parseInt(searchParams.get("page") || "1", 10);
  // const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);

  const columns = useMemo(() => webhookColumns(), []);
  const { table } = useDataTable({
    data: mockData || [],
    columns,
    // filterFields,
    pageCount: 1,
  });
  return (
    <div className="p-2.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
      <div className=" ">
        <DataTable table={table} headerClass={false} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
