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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      allowedStates: activeStates,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);

    const activeStates = Object.entries(data.allowedStates)
      .filter(([_, isActive]) => isActive) // keep only true
      .map(([stateName]) => stateName);

    console.log("activeStates", activeStates);

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-6 space-y-6"
      >
        <div>
          {/* <p className="text-[14px] font-medium">Selected Service Areas</p> */}
          {/* <h3 className="mb-4 text-lg font-medium">Email Notifications</h3> */}
          <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* {allowedStates.map((state, index) => (
              <FormField
                key={state.name}
                control={form.control}
                name={`allowedStates.${index}.active`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-[5px] border border-card-border py-3 px-3.5 shadow-sm w-[240px]">
                    <FormLabel>{state.name}</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))} */}
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
