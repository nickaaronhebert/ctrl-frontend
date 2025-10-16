import Medications from "@/assets/mainlayouticons/Medications";
import type { Prescription } from "@/types/global/commonTypes";
import { format } from "date-fns";

const prescriptionDisplayFields: {
  label: string;
  getValue: (prescription: Prescription) => string | number;
}[] = [
  {
    label: "Container Qty",
    getValue: (prescription) => prescription.productVariant?.containerQuantity,
  },
  {
    label: "Container Qty Type",
    getValue: (prescription) => prescription.productVariant?.quantityType,
  },
  {
    label: "Dispensing Qty",
    getValue: (prescription) => prescription.quantity,
  },
  {
    label: "Sig",
    getValue: (prescription) =>
      prescription?.instructions || prescription?.notes,
  },
  {
    label: "Price",
    getValue: (prescription) => prescription.amount,
  },
  {
    label: "Approved At",
    getValue: (prescription) =>
      prescription.status === "Approved" && prescription.statusUpdatedAt
        ? format(new Date(prescription.statusUpdatedAt), "MM/dd/yyyy HH:mm")
        : "-",
  },
];

export default function PrescriptionCard({
  prescriptions,
}: {
  prescriptions: Prescription[];
}) {
  return (
    <div className=" p-5 border border-card-border rounded-bl-[10px] rounded-br-[10px] ">
      {prescriptions.map((prescription: Prescription) => {
        return (
          <div
            className=" border border-card-border   rounded-[10px]  mt-2"
            key={prescription.id}
          >
            <div className="flex justify-between items-center p-5 border-b border-card-border rounded-tl-[10px] rounded-tr-[10px] bg-[#E6F3FC]">
              <div className="flex gap-1 items-center">
                {/* <Medication color="purple" width={20} height={20} /> */}
                <Medications color="purple" />
                <h2 className="text-base font-semibold">
                  {prescription.productVariant.medicationCatalogue?.drugName}
                </h2>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#3E4D61]">{`${prescription.provider.firstName} ${prescription.provider.lastName}`}</h4>
                <h6 className="text-[10px] font-medium text-[#47499A]">{`(NPI: ${prescription.provider.npi})`}</h6>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
              {prescriptionDisplayFields.map(({ label, getValue }) => (
                <div key={label}>
                  <h4 className="text-sm font-normal text-muted-foreground">
                    {label}
                  </h4>
                  <span className="capitalize text-sm font-medium text-primary-foreground">
                    {getValue(prescription as Prescription)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
