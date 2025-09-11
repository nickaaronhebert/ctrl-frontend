import type {
  MedicationCatalogueCardProps,
  PharmacyCatalogue,
} from "@/types/responses/medication";
import { MedicationRow } from "../MedicationRow/MedicationRow";

export function MedicationCatalogueCard({
  data,
}: MedicationCatalogueCardProps) {
  console.log("data", data);
  return (
    <div className="p-6">
      <div className="space-y-6">
        {data.data.map((medication: PharmacyCatalogue) => {
          console.log("medication", medication);
          return <MedicationRow key={medication._id} medication={medication} />;
        })}
      </div>
    </div>
  );
}
