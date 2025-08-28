import File from "@/assets/icons/File";
import QueuedSecondary from "@/assets/icons/Queuedecondary";
import Tick from "@/assets/icons/Tick";
import TripleDots from "@/assets/icons/TripleDots";

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<
  string,
  {
    icon: React.ReactNode;
    bg: string;
    border: string;
    text: string;
  }
> = {
  Created: {
    icon: <File />,
    bg: "bg-light-background",
    border: "border-slate   ",
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
    icon: <Tick color="green" />,
    bg: "bg-progress-secondary",
    border: "border-progress",
    text: "text-progress",
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = statusStyles[status] || statusStyles["Created"];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium ${style.bg} ${style.border} ${style.text}`}
    >
      {style.icon}
      <span className="capitalize font-medium text-[10px] text-slate leading-[12px]">
        {status}
      </span>
    </span>
  );
};
