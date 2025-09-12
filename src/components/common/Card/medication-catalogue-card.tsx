import type {
  MedicationCatalogueCardProps,
  PharmacyCatalogue,
} from "@/types/responses/medication";
import { MedicationRow } from "../MedicationRow/MedicationRow";

export function MedicationCatalogueCard({
  data,
}: MedicationCatalogueCardProps) {
  return (
    <div className="p-6">
      <div className="space-y-6">
        {data.data.map((medication: PharmacyCatalogue) => {
          return <MedicationRow key={medication._id} medication={medication} />;
        })}
      </div>
    </div>
  );
}
