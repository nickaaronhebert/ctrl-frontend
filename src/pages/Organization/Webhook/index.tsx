import { CreateWebhook } from "./Create";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ConfiguredWebhooks from "./Configured";
import EventLogs from "./EventLogs";

export default function Webhook() {
  const [openCreateWebhook, setOpenCreateWebhook] = useState(false);
  const [activeState, setActiveState] = useState<
    "configured_webhook" | "event_logs"
  >("configured_webhook");
  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div>
          <h6 className="text-2xl font-semibold">Webhooks</h6>
          <p className="text-sm font-normal text-[#3E4D61]">
            Manage webhooks sent to external systems · Events auto-deleted after
            30 days
          </p>
        </div>
        <CreateWebhook
          open={openCreateWebhook}
          onOpenChange={setOpenCreateWebhook}
        />
      </div>

      <div>
        <div className="flex gap-1.5 mt-4">
          <div
            className={cn(
              "min-w-[230px] rounded-tl-[10px] rounded-tr-[10px] py-3.5 px-4 cursor-pointer ",
              activeState === "configured_webhook"
                ? "bg-primary text-white"
                : "bg-[#BEC9D53D]"
            )}
            onClick={() => setActiveState("configured_webhook")}
          >
            <h6 className="text-sm font-medium text-center">
              Configured Webhooks
            </h6>
          </div>

          <div
            className={cn(
              "min-w-[230px] rounded-tl-[10px] rounded-tr-[10px]  py-3.5 px-4 cursor-pointer",
              activeState === "event_logs"
                ? "bg-primary text-white"
                : "bg-[#BEC9D53D]"
            )}
            onClick={() => setActiveState("event_logs")}
          >
            <h6 className="text-sm font-medium text-center">Event Logs</h6>
          </div>
        </div>
        <div className="">
          {activeState === "configured_webhook" && <ConfiguredWebhooks />}
          {activeState === "event_logs" && <EventLogs />}
        </div>
      </div>
    </div>
  );
}
