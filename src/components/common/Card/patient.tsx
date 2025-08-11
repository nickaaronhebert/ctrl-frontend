import type { Patient } from "@/types/global/commonTypes";
import { format } from "date-fns";

const patientDisplayFields: {
  label: string;
  getValue: (patient: Patient) => string;
}[] = [
  {
    label: "Patient Name",
    getValue: (patient) => `${patient.firstName} ${patient.lastName}`,
  },
  {
    label: "Date of Birth",
    getValue: (patient) =>
      patient.dob ? format(new Date(patient.dob), "MMM dd, yyyy") : "",
  },
  {
    label: "Gender",
    getValue: (patient) => patient.gender,
  },
  {
    label: "Phone Number",
    getValue: (patient) => patient.phoneNumber,
  },
  {
    label: "Email",
    getValue: (patient) => patient.email,
  },

  {
    label: "Zip Code",
    getValue: (patient) => patient.zipcode,
  },
];
export default function PatientCard({ patient }: { patient: Patient }) {
  return (
    <div
      className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
      id="patientInformation"
    >
      <h2 className="text-base font-semibold p-5 border-b border-card-border">
        Patient Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
        {patientDisplayFields.map(({ label, getValue }) => (
          <div key={label}>
            <h4 className="text-sm font-normal text-muted-foreground">
              {label}
            </h4>
            <span className="capitalize text-sm font-medium text-primary-foreground">
              {getValue(patient as Patient)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
