import { cn } from "@/lib/utils";

interface PersonalDetailsProps {
  containerClass?: string;

  label: string;
  value: string;
}
export default function PersonalDetail({
  containerClass = "",
  label,
  value,
}: PersonalDetailsProps) {
  return (
    <div className="px-4 ">
      <div
        className={cn(
          "flex justify-between mb-2  pt-3.5 ",
          containerClass
          //   index !== personalInfo.length - 1
          //     ? "pb-4 border-b border-gray-200"
          //     : ""
        )}
      >
        <span className="font-semibold text-muted-foreground text-base">
          {label}:
        </span>
        <span className="text-primary-foreground font-semibold text-base">
          {value}
        </span>
      </div>
    </div>
  );
}

//   {personalInfo.map((info, index) => (
//             <div className="px-4 " key={info.name}>
//               <div
//                 key={info.name}
//                 className={cn(
//                   "flex justify-between mb-2  pt-3.5 ",
//                   index !== personalInfo.length - 1
//                     ? "pb-4 border-b border-gray-200"
//                     : ""
//                 )}
//               >
//                 <span className="font-semibold text-muted-foreground text-base">
//                   {info.label}:
//                 </span>
//                 <span className="text-primary-foreground font-semibold text-base">
//                   {info.name}
//                 </span>
//               </div>
//             </div>
//           ))}
