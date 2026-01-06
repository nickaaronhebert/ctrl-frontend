import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import InputField from "../InputField/InputField";
import { toast } from "sonner";
import type { ApiError } from "@/types/global/commonTypes";
import {
  Carrier,
  ServiceType,
  shippingSchema,
  type ShippingFormValues,
} from "@/schemas/shippingSchema";
import SelectElement from "@/components/Form/select-element";
import { Switch } from "@/components/ui/switch";
import { useCreateShippingClassMutation } from "@/redux/services/shipping";

interface CreateShippingDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface SwitchFieldProps {
  control: any;
  name: string;
  label: string;
  description?: string;
}

const carrierOptions = Object.values(Carrier).map((c) => ({
  label: c,
  value: c,
}));

const serviceTypeOptions = Object.values(ServiceType).map((s) => ({
  label: s,
  value: s,
}));

function SwitchField({ control, name, label, description }: SwitchFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center justify-between rounded-[5px] border border-[#D9D9D9] bg-[#F6F8F9] p-[15px] py-[12px]">
          <div className="space-y-1">
            <p className="text-sm font-medium">{label}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        </div>
      )}
    ></FormField>
  );
}

export default function CreateShippingDialog({
  open,
  onOpenChange,
}: CreateShippingDialogProps) {
  const [createShippingClassMutation, { isLoading }] =
    useCreateShippingClassMutation();
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: "",
      carrier: "UPS",
      serviceType: "Standard",
      price: 0,
      carrierProductCode: "",
      deliveryWindow: "",
      serviceOptions: {
        refrigerated: false,
        hazmat: false,
        weekendDelivery: false,
        saturdayPickup: false,
        holdAtLocation: false,
        signatureRequired: false,
        signatureType: "NONE",
        tempMonitor: false,
        oversize: false,
      },
    },
  });

  async function onSubmit(values: ShippingFormValues) {
    try {
      console.log("values", values);
      await createShippingClassMutation({
        name: values.name,
        services: {
          carrier: values.carrier,
          serviceType: values.serviceType,
          price: values.price,
          carrierProductCode: values.carrierProductCode,
          deliveryWindow: values.deliveryWindow,
          signatureType: "NONE",
          refrigerated: values.serviceOptions.refrigerated,
          tempMonitor: values.serviceOptions.tempMonitor,
          weekendDelivery: values.serviceOptions.weekendDelivery,
          saturdayPickup: values.serviceOptions.saturdayPickup,
          holdAtLocation: values.serviceOptions.holdAtLocation,
          hazmat: values.serviceOptions.hazmat,
          oversize: values.serviceOptions.oversize,
        },
      });
    } catch (error: unknown) {
      console.error("Shipping creation failed", error);

      let message = "An unexpected error occurred";

      if (typeof error === "object" && error !== null && "data" in error) {
        const data = (error as ApiError).data;

        if (Array.isArray(data?.message)) {
          message = data.message[0];
        } else if (typeof data?.message === "string") {
          message = data.message;
        }
      }

      toast.error(message, {
        duration: 1500,
      });
    }
  }

  function onCancel() {
    form.reset();
    onOpenChange?.(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[630px] rounded-[15px] max-h-[800px] overflow-y-auto">
        <DialogHeader className="flex px-[20px] py-[16px] justify-between items-center border border-b-gray-200 border-t-0 border-l-0 border-r-0">
          <DialogTitle className="text-lg font-medium">
            Create Shipping Class
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-2 items-center">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <InputField
                      {...field}
                      name="name"
                      label="Service Name"
                      type="text"
                      className="border w-[280px] border-gray-200 min-h-[52px] placeholder:text-black"
                      placeholder="Enter your firstname"
                      required
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="carrier"
                  render={({ field }) => (
                    <SelectElement
                      {...field}
                      label="Carrier"
                      options={carrierOptions}
                      placeholder="Select Carrier"
                      className="w-[280px] min-h-[52px]"
                      isRequired
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <SelectElement
                      {...field}
                      label="Service Type"
                      options={serviceTypeOptions}
                      placeholder="Select Service Type"
                      className="w-[280px] min-h-[52px] mt-0.5"
                      isRequired
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Price ($)"
                      type="number"
                      placeholder="0.00"
                      className="border w-[280px] border-gray-200 min-h-[52px] placeholder:text-black"
                      required
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <FormField
                  control={form.control}
                  name="carrierProductCode"
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Carrier Product Code"
                      placeholder="Eg. UPS-STD-01"
                      className="border w-[280px] border-gray-200 min-h-[52px] placeholder:text-black"
                      required
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryWindow"
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Delivery Window / SLA"
                      placeholder="Eg. 3 - 5 business days"
                      className="border w-[280px] border-gray-200 min-h-[52px] placeholder:text-black"
                      required
                    />
                  )}
                />
              </div>
              <div className="pt-4">
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  Service Options
                </h3>

                <div className="space-y-3">
                  <SwitchField
                    control={form.control}
                    name="serviceOptions.signatureRequired"
                    label="Signature Required"
                    description="Recipient must sign for delivery"
                  />

                  <SwitchField
                    control={form.control}
                    name="serviceOptions.refrigerated"
                    label="Refrigerated"
                    description="Temperature-controlled shipping"
                  />

                  <SwitchField
                    control={form.control}
                    name="serviceOptions.tempMonitor"
                    label="Temperature Monitor"
                    description="Include temperature controlled device"
                  />

                  <SwitchField
                    control={form.control}
                    name="serviceOptions.weekendDelivery"
                    label="Weekend Delivery"
                    description="Deliver on Saturday/Sunday"
                  />

                  <SwitchField
                    control={form.control}
                    name="serviceOptions.saturdayPickup"
                    label="Saturday Pickup"
                    description="Available for Saturday pickup"
                  />

                  <SwitchField
                    control={form.control}
                    name="serviceOptions.holdAtLocation"
                    label="Hold at Location"
                    description="Hold for customer pickup"
                  />

                  <SwitchField
                    control={form.control}
                    name="serviceOptions.hazmat"
                    label="Hazmat"
                    description="Hazardous materials handling"
                  />

                  <SwitchField
                    control={form.control}
                    name="serviceOptions.oversize"
                    label="Oversize/Overweight"
                    description="Large or heavy package"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="min-w-[150px] min-h-[52px] cursor-pointer rounded-[50px] border border-black px-[30px] py-[10px] "
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="min-w-[150px] cursor-pointer min-h-[52px] rounded-[50px] border border-primary px-[30px] py-[10px] bg-primary text-white"
                >
                  Create Shipping Class
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
