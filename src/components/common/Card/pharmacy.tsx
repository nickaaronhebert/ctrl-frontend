import type { Pharmacy } from "@/types/global/commonTypes";

const pharmacyDisplayFields: {
  label: string;
  getValue: (patient: Pharmacy) => string;
}[] = [
  {
    label: "Pharmacy Name",
    getValue: (pharmacy) => `${pharmacy.name}`,
  },
  {
    label: "Phone Number",
    getValue: (pharmacy) => `${pharmacy.phoneNumber}`,
  },
  {
    label: "Email",
    getValue: (pharmacy) => `${pharmacy.email}`,
  },
  {
    label: "Address",
    getValue: (pharmacy) => `${pharmacy.address}`,
  },
];
export default function PharmacyCard({ pharmacy }: { pharmacy: Pharmacy }) {
  return (
    <div
      className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
      id="pharmacyInformation"
    >
      <h2 className="text-base font-semibold p-5 border-b border-card-border">
        Pharmacy Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
        {pharmacyDisplayFields.map(({ label, getValue }) => (
          <div key={label}>
            <h4 className="text-sm font-normal text-muted-foreground">
              {label}
            </h4>
            <span className="capitalize text-sm font-medium text-primary-foreground">
              {getValue(pharmacy as Pharmacy)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
