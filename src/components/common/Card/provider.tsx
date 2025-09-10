import Profile from "@/assets/icons/Profile";
import type { Provider } from "@/types/global/commonTypes";

const providerDisplayFields: {
  label: string;
  getValue: (provider: Provider) => string;
}[] = [
  {
    label: "Provider Name",
    getValue: (provider) => provider.firstName + " " + provider.lastName,
  },
  {
    label: "Provider NPI",
    getValue: (provider) => provider.npi,
  },
];

export default function ProviderCard({ provider }: { provider: Provider }) {
  console.log("provider", provider);
  return (
    <div
      className="bg-white rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
      id="providerInformation"
    >
      <h2 className="text-base font-semibold p-5 border-b border-card-border flex items-center gap-2">
        <Profile color="black" width={16} height={16} />
        Provider Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 p-5">
        {providerDisplayFields.map(({ label, getValue }) => (
          <div key={label}>
            <h4 className="text-sm font-normal text-muted-foreground">
              {label}
            </h4>
            <span className="text-sm font-medium text-primary-foreground mt-2">
              {getValue(provider)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
