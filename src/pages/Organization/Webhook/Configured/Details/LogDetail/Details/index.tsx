import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateWebhookProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  data?: any;
}

export function WebHookLogDetails({
  open,
  onOpenChange,
  data,
}: CreateWebhookProps) {
  console.log("Data>", data);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <Button variant={"outline"} className="rounded-[50px] min-w-[85px]">
          View
        </Button>
      </DialogTrigger> */}
      <DialogContent className="min-w-2xl max-h-[800px] overflow-y-scroll">
        <DialogHeader className="flex-col border-b border-[#D9D9D9] px-5 py-1.5">
          <DialogTitle className="text-lg font-semibold p-2">
            Webhook Event Details
          </DialogTitle>
        </DialogHeader>

        <div className="px-5">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Event ID */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Event ID</div>
                <div className="text-base font-semibold">{data?.eventId}</div>
              </div>

              {/* Status */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div className="inline-flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {data?.webhookStatus}
                </div>
              </div>

              {/* Organization */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Webhook Name</div>
                <div className="text-base font-semibold">
                  {data?.webhook?.name ?? "-"}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Transmission ID */}
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Transmission ID
                </div>
                <a
                  href="#"
                  className="text-base text-blue-600 hover:underline font-medium"
                >
                  {data?.transmission?.transmissionId}
                </a>
              </div>

              {/* Webhook Type */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Webhook Type</div>
                <div className="text-base font-semibold">
                  {data?.subEventType}
                </div>
              </div>

              {/* Date Created */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Date Created</div>
                <div className="text-base font-semibold">
                  {new Date(data?.createdAt)
                    .toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace(",", "")}
                </div>
              </div>
            </div>
          </div>

          <div className=" my-7 space-y-2">
            <p className="text-base font-semibold">Target URL</p>
            <div className="rounded-[10px] p-4 bg-[#F7F1FD]">
              {data?.webhook?.targetUrl ?? "-"}
            </div>
          </div>

          <div className=" my-7 space-y-2">
            <p className="text-base font-semibold">Request Payload</p>
            <div className="rounded-[10px] p-4 bg-[#F7F1FD]">
              {JSON.stringify(data?.requestPayload, null, 2)}
            </div>
          </div>
          <div className="my-7 space-y-2">
            <p className="text-base font-semibold">Response</p>

            <div className="rounded-[10px] p-4 bg-[#F7F1FD] text-sm overflow-auto">
              {data?.webhookStatus === "failed" ? (
                <pre className="font-mono">
                  {JSON.stringify(data?.responsePayload, null, 2)}
                </pre>
              ) : data?.webhookStatus === "success" ? (
                <p className="text-green-600 font-medium">Success</p>
              ) : (
                <p>-</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
