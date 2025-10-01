// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
// import SelectElement from "@/components/Form/select-element";

import { useAppDispatch } from "@/redux/store";
import {
  prevStep,
  updateStepThree,
  // type SELECT_DISPENSING,
} from "@/redux/slices/create-order";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SELECT_PATIENT_ADDRESS_PROPS {
  // dispensingAddress: SELECT_DISPENSING;
  // addressList: any;
  selectedMethod: "manual" | "auto";
}
// export const patientAddressSchema = z.object({
//   dispensingAddress: z.string().min(1, "Provider selection is required"),
// });

export default function SelectPatientAddress({
  // dispensingAddress,
  // addressList,
  selectedMethod,
}: SELECT_PATIENT_ADDRESS_PROPS) {
  const dispatch = useAppDispatch();

  const [transmissionMethod, setTransmissionMethod] = useState<
    "manual" | "auto"
  >(selectedMethod);
  // const form = useForm<z.infer<typeof patientAddressSchema>>({
  //   resolver: zodResolver(patientAddressSchema),
  //   defaultValues: {
  //     dispensingAddress: dispensingAddress.address._id,
  //   },
  // });

  // async function onSubmit(values: z.infer<typeof patientAddressSchema>) {
  //   const selectedAddress = addressList?.addresses?.filter(
  //     (address: any) => address._id === values.dispensingAddress
  //   )?.[0];

  //   dispatch(updateStepThree({ address: selectedAddress, transmissionMethod }));
  // }

  // const formattedAddresses = addressList?.addresses?.map((item: any) => ({
  //   label: `${item.address1}, ${item.city.trim()}, ${
  //     item.state
  //   }, ${item.zipcode.trim()}`,
  //   value: item._id,
  // }));

  function handleClick() {
    dispatch(updateStepThree({ transmissionMethod }));
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className=" min-w-[550px] max-w-[550px]">
          <div className="space-y-4">
            <p className="text-xl font-semibold ">Select Transmission Method</p>
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
                  transmissionMethod === "manual" ? "border-primary" : ""
                )}
              >
                <div className="space-y-3">
                  <Label htmlFor="manual">Manual</Label>
                  <p className="text-xs font-normal">
                    After approval, you control when to remit to the pharmacy
                  </p>
                </div>
                <RadioGroupItem value="manual" id="manual" />
              </div>
              <div
                className={cn(
                  "flex  justify-between py-4 px-5  w-3xs border  rounded-2xl",
                  transmissionMethod === "auto" ? "border-primary" : ""
                )}
              >
                <div className="space-y-3">
                  <Label htmlFor="auto-transmitted">Auto transmitted</Label>
                  <p className="text-xs font-normal">
                    After approval, the medications will be sent to the pharmacy
                  </p>
                </div>
                <RadioGroupItem value="auto" id="auto-transmitted" />
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-10 border-t border-card-border border-dashed pt-10">
        <Button
          type="button"
          variant={"outline"}
          onClick={() => dispatch(prevStep())}
          className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold cursor-pointer"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={handleClick}
          // disabled={!form.formState.isValid}
          className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold text-white cursor-pointer"
        >
          Next
        </Button>
      </div>

      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div>
            <div className="flex flex-col items-center">
              <div className=" min-w-[550px] max-w-[550px]">
                <p className="text-[20px] font-semibold">
                  Select Provider & Pharmacy
                </p>

                <div className="mt-3.5">
                  <SelectElement
                    name="dispensingAddress"
                    options={formattedAddresses || []}
                    label="Select Dispensing"
                    isRequired={true}
                    className="w-[525px] min-h-[56px]"
                    placeholder="Select the option"
                  />
                </div>

                <div className="space-y-4">
                  <p className="text-xl font-semibold ">Select Transmission</p>
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
                        transmissionMethod === "manual" ? "border-primary" : ""
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
                        transmissionMethod === "auto" ? "border-primary" : ""
                      )}
                    >
                      <div className="space-y-3">
                        <Label htmlFor="auto-transmitted">
                          Auto transmitted
                        </Label>
                        <p className="text-xs font-normal">
                          After approval, the medications will be sent to the
                          pharmacy
                        </p>
                      </div>
                      <RadioGroupItem value="auto" id="auto-transmitted" />
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-10 border-t border-card-border border-dashed pt-10">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => dispatch(prevStep())}
                className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold cursor-pointer"
              >
                Back
              </Button>

              <Button
                type="submit"
                disabled={!form.formState.isValid}
                className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold text-white cursor-pointer"
              >
                Next
              </Button>
            </div>
          </div>
        </form>
      </Form> */}
    </div>
  );
}
