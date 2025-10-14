import { Link, useSearchParams } from "react-router-dom";
import SelectProductVariant from "./medication";
import { useAppSelector } from "@/hooks/useAppSelector";
import SelectProviderPharmacy from "./provider-pharmacy";
import SelectPatient from "./patient";
import ReviewOrderDetails from "./review";
import { ChevronRight } from "lucide-react";
import { cn, formatDateMMDDYYYY } from "@/lib/utils";
import { useGetPatientDetailsByIdQuery } from "@/redux/services/patientApi";
// import { useAppDispatch } from "@/redux/store";
// import { useEffect } from "react";
// import { updateInitialStep } from "@/redux/slices/create-order";
import SelectPatientAddress from "./address";

const CreateOrderPage = () => {
  // const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patientId") ?? "";
  const { data: patientData } = useGetPatientDetailsByIdQuery(patientId, {
    skip: !patientId,
    selectFromResult: ({ data, isFetching }) => ({
      data: data?.data
        ? {
            selectedPatient: data.data,
            address: data.data.addresses || [],
            dispensingAddress: data.data.addresses.filter(
              (address) => address.isDefault === true
            )?.[0],

            firstName: data.data.firstName,
            lastName: data.data.lastName,
            phoneNumber: data.data.phoneNumber,
            email: data.data.email,
            dob: formatDateMMDDYYYY(data.data.dob),
            medicationAllergies: data.data.medicationAllergies,
            currentMedications: data.data.currentMedications,
            height: data.data.height,
            weight: data.data.weight,
            gender: data.data.gender,
          }
        : undefined,

      isFetching: isFetching,
    }),
  });

  // useEffect(() => {
  //   if (patientData) {
  //     dispatch(updateInitialStep(patientData));
  //   }
  // }, [isFetching]);

  const order = useAppSelector((state) => state.order);

  return (
    <>
      <div className="bg-lilac py-3 px-12">
        <Link
          to={"/org/orders"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Orders"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Create Order </h1>
      </div>
      <div
        className="mt-10  rounded-[15px] max-w-[1000px] mx-auto p-6 bg-white "
        style={{
          boxShadow: "0px 8px 10px 0px hsla(0, 0%, 0%, 0.08)",
        }}
      >
        <div className="pt-2.5 pb-2.5 px-5 flex gap-2.5 justify-center border-b border-card-border border-dashed mb-10">
          <p
            className={cn(
              "text-base font-semibold flex gap-3",
              order.currentStep >= 0 ? "text-primary" : "text-[#63627F]"
            )}
          >
            <span>1.</span>
            <span>Patient Details</span>
          </p>
          <ChevronRight />
          <p
            className={cn(
              "text-base font-semibold flex gap-3",
              order.currentStep >= 1 ? "text-primary" : "text-[#63627F]"
            )}
          >
            <span>2.</span>
            <span>Medications</span>
          </p>
          <ChevronRight />
          <p
            className={cn(
              "text-base font-semibold flex gap-3",
              order.currentStep >= 2 ? "text-primary" : "text-[#63627F]"
            )}
          >
            <span>3.</span>
            <span> Provider </span>
          </p>
          <ChevronRight />
          <p
            className={cn(
              "text-base font-semibold flex gap-3",
              order.currentStep >= 3 ? "text-primary" : "text-[#63627F]"
            )}
          >
            <span>4.</span>
            <span>Dispensing</span>
          </p>
        </div>

        {order.currentStep === 0 && (
          <SelectPatient
            patient={patientData || order.initialStep}
            // addressList={order?.initialStep?.selectedPatient}
          />
        )}
        {order.currentStep === 1 && (
          <SelectProductVariant
            productVariant={order.stepOne}
            state={order.initialStep.dispensingAddress.state}
          />
        )}
        {order.currentStep === 2 && (
          <SelectProviderPharmacy providerPharmacy={order.stepTwo} />
        )}
        {order.currentStep === 3 && (
          <SelectPatientAddress
            // dispensingAddress={order.stepThree}
            // addressList={order?.initialStep?.selectedPatient}
            selectedMethod={order.stepThree.transmissionMethod}
          />
        )}

        {order.currentStep === 4 && <ReviewOrderDetails order={order} />}
      </div>
    </>
  );
};

export default CreateOrderPage;
