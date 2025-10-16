import type { Prescription, Transmission } from "@/types/global/commonTypes";

const transmissionDisplayFields: {
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
    getValue: (prescription) => prescription?.amount,
  },
];
function PrescriptionCard({ transmission }: { transmission: Transmission }) {
  return (
    <div className=" p-5 border border-card-border rounded-bl-[10px] rounded-br-[10px] ">
      {transmission.prescriptions.map((prescription: Prescription) => {
        return (
          <div
            className=" border border-card-border   rounded-[10px]  mt-2"
            key={prescription.id}
          >
            <div className="flex justify-between items-center p-5 border-b border-card-border">
              <h2 className="text-base font-semibold">
                {prescription.productVariant.medicationCatalogue?.drugName}
              </h2>

              <div>
                <h4 className="text-sm font-semibold text-[#3E4D61]">{`${prescription.provider.firstName} ${prescription.provider.lastName}`}</h4>
                <h6 className="text-[10px] font-medium text-[#47499A]">{`(NPI: ${prescription.provider.npi})`}</h6>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
              {transmissionDisplayFields.map(({ label, getValue }) => (
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

export default function TransmissionCard({
  transmissions,
}: {
  transmissions: Transmission[];
}) {
  return (
    <div
      className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
      id="transmissionDetails"
    >
      <h2 className="text-base font-semibold p-5 border-b border-card-border">
        Transmissions
      </h2>

      <div className="p-5">
        {transmissions?.map((transmission: Transmission, index) => {
          return (
            <div key={transmission.id}>
              <div className="border-b border-card-border  p-5 bg-lilac rounded-tl-[10px] rounded-tr-[10px]">
                <h2 className="text-base font-semibold ">
                  {index + 1}. Transmission- {transmission.transmissionId}
                </h2>
                <h6 className="text-xs ml-4 font-semibold text-[#3E4D61]">
                  {transmission.pharmacy.name}
                </h6>
              </div>

              <PrescriptionCard transmission={transmission} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
