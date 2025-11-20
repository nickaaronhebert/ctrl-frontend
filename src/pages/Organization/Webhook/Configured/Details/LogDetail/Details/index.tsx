import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateWebhookProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function WebHookLogDetails({ open, onOpenChange }: CreateWebhookProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="rounded-[50px] min-w-[85px]">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl ">
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
                <div className="text-base font-semibold">WH_003</div>
              </div>

              {/* Status */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div className="inline-flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  200
                </div>
              </div>

              {/* Organization */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Event ID</div>
                <div className="text-base font-semibold">WH_003</div>
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
                  TMS_001280
                </a>
              </div>

              {/* Webhook Type */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Webhook Type</div>
                <div className="text-base font-semibold">Tracking Received</div>
              </div>

              {/* Date Created */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Date Created</div>
                <div className="text-base font-semibold">
                  Nov 28, 2025 05:15 PM
                </div>
              </div>
            </div>
          </div>

          <div className=" my-7 space-y-2">
            <p className="text-base font-semibold">Request Payload</p>
            <div className="rounded-[10px] p-4 bg-[#F7F1FD]">
              {JSON.stringify(
                {
                  event: "status_update",
                  transmissionId: "TMS_001280",
                  status: "transmitted",
                  timestamp: "2025-11-2810:30:00Z",
                },
                null,
                1
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
