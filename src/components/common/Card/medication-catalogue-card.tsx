import { MedicationRow } from "../MedicationRow/MedicationRow";

export function MedicationCatalogueCard({ data }: any) {
  return (
    <div className="p-6">
      <div className="space-y-6">
        {data.data.map((medication: any) => (
          <MedicationRow key={medication._id} medication={medication} />
        ))}
      </div>
    </div>
  );
}
