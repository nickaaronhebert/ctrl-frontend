import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { MedicationFields } from "./Medication";
// import { SelectProvider } from "@/components/Form/SelectProvider";
import { SelectSubOrganization } from "@/components/Form/SelectSubOrganization";
import { useCallback, useState } from "react";
import type { Address } from "@/types/global/commonTypes";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface CreateEncounterProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function formatAddress(
  address1: string | null,
  address2: string | null,
  city: string | null,
  state: string | null,
  zipcode: string | null
): string {
  return [address1, address2, city, state, zipcode]
    .filter(Boolean) // Removes any falsy values (null, undefined, empty string, etc.)
    .join(", "); // Joins the array with a comma and space
}

export function CreateEncounter({ open, onOpenChange }: CreateEncounterProps) {
  const [createEncounter, { isLoading }] = useCreateEncounterMutation();
  const [patientAddresses, selectedPatientAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [completeAddress, setCompleteAddress] = useState<Address | null>(null);
  const [transmissionMethod, setTransmissionMethod] = useState<string>("");
  const form = useForm<z.infer<typeof createOrgEncounterSchema>>({
    mode: "onTouched",
    resolver: zodResolver(createOrgEncounterSchema),
    defaultValues: {
      output: "",
      patientId: "",
      serviceId: "",
      patient: "",
      service: "",
    },
  });

  const { reset } = form;
  const selectedService = form.watch("service");
  const selectedOutput = form.watch("output");
  async function onSubmit(values: z.infer<typeof createOrgEncounterSchema>) {
    const prescriptions = values?.medications?.map((item) => {
      return {
        quantity: item.quantity,
        // provider: values.selectProvider as string,
        productVariant: item.selectMedication,
        notes: item.sigInstructions,
        instructions: item.sigInstructions,
        daysSupply: item.daysSupply,
        // clinicalDifference: item.clinicalDifference as string
      };
    });

    const payload =
      form.getValues("output") === "ctrl_order_approval"
        ? {
            encounterProduct: values.serviceId!,
            patient: values.patientId!,
            subOrganization: values.subOrganization,
            transmissionMethod: transmissionMethod,
            prescriptions: prescriptions!,
            address: {
              address1: completeAddress?.address1 as string,
              address2: completeAddress?.address2,
              city: completeAddress?.city as string,
              state: completeAddress?.state as string,
              zipcode: completeAddress?.zipcode as string,
              country: completeAddress?.country as string,
              isDefault: completeAddress?.isDefault as boolean,
            },
          }
        : {
            encounterProduct: values.serviceId!,
            patient: values.patientId!,
          };
    await createEncounter(payload)
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

  const setDefaultMedication = useCallback(() => {
    form.setValue("medications", [
      {
        selectMedication: "",
        quantity: 0,
        unit: "",
        sigInstructions: "",
        daysSupply: 1,
        clinicalDifference: "",
      },
    ]);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="px-[20px] py-[5px] min-h-[40px] hover:bg-primary-foreground cursor-pointer rounded-[50px] bg-primary-foreground text-white  font-semibold text-[12px] leading-[16px] ">
          Create Encounter
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl ">
        <DialogHeader className="flex-col border-b border-[#D9D9D9] px-5 py-1.5">
          <DialogTitle className="text-lg font-semibold">
            Create Encounter
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 max-h-[800px] overflow-y-auto overflow-x-hidden">
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
                        onSelect={(displayText, id, address) => {
                          field.onChange(displayText);

                          if (id) {
                            const defaultAddress = address?.filter(
                              (item) => item.isDefault === true
                            )?.[0];

                            form.setValue("patientId", id);

                            selectedPatientAddresses([...address]);
                            setCompleteAddress({ ...defaultAddress });
                            setSelectedAddress(defaultAddress._id);
                          }

                          if (
                            form.getValues("output") === "ctrl_order_approval"
                          ) {
                            setDefaultMedication();
                          } else {
                            form.setValue("medications", []);
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
                        onSelect={(displayText, id, output) => {
                          field.onChange(displayText);
                          if (id) {
                            form.setValue("serviceId", id);
                            form.setValue("output", output);
                            if (output === "ctrl_order_approval") {
                              setDefaultMedication();
                              setTransmissionMethod("manual");
                            } else {
                              form.setValue("medications", undefined);
                              setTransmissionMethod("");
                            }
                          }
                        }}
                      />
                    </FormControl>

                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              {selectedService && selectedOutput === "ctrl_order_approval" && (
                <>
                  <div className=" w-full mb-4">
                    <p className="text-lg font-semibold mb-2">
                      Patient Address <span className="text-red-500">*</span>
                    </p>
                    <RadioGroup
                      value={selectedAddress}
                      onValueChange={(value) => {
                        setDefaultMedication();
                        const address = patientAddresses.filter(
                          (item) => item._id === value
                        )?.[0];

                        setSelectedAddress(value);
                        setCompleteAddress({ ...address });

                        // setCompleteAddress({...value});
                      }}
                      className=""
                    >
                      {patientAddresses?.map((address: Address) => {
                        return (
                          <div
                            className={cn(
                              "flex  justify-between py-4 px-5  w-full border  rounded-2xl",
                              selectedAddress === address._id
                                ? "border-primary"
                                : ""
                            )}
                            key={address._id}
                          >
                            <div className="space-y-3">
                              <Label htmlFor={address._id}>Manual</Label>
                              <p className="text-xs font-normal">
                                {formatAddress(
                                  address.address1,
                                  address?.address2 || null,
                                  address.city,
                                  address.state,
                                  address.zipcode
                                )}
                              </p>
                            </div>
                            <RadioGroupItem
                              value={address._id}
                              id={address._id}
                            />
                          </div>
                        );
                      })}
                      {/* <div >
                            <Label htmlFor="manual">Manual</Label>
                            <p className="text-xs font-normal">
                              After approval, you control when to remit to the
                              pharmacy
                            </p>
                          </div>
                          <RadioGroupItem value="manual" id="manual" /> */}

                      {/* <div
                          className={cn(
                            "flex  justify-between py-4 px-5  w-3xs border  rounded-2xl"
                            // transmissionMethod === "auto" ? "border-primary" : ""
                          )}
                        >
                          <div className="space-y-3">
                            <Label htmlFor="auto-transmitted">
                              Auto transmitted
                            </Label>
                            <p className="text-xs font-normal">
                              After approval, the medications will be sent to
                              the pharmacy
                            </p>
                          </div>
                          <RadioGroupItem value="auto" id="auto-transmitted" />
                        </div> */}
                    </RadioGroup>
                  </div>

                  <MedicationFields state={completeAddress?.state} />
                  {/* <SelectProvider /> */}
                  <SelectSubOrganization />

                  <div className="flex flex-col items-center mb-8">
                    <div className="w-full">
                      <div className="space-y-4">
                        <p className="text-lg font-semibold ">
                          Select Transmission Method
                        </p>
                        <RadioGroup
                          value={transmissionMethod}
                          onValueChange={(value: "manual" | "auto") =>
                            setTransmissionMethod(value)
                          }
                          className="flex"
                        >
                          <div
                            className={cn(
                              "flex py-4 px-5 justify-between w-3xs border  rounded-2xl",
                              transmissionMethod === "manual"
                                ? "border-primary"
                                : ""
                            )}
                          >
                            <div className="space-y-3">
                              <Label htmlFor="manual">Manual</Label>
                              <p className="text-xs font-normal">
                                After approval, you control when to remit to the
                                pharmacy
                              </p>
                            </div>
                            <RadioGroupItem value="manual" id="manual" />
                          </div>
                          <div
                            className={cn(
                              "flex  justify-between py-4 px-5  w-3xs border  rounded-2xl",
                              transmissionMethod === "auto"
                                ? "border-primary"
                                : ""
                            )}
                          >
                            <div className="space-y-3">
                              <Label htmlFor="auto-transmitted">
                                Auto transmitted
                              </Label>
                              <p className="text-xs font-normal">
                                After approval, the medications will be sent to
                                the pharmacy
                              </p>
                            </div>
                            <RadioGroupItem
                              value="auto"
                              id="auto-transmitted"
                            />
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </>
              )}

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
