import { useState } from "react";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DateRange } from "react-day-picker";

interface DateFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
}

export function DateFilterDialog({
  open,
  onOpenChange,
  dateRange,
  onDateRangeChange,
}: DateFilterDialogProps) {
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(
    dateRange
  );

  const handleApply = () => {
    onDateRangeChange(tempDateRange);
    onOpenChange(false);
  };

  const handleClearDates = () => {
    setTempDateRange(undefined);
  };

  const handleClose = () => {
    setTempDateRange(dateRange);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0">
        <DialogHeader className="px-6 py-4 pb-0">
          <div className="flex items-center w-full justify-between">
            <DialogTitle className="text-lg font-semibold">
              Filter by date
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-6 w-6 rounded-full hover:bg-gray-100"
            >
              <div className="rounded-full p-1 border border-black">
                <ChevronLeft width={10} height={10} />
              </div>
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4">
          {/* Date Input Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-sm font-medium">
                Start Date
              </Label>
              <Input
                id="start-date"
                placeholder="MM/DD/YYYY"
                value={
                  tempDateRange?.from
                    ? format(tempDateRange.from, "MM/dd/yyyy")
                    : ""
                }
                readOnly
                className="bg-gray-50 border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-sm font-medium">
                End Date
              </Label>
              <Input
                id="end-date"
                placeholder="MM/DD/YYYY"
                value={
                  tempDateRange?.to
                    ? format(tempDateRange.to, "MM/dd/yyyy")
                    : ""
                }
                readOnly
                className="bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Calendar */}
          <div className="flex justify-center">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={tempDateRange?.from}
              selected={tempDateRange}
              onSelect={setTempDateRange}
              numberOfMonths={1}
              className="rounded-md border-0"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="ghost"
              onClick={handleClearDates}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              Clear Dates
            </Button>
            <Button
              onClick={handleApply}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
