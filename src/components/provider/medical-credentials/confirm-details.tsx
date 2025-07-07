import { cn } from "@/lib/utils";

type FIELD = {
  label: string;
  value: string;
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
        const label = indexRequired
          ? `${index + 1}. ${info.label}`
          : `${info.label}`;
        return (
          <div className="px-4" key={`${index + 1}${info.label}${info.value}`}>
            <div
              className={cn(
                fieldClass,
                index !== field.length - 1 ? indexClass : lastIndexClass
              )}
            >
              <span className={labelClass}>{label}</span>
              <span className={valueClass}>{info.value}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
