import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createOrgEncounterSchema } from "@/schemas/createEncounter";
import { useForm } from "react-hook-form";
import type z from "zod";
import { PatientSearch } from "./SelectPatient";
import { ServiceSearch } from "./SelectService";
import { useCreateEncounterMutation } from "@/redux/services/encounter";
import { toast } from "sonner";

interface CreateEncounterProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateEncounter({ open, onOpenChange }: CreateEncounterProps) {
  const [createEncounter, { isLoading }] = useCreateEncounterMutation();
  const form = useForm<z.infer<typeof createOrgEncounterSchema>>({
    mode: "onTouched",
    resolver: zodResolver(createOrgEncounterSchema),
    defaultValues: {
      patientId: "",
      serviceId: "",
      patient: "",
      service: "",
    },
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof createOrgEncounterSchema>) {
    await createEncounter({
      encounterProduct: values.serviceId!,
      patient: values.patientId!,
    })
      .unwrap()
      .then((data) => {
        toast.success(data?.message || "Encounter Created Successfully", {
          duration: 1500,
        });

        reset();
        onOpenChange?.(false);
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 3000,
        });
      });
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="px-[20px] py-[5px] min-h-[40px] hover:bg-primary-foreground cursor-pointer rounded-[50px] bg-primary-foreground text-white  font-semibold text-[12px] leading-[16px] ">
          Create Encounter
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[500px]">
        <DialogHeader className="flex-col border-b border-[#D9D9D9] px-5 py-1.5">
          <DialogTitle className="text-lg font-semibold">
            Create Encounter
          </DialogTitle>
        </DialogHeader>

        <div className="px-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="patient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="patient">
                      Patient <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <PatientSearch
                        selectedPatient={field.value}
                        onSelect={(displayText, id) => {
                          field.onChange(displayText);
                          if (id) {
                            form.setValue("patientId", id);
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="service">
                      Service <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <ServiceSearch
                        selectedService={field.value}
                        onSelect={(displayText, id) => {
                          field.onChange(displayText);
                          if (id) {
                            form.setValue("serviceId", id);
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              <div className="rounded-[10px] p-4 bg-[#E5F3FC] space-y-4">
                <p className="text-sm font-semibold text-[#008CE3]">
                  What happens after creation:
                </p>
                <p className="text-xs font-normal text-[#008CE3]">
                  After you create the encounter, an intake link will be sent to
                  the patient via <span className="font-medium">SMS</span> and{" "}
                  <span className="font-medium">Email</span> to complete.
                </p>

                <p className="text-xs font-normal text-[#008CE3]">
                  Once the Encounter is reviewed and completed, any documents or
                  prescriptions will be available on the Encounter screen.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 mt-10 pb-4 px-4">
                <Button
                  onClick={() => {
                    form.reset();
                    onOpenChange?.(false);
                  }}
                  variant={"transparent"}
                  type="button"
                  // to={"#"}
                  className="rounded-full border border-[#3E4D61] text-center py-2.5 px-6 min-h-12 min-w-32"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full text-white cursor-pointer py-2.5 px-6 min-h-12 min-w-32"
                >
                  Create & Send
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
