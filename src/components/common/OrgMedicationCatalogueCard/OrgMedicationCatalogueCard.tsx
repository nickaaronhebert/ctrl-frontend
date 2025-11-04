import type {
  MedicationCatalogueCardProps,
  PharmacyCatalogue,
} from "@/types/responses/medication";
// import { MedicationRow } from "../MedicationRow/MedicationRow";
import { OrgMedicationRow } from "../OrgMedicationRow/OrgMedicationRow";

export function OrgMedicationCatalogueCard({
  data,
}: MedicationCatalogueCardProps) {
  return (
    <div className="p-4">
      <div className="space-y-6">
        {data.data.map((medication: PharmacyCatalogue) => {
          return (
            <OrgMedicationRow key={medication._id} medication={medication} />
          );
        })}
      </div>
    </div>
  );
}
