import { ArrowLeft } from "lucide-react";
import Logs from "./Logs";

export default function ConfiguredWebhookDetails() {
  return (
    <div>
      <div className="flex justify-between bg-[#EFE8F5] p-5">
        <div>
          <div className="flex gap-2 items-center">
            <ArrowLeft stroke="#63627F" size={16} />

            <p className="text-sm font-normal text-[#63627F]">
              {" "}
              Back to Webhooks
            </p>
          </div>
          <h6 className="text-2xl font-semibold mt-1">
            {" "}
            Patient Portal Webhook
          </h6>
        </div>
        {/* <CreateWebhook
                  open={openCreateWebhook}
                  onOpenChange={setOpenCreateWebhook}
        /> */}
      </div>

      <div className="p-8">
        <div className="p-5 bg-white shadow-[0px_2px_40px_0px_#00000014] rounded-md">
          <div className="p-3.5 bg-[#F7F1FD] space-y-3">
            <div className="flex justify-between">
              <p className="text-sm font-normal">Webhook ID</p>
              <p className="text-sm font-medium">WH_CONFIG_001</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm font-normal">Target URL</p>
              <p className="text-sm font-medium text-primary">
                https://erp.redvalley.com/api/webhooks/pharmacy
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm font-normal">Authentication</p>
              <p className="text-sm font-medium">Basic Authentication</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm font-normal">Created Date</p>
              <p className="text-sm font-medium text-gray-500">
                Nov 15, 2025, 04:30 PM
              </p>
            </div>
          </div>

          <Logs />
        </div>
      </div>
    </div>
  );
}
