import React from "react";

interface StatusCardProps {
  title: string;
  value: string | number;
  description: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
  descriptionColor?: string;
  iconWrapperClassName?: string;
  className?: string;
}

export default function StatusCard({
  title,
  value,
  description,
  icon: Icon,
  descriptionColor = "text-green-600",
  className = "",
  iconWrapperClassName,
}: StatusCardProps) {
  return (
    <div
      className={`bg-white px-[15px] min-w-[250px] min-h-[120px] py-[20px] rounded-[10px] shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-gray-600 text-sm font-medium mb-3">{title}</h3>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            <p className={`text-sm font-medium ${descriptionColor}`}>
              {description}
            </p>
          </div>
        </div>
        <div className={`ml-4 ${iconWrapperClassName ?? ""}`}>
          {Icon && <Icon />}
        </div>
      </div>
    </div>
  );
}
