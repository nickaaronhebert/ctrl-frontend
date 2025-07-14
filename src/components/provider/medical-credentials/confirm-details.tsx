import { cn } from "@/lib/utils";

type FIELD = {
  state: string;

  registrationNumber?: string;
  licenseNumber?: string;
};

interface ConfirmDetailsProps {
  field: FIELD[];
  labelClass: string;
  valueClass: string;
  fieldClass: string;
  indexRequired?: boolean;
  lastIndexClass?: string;
  indexClass?: string;
}

export default function ConfirmDetails({
  field,
  labelClass,
  valueClass,
  fieldClass,
  indexRequired = false,
  lastIndexClass = "",
  indexClass = "",
}: ConfirmDetailsProps) {
  return (
    <>
      {field.map((info: FIELD, index: number) => {
        const state = indexRequired
          ? `${index + 1}. ${info.state}`
          : `${info.state}`;
        return (
          <div
            className="px-4"
            key={`${index + 1}${info.state}${
              info.registrationNumber || info.licenseNumber
            }`}
          >
            <div
              className={cn(
                fieldClass,
                index !== field.length - 1 ? indexClass : lastIndexClass
              )}
            >
              <span className={labelClass}>{state}</span>
              <span className={valueClass}>
                {info.registrationNumber || info.licenseNumber}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
