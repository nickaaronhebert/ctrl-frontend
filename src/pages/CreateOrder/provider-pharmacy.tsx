import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SelectElement from "@/components/Form/select-element";
import { providerPharmacySchema } from "@/schemas/pharmacySchema";
import { useAppDispatch } from "@/redux/store";
import {
  prevStep,
  updateStepTwo,
  type SELECT_PROVIDER_PHARMACY,
} from "@/redux/slices/create-order";
import { useViewAffiliateProvidersQuery } from "@/redux/services/provider";
import { useCallback, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

const pharmacyOptions = [
  {
    label: "rajan pharmacy",
    value: "bsns::aad88c0b-a1d6-405b-a019-2452b325be2b/rajan pharmacy",
  },
];

export default function SelectProviderPharmacy({
  providerPharmacy,
}: {
  providerPharmacy: SELECT_PROVIDER_PHARMACY;
}) {
  const [providerQuery, setProviderQuery] = useState("");
  const debouncedProviderQuery = useDebounce(providerQuery, 400);
  const dispatch = useAppDispatch();
  const { data: providerOptions } = useViewAffiliateProvidersQuery(
    { page: 1, perPage: 100, q: debouncedProviderQuery },
    {
      selectFromResult: ({ data }) => ({
        data:
          data?.data?.map((item) => ({
            value: `${item.id}/${item.firstName} ${item.lastName}`,
            label: `${item.firstName} ${item.lastName}`,
          })) ?? [],
      }),
    }
  );
  const form = useForm<z.infer<typeof providerPharmacySchema>>({
    resolver: zodResolver(providerPharmacySchema),
    defaultValues: {
      selectProvider: providerPharmacy.selectProvider,
      selectPharmacy: providerPharmacy.selectPharmacy,
    },
  });

  async function onSubmit(values: z.infer<typeof providerPharmacySchema>) {
    console.log("step 2 values", values);

    dispatch(updateStepTwo(values));
  }

  const handleSearchProvider = useCallback((value: string) => {
    setProviderQuery(value);
  }, []);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div>
            <div className="flex flex-col items-center">
              <div className=" min-w-[550px] max-w-[550px]">
                <p className="text-[20px] font-semibold">
                  Select Provider & Pharmacy
                </p>

                <div className="mt-3.5">
                  <SelectElement
                    name="selectProvider"
                    options={providerOptions}
                    label="Select Provider"
                    isRequired={true}
                    className="w-[500px] min-h-[56px]"
                    placeholder="Select the option"
                    onSearch={handleSearchProvider}
                    searchValue={providerQuery}
                  />

                  <SelectElement
                    name="selectPharmacy"
                    options={pharmacyOptions}
                    label="Select Pharmacy"
                    isRequired={true}
                    className="w-[500px] min-h-[56px]"
                    placeholder="Select the option"
                  />
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
      </Form>
    </div>
  );
}
