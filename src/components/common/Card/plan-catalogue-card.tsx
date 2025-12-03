import type {
  MedicationCatalogueCardProps,
  PharmacyCatalogue,
} from "@/types/responses/medication";
import { PlanRow } from "../PlanRow/PlanRow";

export function PlanCatalogueCard({ data }: MedicationCatalogueCardProps) {
  return (
    <div className="p-6">
      <div className="space-y-6">
        {data?.data?.map((medication: PharmacyCatalogue) => {
          return <PlanRow key={medication._id} medication={medication} />;
        })}
      </div>
    </div>
  );
}
