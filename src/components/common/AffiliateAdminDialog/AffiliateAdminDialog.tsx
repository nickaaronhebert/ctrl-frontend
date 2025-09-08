"use client";

import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Affiliate {
  id: string;
  name: string;
}

interface AffiliateFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  affiliates: Affiliate[];
  selectedAffiliates: string[];
  onSelectedAffiliatesChange: (selected: string[]) => void;
}

interface FormData {
  selectedIds: string[];
}

export function AffiliateAdminDialog({
  open,
  onOpenChange,
  affiliates,
  selectedAffiliates,
  onSelectedAffiliatesChange,
}: AffiliateFilterDialogProps) {
  const { handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      selectedIds: selectedAffiliates,
    },
  });

  const watchedSelectedIds = watch("selectedIds") || [];

  const handleCheckboxChange = (affiliateId: string, checked: boolean) => {
    const currentSelected = watchedSelectedIds;
    if (checked) {
      setValue("selectedIds", [...currentSelected, affiliateId]);
    } else {
      setValue(
        "selectedIds",
        currentSelected.filter((id) => id !== affiliateId)
      );
    }
  };

  const handleDeselectAll = () => {
    setValue("selectedIds", []);
  };

  const onSubmit = (data: FormData) => {
    onSelectedAffiliatesChange(data.selectedIds);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-white">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Filter by Affiliates
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        {/* Subheader */}
        <div className="flex items-center justify-between px-6 pb-4">
          <span className="text-sm text-gray-600">
            {watchedSelectedIds.length} of {affiliates.length} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeselectAll}
            className="h-auto p-0 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-transparent uppercase tracking-wide"
          >
            DESELECT ALL
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Affiliate List */}
          <div className="px-6 pb-6 space-y-3 max-h-80 overflow-y-auto">
            {affiliates.map((affiliate) => {
              const isChecked = watchedSelectedIds.includes(affiliate.id);
              return (
                <div key={affiliate.id} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 bg-blue-100">
                    <AvatarFallback className="text-blue-600 font-medium text-sm">
                      {affiliate.name}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {affiliate.name}
                  </span>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(affiliate.id, checked as boolean)
                    }
                    className="h-5 w-5 rounded border-2 border-gray-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  />
                </div>
              );
            })}
          </div>

          {/* Apply Button */}
          <div className="px-6 pb-6">
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg"
            >
              Apply
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
