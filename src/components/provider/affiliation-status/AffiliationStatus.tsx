import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { EnableAffiliationDialog } from "../enable-affiliation/EnableAffiliation";
import { DisableAffiliationDialog } from "../disable-affiliation/DisableAffiliationDialog";
import { affiliationSchema } from "@/schemas/affiliationSchema";
import { type AffiliationForm } from "@/schemas/affiliationSchema";

interface Props {
  userData: {
    affiliations: AffiliationForm["affiliations"];
  };
}

const AffiliationStatus = ({ userData }: Props) => {
  console.log("userDataaaaa", userData.affiliations);
  const [dialogState, setDialogState] = useState<{
    id: string;
    index: number;
    intendedValue: boolean;
  } | null>(null);

  console.log("dialogState:::::", dialogState);

  const form = useForm<AffiliationForm>({
    resolver: zodResolver(affiliationSchema),
    defaultValues: {
      affiliations: userData.affiliations,
    },
  });

  console.log("form", form.getValues());

  // useEffect(() => {
  //   if (userData.affiliations && userData.affiliations.length > 0) {
  //     console.log("here");
  //     setValue("affiliations", userData.affiliations);
  //   }
  // }, [userData?.affiliations]);

  const { control, watch, setValue } = form;

  const { fields } = useFieldArray({
    control,
    name: "affiliations",
  });
  fields;

  const affiliations = watch("affiliations");

  console.log("fields", fields);

  return (
    <>
      <Form {...form}>
        <form className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <h2 className="font-semibold text-[20px] leading-[24px] text-black mb-2">
            Affiliation Status
          </h2>

          <div className="w-full h-px bg-gray-200 mb-2" />
          <p className="font-semibold text-[14px] leading-[18px] text-black mb-2">
            Your brand affiliations and their status:
          </p>

          <div className="space-y-4">
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="bg-light-background border border-card-border h-[70px] px-[15px] py-[12px] flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-[16px] leading-[22px] text-secondary-foreground">
                      {field?.business?.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          affiliations[index]?.isAffiliationActive
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          affiliations[index]?.isAffiliationActive
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {affiliations[index]?.isAffiliationActive}
                      </span>
                    </div>
                  </div>

                  <FormField
                    control={control}
                    name={`affiliations.${index}.isAffiliationActive`}
                    render={({ field }) => {
                      console.log("myFIeldddddddddddd", field);
                      const affiliation = fields[index];
                      return (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(val) => {
                                setDialogState({
                                  id: affiliation._id, // ✅ correct access
                                  index,
                                  intendedValue: val,
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
      {dialogState && dialogState.intendedValue === true && (
        <EnableAffiliationDialog
          open={true}
          id={dialogState.id}
          fieldIndex={dialogState.index}
          setValue={setValue}
          onCancel={() => setDialogState(null)}
        />
      )}

      {dialogState && dialogState.intendedValue === false && (
        <DisableAffiliationDialog
          open={true}
          id={dialogState.id}
          fieldIndex={dialogState.index}
          setValue={setValue}
          onCancel={() => setDialogState(null)}
        />
      )}
    </>
  );
};

export default AffiliationStatus;
