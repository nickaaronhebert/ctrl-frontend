import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputElement from "@/components/Form/input-element";

import { createMedicationCatalogueSchema } from "@/schemas/createMedicationCatalogue";
import { CenteredRow } from "@/components/ui/centered-row";
import TagsInputElement from "@/components/Form/TagsInputElement";
import InsertIconSVG from "@/assets/icons/Insert";
import ClearSVG from "@/assets/icons/Clear";
import { cn } from "@/lib/utils";
import SwitchElement from "@/components/Form/switch-element";
import { useCreateMedicationMutation } from "@/redux/services/medication";
import { toast } from "sonner";
import SelectElement from "@/components/Form/select-element";

const units = [
  { label: "Each", value: "each" },
  { label: "ML", value: "ml" },
  { label: "MG", value: "mg" },
  { label: "Unit", value: "unit" },
];
export default function CreateMedicationCatalogue() {
  //   const navigate = useNavigate();

  const [createMedication] = useCreateMedicationMutation();
  const form = useForm<z.infer<typeof createMedicationCatalogueSchema>>({
    mode: "onChange",
    resolver: zodResolver(createMedicationCatalogueSchema),
    defaultValues: {
      isCompound: false,
      drugName: "",
      category: "",
      condition: "",
      availableQuantities: [],
      tags: [],
      indications: [],
      activeIngredients: [
        {
          name: "",
          strength: "",
        },
      ],
      dosageForm: "",
      route: "",
      variants: [
        {
          strength: "",
          quantityType: "",
          containerQuantity: 1,
        },
      ],
    },
  });

  async function onSubmit(
    data: z.infer<typeof createMedicationCatalogueSchema>
  ) {
    console.log("data", data);
    const parsedQuantities = data.availableQuantities.map((quantity) => {
      let num = Number(quantity); // Convert string to number
      if (!isNaN(num)) {
        // Check if the number is valid
        return num; // If valid, return the number
      }
    });
    await createMedication({ ...data, availableQuantities: parsedQuantities })
      .unwrap()
      .then((data) => {
        toast.success(
          data?.message || "Medication Catalogue added successfully",
          {
            duration: 1500,
          }
        );
        // navigate("/onboarding-success");
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(
          err?.data?.message?.[0] || err.data?.message || "Invalid Details",
          {
            duration: 1500,
          }
        );
      });
  }

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control: form.control,
  });

  const {
    fields: ingredientField,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    name: "activeIngredients",
    control: form.control,
  });

  return (
    <>
      <div className=" bg-[#EFE8F5] py-7 px-12">
        <h1 className="text-2xl font-bold mt-1">Create Medication Catalogue</h1>
      </div>
      <div className="  py-10 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-6 items-center"
          >
            <InputElement
              name="drugName"
              className="w-[620px]"
              label="Drug Name"
              isRequired={true}
              messageClassName="text-right"
              placeholder="Enter DrugName Name"
              inputClassName="border border-[#9EA5AB]"
            />

            <TagsInputElement
              name="availableQuantities"
              label="Available Quantities"
              placeholder="Type available quantity and press Enter"
              isRequired={true}
              type="number"
            />

            <CenteredRow>
              <InputElement
                name="category"
                className="w-[300px]"
                label="Category"
                messageClassName="text-right"
                isRequired={true}
                placeholder="Enter category"
                inputClassName="border border-[#9EA5AB]"
              />
              <InputElement
                name="condition"
                className="w-[300px]"
                isRequired={true}
                label="Condition"
                messageClassName="text-right"
                placeholder="Enter condition"
                inputClassName="border border-[#9EA5AB]"
              />
            </CenteredRow>

            <TagsInputElement
              name="indications"
              label="Indications"
              placeholder="Type indication and press Enter"
              isRequired={false}
              type="text"
            />

            <CenteredRow>
              <InputElement
                name="dosageForm"
                className="w-[190px]"
                label="Dosage Form"
                messageClassName="text-right"
                isRequired={true}
                placeholder="Injectable/Capsule"
                inputClassName="border border-[#9EA5AB]"
              />

              <InputElement
                name="route"
                className="w-[198px]"
                label="Route"
                messageClassName="text-right"
                isRequired={true}
                placeholder="Enter route"
                inputClassName="border border-[#9EA5AB]"
              />

              <SwitchElement
                name="isCompound"
                label="Compounded Medicine"
                isRequired={true}
              />
            </CenteredRow>

            <TagsInputElement
              name="tags"
              label="Tags"
              placeholder="Type a tag and press Enter"
              isRequired={false}
              type="text"
            />

            <div className="flex flex-col items-center ">
              <div className="flex justify-between items-center w-[620px] pb-2">
                <h6 className="font-semibold text-base">Active Ingredients</h6>
                <Button
                  type="button"
                  className="min-h-[28px] min-w-[70px] rounded-sm text-white bg-black"
                  onClick={() =>
                    ingredientAppend({
                      name: "",
                      strength: "",
                    })
                  }
                >
                  <InsertIconSVG />
                  ADD INGREDIENT
                </Button>
              </div>
              <div className=" flex flex-col gap-2">
                {ingredientField.map((field, index) => {
                  return (
                    <div
                      className="bg-secondary relative flex w-[620px] rounded-[5px] p-5 border border-border-secondary  gap-[20px]"
                      key={field.id}
                    >
                      <InputElement
                        name={`activeIngredients.${index}.name`}
                        className="w-[270px]"
                        label="Name"
                        messageClassName="text-right"
                        placeholder="Citrazene"
                        inputClassName="bg-white"
                        isRequired={true}
                      />

                      <InputElement
                        name={`activeIngredients.${index}.strength`}
                        className="w-[270px]"
                        label="Strength"
                        messageClassName="text-right"
                        placeholder="10mg/ml"
                        inputClassName="bg-white"
                        isRequired={true}
                      />

                      <button
                        className={cn(
                          "absolute right-2.5 top-2.5 cursor-pointer",
                          index === 0 && "hidden"
                        )}
                        type="button"
                        onClick={() => ingredientRemove(index)}
                      >
                        <ClearSVG />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center mt-3.5">
              <div className="flex justify-between items-center w-[620px] pb-2">
                <h6 className="font-semibold text-base">Product Variant</h6>
                <Button
                  type="button"
                  className="min-h-[28px] min-w-[70px] rounded-sm text-white bg-black"
                  onClick={() =>
                    append({
                      strength: "",
                      quantityType: "",
                      containerQuantity: 1,
                    })
                  }
                >
                  <InsertIconSVG />
                  ADD VARIANT
                </Button>
              </div>
              <div className=" flex flex-col gap-2">
                {fields.map((field, index) => {
                  return (
                    <div
                      className="bg-secondary relative flex w-[620px] rounded-[5px] p-5 border border-border-secondary  gap-[20px]"
                      key={field.id}
                    >
                      <InputElement
                        name={`variants.${index}.strength`}
                        className="w-[200px]"
                        label="Strength"
                        messageClassName="text-right"
                        placeholder="15mg"
                        inputClassName="bg-white"
                        isRequired={true}
                      />
                      {/* each, ml, mg, unit */}
                      {/* <InputElement
                        name={`variants.${index}.quantityType`}
                        className="w-[200px]"
                        label="Quantity Type"
                        messageClassName="text-right"
                        placeholder="Enter quantity type"
                        inputClassName="bg-white"
                        isRequired={true}
                      /> */}
                      <SelectElement
                        errorClassName="text-right"
                        name={`variants.${index}.quantityType`}
                        label="Quantity Type"
                        options={units}
                        placeholder="Enter quantity type"
                        className="w-[200px] min-h-[56px]"
                        isRequired={true}
                      />

                      <InputElement
                        name={`variants.${index}.containerQuantity`}
                        className="w-[200px]"
                        label="Container Quantity"
                        messageClassName="text-right"
                        placeholder="Enter container quantity"
                        inputClassName="bg-white"
                        isRequired={true}
                        type="number"
                      />

                      <button
                        className={cn(
                          "absolute right-2.5 top-2.5 cursor-pointer",
                          index === 0 && "hidden"
                        )}
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <ClearSVG />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end mt-6 min-w-[600px]">
              <Button
                // disabled={!form.formState.isValid}
                type="submit"
                className="text-white rounded-full py-2.5 px-7 min-h-14 min-w-60 text-base font-semibold"
              >
                Create Medication
              </Button>
            </div>
          </form>
        </Form>
        {/* </div> */}
      </div>
    </>
  );
}
