import PrescriptionWarning from "@/components/provider/prescriptions/warning";

export default function PrescriptionPage() {
  return (
    <div>
      <h1 className="font-semibold text-2xl">Prescriptions</h1>
      <div className="mt-4">
        <PrescriptionWarning />
      </div>
    </div>
  );
}
