import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useSetActiveStatesMutation } from "@/redux/services/pharmacy";
import { toast } from "sonner";
import useAuthentication from "@/hooks/use-authentication";
import { useState, useEffect } from "react";

interface SwitchFormProps {
  id: string;
  activeStates: Record<string, boolean>;
}

export const activeStates: Record<string, boolean> = {
  Alabama: false,
  Alaska: false,
  Arizona: false,
  Arkansas: false,
  California: false,
  Colorado: false,
  Connecticut: false,
  Delaware: false,
  Florida: false,
  Georgia: false,
  Hawaii: false,
  Idaho: false,
  Illinois: false,
  Indiana: false,
  Iowa: false,
  Kansas: false,
  Kentucky: false,
  Louisiana: false,
  Maine: false,
  Maryland: false,
  Massachusetts: false,
  Michigan: false,
  Minnesota: false,
  Mississippi: false,
  Missouri: false,
  Montana: false,
  Nebraska: false,
  Nevada: false,
  "New Hampshire": false,
  "New Jersey": false,
  "New Mexico": false,
  "New York": false,
  "North Carolina": false,
  "North Dakota": false,
  Ohio: false,
  Oklahoma: false,
  Oregon: false,
  Pennsylvania: false,
  "Rhode Island": false,
  "South Carolina": false,
  "South Dakota": false,
  Tennessee: false,
  Texas: false,
  Utah: false,
  Vermont: false,
  Virginia: false,
  Washington: false,
  "West Virginia": false,
  Wisconsin: false,
  Wyoming: false,
};

const FormSchema = z.object({
  allowedStates: z.record(z.string(), z.boolean()),
});
function SwitchForm({ id, activeStates }: SwitchFormProps) {
  const [setServiceStates] = useSetActiveStatesMutation();
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      allowedStates: activeStates,
    },
  });

  const watchedStates = form.watch("allowedStates");
  console.log("watchedStates", watchedStates);

  useEffect(() => {
    const allStatesSelected = Object.values(watchedStates || {}).every(
      (isSelected) => isSelected === true
    );
    setSelectAll(allStatesSelected);
  }, [watchedStates]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const activeStates = Object.entries(data.allowedStates)
      .filter(([_, isActive]) => isActive) // keep only true
      .map(([stateName]) => stateName);

    await setServiceStates({ allowedStates: activeStates, id })
      .unwrap()
      .then((data) => {
        toast.success(data?.message || "Service States Updated Successfully", {
          duration: 1500,
        });
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 3000,
        });
      });
  }

  const handleSelectAll = (value: boolean) => {
    setSelectAll(value); // update switch UI
    const updatedStates = Object.fromEntries(
      Object.keys(activeStates).map((state) => [state, value])
    );
    form.setValue("allowedStates", updatedStates);
  };

  console.log("selectAll", selectAll);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-6 space-y-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FormLabel className="text-base font-medium">
              {selectAll ? "Deselect All States" : "Select All States"}
            </FormLabel>
            <Switch checked={selectAll} onCheckedChange={handleSelectAll} />
          </div>
          <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {Object.entries(activeStates).map(([stateName, _isActive]) => (
              <FormField
                key={stateName}
                control={form.control}
                name={`allowedStates.${stateName}`} // <-- use stateName instead of index
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-[5px] border border-card-border py-3 px-3.5 shadow-sm w-[240px] bg-[#F6F8F9]">
                    <FormLabel>{stateName}</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end my-2">
          <Button type="submit" variant={"ctrl"} size={"xl"}>
            Save Service States
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function ServiceStates() {
  const { user } = useAuthentication();
  const allStates = { ...activeStates };
  const defaultPharmacies = user?.pharmacy?.allowedStates;

  defaultPharmacies?.map((state) => {
    allStates[state] = true;
  });

  return <SwitchForm id={user?.pharmacy?._id ?? ""} activeStates={allStates} />;
}
