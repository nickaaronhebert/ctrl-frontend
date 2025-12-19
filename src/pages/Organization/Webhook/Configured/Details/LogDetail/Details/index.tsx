import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { WebhookEvent } from "@/types/responses/IEventLog";
import { useReplayWebhookServiceMutation } from "@/redux/services/webhook";
import { toast } from "sonner";

interface CreateWebhookProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  data?: WebhookEvent;
}

export function WebHookLogDetails({
  open,
  onOpenChange,
  data,
}: CreateWebhookProps) {
  const [replayWebhook, { isLoading }] = useReplayWebhookServiceMutation();

  const handleReplay = async () => {
    if (!data?._id) return;
    try {
      await replayWebhook({ eventId: data._id }).unwrap();
      toast.success("Webhook replay triggered successfully");
      onOpenChange?.(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "Failed to replay webhook. Please try again."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-3xl max-h-[800px] overflow-y-auto">
        <DialogHeader className="flex-col border-b border-[#D9D9D9] px-5 py-1.5">
          <DialogTitle className="text-lg font-semibold p-2">
            Webhook Event Details
          </DialogTitle>
        </DialogHeader>

        <div className="px-5">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Event ID</div>
                <div className="text-base font-semibold">{data?.eventId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div
                  className={`inline-flex items-center ${
                    data?.webhookStatus === "success"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }  text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {data?.webhookStatus}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Webhook Name</div>
                <div className="text-base font-semibold">
                  {data?.webhook?.name ?? "-"}
                </div>
              </div>
            </div>
            <div className="space-y-6">
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
              <div>
                <div className="text-sm text-gray-500 mb-1">Type</div>
                <div className="text-base font-semibold">
                  {data?.subEventType} ({data?.pharmacy?.name ?? "-"})
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Date Created</div>
                <div className="text-base font-semibold">
                  {data?.createdAt
                    ? new Date(data.createdAt)
                        .toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(",", "")
                    : "-"}
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
            <pre className="rounded-[10px] p-4 bg-[#F7F1FD] text-sm whitespace-pre-wrap">
              {JSON.stringify(data?.requestPayload, null, 2)}
            </pre>
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
        <DialogFooter className="p-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          {!data?.parentEventId && data?.webhookStatus === "failed" && (
            <Button
              disabled={isLoading}
              onClick={handleReplay}
              className="text-white"
              type="submit"
            >
              Replay
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
