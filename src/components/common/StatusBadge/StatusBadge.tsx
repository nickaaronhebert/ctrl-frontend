import File from "@/assets/icons/File";
import QueuedSecondary from "@/assets/icons/Queuedecondary";
import { Check, X } from "lucide-react";
import Tick from "@/assets/icons/Tick";
import TripleDots from "@/assets/icons/TripleDots";
import NotReceived from "@/assets/icons/NotReceived";
import Received from "@/assets/icons/Received";
import Delivered from "@/assets/images/Delivered.png";
import Shipped from "@/assets/images/Shipped.png";
import ReadyForShipping from "@/assets/images/ReadyForShipping.png";
import Icon from "@/assets/images/Icon.png";

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<
  string,
  {
    icon: React.ReactNode;
    bg?: string;
    border?: string;
    text: string;
  }
> = {
  Created: {
    icon: <File />,
    bg: "bg-light-background",
    border: "border-slate",
    text: "text-[#2C3E50]",
  },
  Pending: {
    icon: <TripleDots />,
    bg: "bg-pending-secondary",
    border: "border-pending",
    text: "text-pending",
  },
  Queued: {
    icon: <QueuedSecondary />,
    bg: "bg-strength",
    border: "border-queued",
    text: "text-queued",
  },
  Transmitted: {
    icon: <Tick />,
    bg: "bg-progress-secondary",
    border: "border-progress",
    text: "text-progress",
  },
  Succeeded: {
    icon: <Check stroke="#3fd975" size={16} />,
    bg: "bg-progress-secondary",
    border: "border-progress",
    text: "text-progress",
  },
  Paid: {
    icon: <Received />,
    bg: "bg-[#E6FAF5]",
    border: "border-[#E6FAF5]",
    text: "text-progress",
  },
  Unpaid: {
    icon: <NotReceived />,
    bg: "bg-[#FFE9E9]",
    border: "border-[#FFE9E9]",
    text: "text-failed",
  },
  Delivered: {
    icon: <img src={Delivered} alt="readyshipping" />,
    text: "text-progress",
    bg: "bg-[#E6FAF5]",
    border: "border-[#E6FAF5]",
  },
  ReadyToShip: {
    icon: <img src={ReadyForShipping} alt="readyshipping" />,
    text: "text-pending",
    bg: "bg-[#FFF4E5]",
    border: "border-[#FFF4E5]",
  },
  Processed: {
    icon: <img src={Icon} alt="Processed" />,
    text: "text-[#A133B4]",
    bg: "bg-[#F3E5F5]",
    border: "border-[#F3E5F5]",
  },
  Shipped: {
    icon: <img src={Shipped} alt="Processed" />,
    text: "text-queued",
    bg: "bg-[#E3F2FD]",
    border: "border-[#E3F2FD]",
  },
  Failed: {
    icon: <X size={13} />,
    text: "text-white ",
    bg: "bg-red-500",
    border: "border-[#E3F2FD]",
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = statusStyles[status] || statusStyles["Created"];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium ${style.bg} ${style.border} ${style.text}`}
    >
      {style.icon}
      <span className="capitalize font-medium text-[10px] text-slate leading-[12px] p-0.5">
        {status}
      </span>
    </span>
  );
};
