import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputElement from "@/components/Form/input-element";

import { editMedicationCatalogueSchema } from "@/schemas/createMedicationCatalogue";
import { CenteredRow } from "@/components/ui/centered-row";
import TagsInputElement from "@/components/Form/TagsInputElement";
import InsertIconSVG from "@/assets/icons/Insert";
import ClearSVG from "@/assets/icons/Clear";
import { cn } from "@/lib/utils";
import SwitchElement from "@/components/Form/switch-element";
// import { useCreateMedicationMutation } from "@/redux/services/medication";
// import { toast } from "sonner";
import SelectElement from "@/components/Form/select-element";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useEditMedicationMutation,
  useGetSingleMedicationCatalogueDetailsQuery,
} from "@/redux/services/medication";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { MedicationCatalogueDetails } from "@/types/responses/IMedicationCatalogueDetails";
import { toast } from "sonner";
import { dosageFormOptions } from "@/constants";

const units = [
  { label: "Each", value: "each" },
  { label: "ML", value: "ml" },
  { label: "MG", value: "mg" },
  { label: "Unit", value: "unit" },
];

const categoryTypes = [
  { label: "Pain Management", value: "pain_management" },
  {
    label: "Hormone Replacement Therapy (HRT)",
    value: "hormone_replacement_therapy",
  },
  { label: "Erectile Dysfunction", value: "erectile_dysfunction" },
  { label: "Women's Health", value: "womens_health" },
  { label: "Sexual Health", value: "sexual_health" },
  { label: "Pediatrics", value: "pediatrics" },
  { label: "Dermatology", value: "dermatology" },
  { label: "Veterinary Medicine", value: "veterinary_medicine" },
  { label: "Podiatry", value: "podiatry" },
  { label: "GI and Digestive Health", value: "gi_health" },
  { label: "ENT (Ear, Nose & Throat)", value: "ent" },
  { label: "Ophthalmology", value: "ophthalmology" },
  { label: "Urology", value: "urology" },
  { label: "Neurology", value: "neurology" },
  { label: "Mental Health", value: "mental_health" },
  { label: "Adrenal Support", value: "adrenal_support" },
  { label: "Thyroid Support", value: "thyroid_support" },
  { label: "Immunotherapy", value: "immunotherapy" },
  { label: "Sports Medicine", value: "sports_medicine" },
  { label: "Weight Management", value: "weight_management" },
  { label: "Anti-Aging", value: "anti_aging" },
  { label: "Wound Care", value: "wound_care" },
  { label: "Infectious Disease", value: "infectious_disease" },
  { label: "Oncology Support", value: "oncology_support" },
  { label: "Allergy Treatments", value: "allergy_treatments" },
  { label: "Hair Restoration", value: "hair_restoration" },
  { label: "Sleep Disorders", value: "sleep_disorders" },
  { label: "Migraine Therapy", value: "migraine_therapy" },
  { label: "Cardiovascular Support", value: "cardiovascular_support" },
  { label: "Geriatric Care", value: "geriatric_care" },
];

const routeTypes = [
  {
    label: "Oral",
    value: "Oral",
  },
  {
    label: "Injection",
    value: "Injection",
  },
  {
    label: "Topical",
    value: "Topical",
  },
  {
    label: "Nasal",
    value: "Nasal",
  },
];

interface MedicationCatalogueProps {
  data?: MedicationCatalogueDetails;
  id: string;
}
function MedicationCatalogue({ data, id }: MedicationCatalogueProps) {
  const navigate = useNavigate();
  const [editMedication] = useEditMedicationMutation();

  const form = useForm<z.infer<typeof editMedicationCatalogueSchema>>({
    mode: "onChange",
    resolver: zodResolver(editMedicationCatalogueSchema),
    defaultValues: {
      isCompound: data?.isCompound || false,
      drugName: data?.drugName || "",
      category: data?.category || "",
      // condition: "",
      // availableQuantities: [],
      tags: data?.tags || [],
      indications: data?.indications || [],
      activeIngredients: data?.activeIngredients?.map((item) => {
        return {
          name: item.name,
        };
      }) || [
        {
          name: "",
          // strength: "",
        },
      ],
      dosageForm: data?.dosageForm || "",
      route: data?.route || "",
      variants: data?.productVariants?.map((item) => {
        console.log(item);
        return {
          strength: item.strength,
          quantityType: item.quantityType,
          containerQuantity: item.containerQuantity,
          telegraProductVariant: item.telegraProductVariant,
          id: item.id,
        };
      }) || [
        {
          strength: "",
          quantityType: "",
          containerQuantity: 1,
        },
      ],
    },
  });

  async function onSubmit(data: z.infer<typeof editMedicationCatalogueSchema>) {
    await editMedication({ data, id })
      .unwrap()
      .then((data) => {
        form.reset();
        toast.success(data?.message || "Changes saved successfully", {
          duration: 1500,
        });
        navigate("/admin/medications");
      })
      .catch((err) => {
        console.log("error", err);

        toast.error(
          Array.isArray(err?.data?.message)
            ? err.data?.message[0]
            : err.data?.message || "Invalid Details",
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
      <div className=" bg-[#EFE8F5] py-3 px-12">
        <Link
          to={"/admin/medications"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Medication Library"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Edit Medication Catalogue</h1>
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

            {/* <TagsInputElement
              name="availableQuantities"
              label="Available Quantities"
              placeholder="Type available quantity and press Enter"
              isRequired={true}
              type="number"
            /> */}

            <CenteredRow>
              <SelectElement
                errorClassName="text-right"
                name={`category`}
                label="Category"
                options={categoryTypes}
                placeholder="Enter category"
                className="w-[620px] min-h-[56px] "
                isRequired={true}
                defaultValue={data?.category}
                triggerClassName="border border-[#9EA5AB] bg-transparent"
              />
              {/* <InputElement
                name="category"
                className="w-[620px]"
                label="Category"
                messageClassName="text-right"
                isRequired={true}
                placeholder="Enter category"
                inputClassName="border border-[#9EA5AB]"
              /> */}
              {/* <InputElement
                name="condition"
                className="w-[300px]"
                isRequired={true}
                label="Condition"
                messageClassName="text-right"
                placeholder="Enter condition"
                inputClassName="border border-[#9EA5AB]"
              /> */}
            </CenteredRow>

            <TagsInputElement
              name="indications"
              label="Indications"
              placeholder="Type indication and press Enter"
              isRequired={false}
              type="text"
            />

            <CenteredRow>
              <SelectElement
                name="dosageForm"
                options={dosageFormOptions}
                label="Dosage Form"
                isRequired={true}
                className="w-[196px] min-h-[56px] border-[#9EA5AB] mb-0.5"
                placeholder="Select Dosage Form "
                errorClassName="text-right"
                labelClassName="font-semibold text-sm"
                defaultValue={dosageFormOptions[0]?.value}
              />

              <SelectElement
                errorClassName="text-right"
                name={`route`}
                label="Route"
                options={routeTypes}
                placeholder="Enter route"
                className="w-[198px] min-h-[56px] "
                isRequired={true}
                defaultValue={data?.route}
                triggerClassName="border border-[#9EA5AB] "
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
                      // strength: "",
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
                        className="w-[560px]"
                        label="Name"
                        messageClassName="text-right"
                        placeholder="Citrazene"
                        inputClassName="bg-white"
                        isRequired={true}
                      />

                      {/* <InputElement
                        name={`activeIngredients.${index}.strength`}
                        className="w-[270px]"
                        label="Strength"
                        messageClassName="text-right"
                        placeholder="10mg/ml"
                        inputClassName="bg-white"
                        isRequired={true}
                      /> */}

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
              <div className=" flex flex-col  gap-2">
                {fields.map((field, index) => {
                  return (
                    <div
                      className="bg-secondary relative flex w-[620px] justify-center  flex-wrap rounded-[5px] p-5 border border-border-secondary  gap-[10px]"
                      key={field.id}
                    >
                      <InputElement
                        name={`variants.${index}.strength`}
                        className="w-[250px]"
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
                        className="w-[250px] min-h-[56px]"
                        isRequired={true}
                      />

                      <InputElement
                        name={`variants.${index}.containerQuantity`}
                        className="w-[250px]"
                        label="Container Quantity"
                        messageClassName="text-right"
                        placeholder="Enter container quantity"
                        inputClassName="bg-white"
                        isRequired={true}
                        type="number"
                      />

                      <InputElement
                        name={`variants.${index}.telegraProductVariant`}
                        className="w-[250px]"
                        label="Telegra Product Variant"
                        messageClassName="text-right"
                        placeholder="Enter telegra product variant"
                        inputClassName="bg-white"
                        isRequired={false}
                        type="string"
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
                Edit Medication
              </Button>
            </div>
          </form>
        </Form>
        {/* </div> */}
      </div>
    </>
  );
}

export default function EditMedicationCatalogue() {
  const { id } = useParams();
  const { data: singleMedDetail, isLoading } =
    useGetSingleMedicationCatalogueDetailsQuery(id!, {
      skip: !id,
    });

  if (isLoading)
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return <MedicationCatalogue data={singleMedDetail?.data} id={id || ""} />;
}
