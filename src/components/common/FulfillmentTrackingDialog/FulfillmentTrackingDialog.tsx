import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FulfillmentHeader } from "../Card/fulfillment-header";
import { FulfillmentTimeline } from "../Card/fullfillment-timeline";
import { useViewTransmissionFulfillmentDetailQuery } from "@/redux/services/transmission";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { buildTimeline } from "@/lib/utils";

interface FulfillmentTrackingDialogProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FulfillmentTrackingDialog({
  id,
  open,
  onOpenChange,
}: FulfillmentTrackingDialogProps) {
  const { data, isLoading } = useViewTransmissionFulfillmentDetailQuery(id!, {
    skip: !open || !id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-3xl p-4">
        <DialogHeader>
          <DialogTitle>Fulfillment Tracking</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-6">
          <FulfillmentHeader data={data} />
          <FulfillmentTimeline
            timeline={buildTimeline(
              (data?.data?.pharmacyTracking ?? {}) as Record<
                string,
                string | null
              >
            )}
          />
        </div>
        <div className="flex justify-center pt-6 border-t">
          <Button
            variant="outline"
            className="rounded-full px-8 py-2"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
