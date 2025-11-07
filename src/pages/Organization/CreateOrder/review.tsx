import { Button } from "@/components/ui/button";
import type { OrderState } from "@/redux/slices/create-order";
import { useAppDispatch } from "@/redux/store";
import { prevStep, resetOrder } from "@/redux/slices/create-order";
import { useCreateOrderMutation } from "@/redux/services/order";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export default function ReviewOrderDetails({ order }: { order: OrderState }) {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const allergyList = order.initialStep?.medicationAllergies
    ? order.initialStep?.medicationAllergies
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0) // removes empty strings
    : [];

  const medicationsList = order.initialStep?.currentMedications
    ? order.initialStep?.currentMedications
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0) // removes empty strings
    : [];

  const [providerId, providerName] = order.stepTwo.selectProvider.split("/");

  const handleSubmit = async () => {
    const { _id, ...address } = order.initialStep.dispensingAddress;

    const prescriptions = order.stepOne.medications.map((item) => {
      const [variantId, _variantName] = item.selectMedication.split("/");
      return {
        quantity: item.quantity,
        provider: providerId,
        productVariant: variantId,
        daysSupply: item.daysSupply,
        // pharmacy: pharmacyId,
        instructions: item.sigInstructions,
        clinicalDifference: item.clinicalDifference,
        // isManualTransmission: true,
      };
    });

    const orderPayload = {
      transmissionMethod: order.stepThree.transmissionMethod,
      patient: order.initialStep.selectedPatient?.id,
      prescriptions,
      address,
      subOrganization: order.stepTwo.subOrganization,
    };

    await createOrder(orderPayload)
      .unwrap()
      .then((data) => {
        dispatch(resetOrder());
        toast.success(data?.message || "Order Created Successfully", {
          duration: 3000,
        });
        navigate("/org/orders");
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 1500,
        });
      });
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="min-w-[500px]  rounded-[6px] border border-card-border">
          <div className="border-b border-gray-100 py-3.5 px-5 space-y-[8px] bg-[#F6F8F9] rounded-tl-[6px] rounded-tr-[6px]">
            <p className="text-base font-semibold text-black">
              Patient Information
            </p>
            <div className="flex justify-between">
              <p className="text-sm font-normal text-[#63627F]">Full Name</p>
              <p className="text-sm font-medium text-black">{`${order.initialStep.firstName} ${order.initialStep.lastName}`}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal text-[#63627F]">Email</p>
              <p className="text-sm font-medium text-black">
                {order.initialStep.email}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal text-[#63627F]">Phone Number</p>
              <p className="text-sm font-medium text-black">
                {order.initialStep.phoneNumber}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal text-[#63627F]">Gender</p>
              <p className="text-sm font-medium text-black">
                {order.initialStep.gender}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal text-[#63627F]">DOB</p>
              <p className="text-sm font-medium text-black">
                {order.initialStep.dob}
              </p>
            </div>
          </div>

          <div className="border-b border-gray-100 py-3.5 px-5 space-y-[8px] bg-[#FFFFFF] ">
            <p className="text-base font-semibold text-black">
              Patient Diagnostics
            </p>

            {allergyList?.length > 0 && (
              <div className="flex justify-between">
                <p className="text-sm font-normal text-[#63627F]">
                  Medication Allergies
                </p>
                <div className="max-h-32 overflow-y-auto   rounded-lg">
                  <div className="flex justify-end flex-wrap gap-2 max-w-[320px]">
                    {allergyList.map((allergy, index) => (
                      <span
                        key={`${allergy}${index}`}
                        className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-lg font-medium shadow-sm "
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {medicationsList?.length > 0 && (
              <div className="flex justify-between">
                <p className="text-sm font-normal text-[#63627F]">
                  Current Medications
                </p>
                <div className="max-h-32 overflow-y-auto   rounded-lg">
                  <div className="flex justify-end flex-wrap gap-2 max-w-[320px]">
                    {medicationsList.map((medication, index) => (
                      <span
                        key={`${medication}${index}`}
                        className="text-xs bg-[#F6F8F9] text-primary-foreground px-2 py-1 rounded-lg font-medium shadow-sm "
                      >
                        {medication}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <p className="text-sm font-normal text-[#63627F]">
                Height / Weight
              </p>
              <p className="text-sm font-medium text-black">{`${order.initialStep.height}(inches) ${order.initialStep.weight}(lbs) `}</p>
            </div>
          </div>

          <div className="border-b border-gray-100 py-3.5 px-5 space-y-[8px] bg-[#FFFFFF] ">
            <p className="text-base font-semibold text-black">
              Medications Selected
            </p>
            {order.stepOne.medications?.map((item, index) => {
              const [variantId, variantName] = item.selectMedication.split("/");

              return (
                <div
                  className="flex justify-between items-start"
                  key={variantId}
                >
                  <p className="text-sm font-normal text-[#63627F]">
                    Medication {index + 1}
                  </p>
                  <div className="text-right">
                    <p className="text-sm font-medium text-black">
                      {variantName}
                    </p>
                    <p className="text-xs font-normal text-black">
                      Container Qty: {item.quantity} and Dispensing Unit:{" "}
                      {item.unit}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-b border-gray-100 py-3.5 px-5 space-y-[8px] bg-[#FFFFFF] ">
            <p className="text-base font-semibold text-black">Provider</p>
            <div className="flex justify-between">
              <p className="text-sm font-normal text-[#63627F]">Provider</p>
              <p className="text-sm font-medium text-black">{providerName}</p>
            </div>
            {/* <div className="flex justify-between">
              <p className="text-sm font-normal text-[#63627F]">Pharmacy</p>
              <p className="text-sm font-medium text-black">{pharmacyName}</p>
            </div> */}
          </div>

          {/* <div className=" py-3.5 px-5 space-y-[8px] bg-[#FFFFFF] rounded-bl-[6px] rounded-br-[6px]">
            <p className="text-base font-semibold text-black">Dispensing</p>
            <div className="flex justify-between items-start">
              <p className="text-sm font-normal text-[#63627F]">Method</p>
              <div className="text-right">
                <p className="text-sm font-medium text-black">
                  Ship to patient
                </p>
                <p className="text-xs font-normal text-black">
                  
                </p>
              </div>
            </div>
          </div> */}
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
          className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold text-white cursor-pointer"
          onClick={handleSubmit}
        >
          Review & Place Order
        </Button>
      </div>
    </>
  );
}
