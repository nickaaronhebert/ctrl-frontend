import { Outlet } from "react-router-dom";
import { MedicationProvider } from "@/context/ApplicationUser/MedicationContext";

export default function PharmacyMedicationsLayout() {
  return (
    <MedicationProvider>
      <Outlet />
    </MedicationProvider>
  );
}
