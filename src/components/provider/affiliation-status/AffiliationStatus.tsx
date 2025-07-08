import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { EnableAffiliationDialog } from "../enable-affiliation/EnableAffiliation";
import { DisableAffiliationDialog } from "../disable-affiliation/DisableAffiliationDialog";

const formSchema = z.object({
  affiliations: z.array(
    z.object({
      name: z.string(),
      status: z.enum(["Active", "Inactive"]),
    })
  ),
});

type FormSchema = z.infer<typeof formSchema>;

const AffiliationStatus = ({ userData }: any) => {
  const [dialogState, setDialogState] = useState<{
    index: number;
    intendedValue: "Active" | "Inactive";
  } | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      affiliations: userData.affiliations,
    },
  });

  const { control, watch, setValue } = form;

  const { fields } = useFieldArray({
    control,
    name: "affiliations",
  });

  const affiliations = watch("affiliations");

  console.log("affilaitions", affiliations);

  return (
    <>
      <Form {...form}>
        <form className="wbg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <h2 className="font-semibold text-[20px] leading-[24px] text-black mb-2">
            Affiliation Status
          </h2>

          <div className="w-full h-px bg-gray-200 mb-2" />
          <p className="font-semibold text-[14px] leading-[18px] text-black mb-2">
            Your brand affiliations and their status:
          </p>

          <div className="space-y-4">
            {fields.map((field, index) => {
              console.log("fieldssssssssssss", fields);
              return (
                <div
                  key={field.id}
                  className="bg-light-background border border-card-border h-[70px] px-[15px] py-[12px] flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-[16px] leading-[22px] text-secondary-foreground">
                      {field.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          affiliations[index]?.status === "Active"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          affiliations[index]?.status === "Active"
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {affiliations[index]?.status}
                      </span>
                    </div>
                  </div>

                  <FormField
                    control={control}
                    name={`affiliations.${index}.status`}
                    render={({ field }) => {
                      console.log("myFIeldddddddddddd", field);
                      return (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value === "Active"}
                              onCheckedChange={(val) => {
                                const newStatus = val ? "Active" : "Inactive";
                                setDialogState({
                                  index,
                                  intendedValue: newStatus,
                                });
                              }}
                              className="data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
        </form>
      </Form>
      {dialogState && dialogState.intendedValue === "Active" && (
        <EnableAffiliationDialog
          open={true}
          onConfirm={() => {
            setValue(`affiliations.${dialogState.index}.status`, "Active");
            setDialogState(null);
          }}
          onCancel={() => setDialogState(null)}
        />
      )}

      {dialogState && dialogState.intendedValue === "Inactive" && (
        <DisableAffiliationDialog
          open={true}
          onConfirm={() => {
            setValue(`affiliations.${dialogState.index}.status`, "Inactive");
            setDialogState(null);
          }}
          onCancel={() => setDialogState(null)}
        />
      )}
    </>
  );
};

export default AffiliationStatus;
