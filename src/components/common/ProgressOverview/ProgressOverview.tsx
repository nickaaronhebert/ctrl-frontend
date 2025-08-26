export default function ProgressOverview({
  configuredStates,
}: {
  configuredStates: Record<string, string>;
}) {
  const totalStates = 50;
  const assigned = Object.keys(configuredStates).length;
  const remaining = totalStates - assigned;

  const completionPercentage = (assigned / totalStates) * 100;

  return (
    <div className="rounded-lg rounded-tl-none rounded-tr-none p-6 ">
      {/* Header */}
      <div className="mb-3">
        <h2 className="font-medium text-[16px] leading-[22px] text-black">
          Progress Overview
        </h2>
        <p className="font-normal text-[12px] leading-[16px] text-slate">
          Choose what you want to configure
        </p>
      </div>
      <div className="mb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-[14px] leading-[18px] text-black ">
            Completion
          </span>
          <span className="font-medium text-[14px] leading-[18px] text-black">
            {Math.round(completionPercentage)}%
          </span>
        </div>
        <div className="w-full bg-card-border rounded-full h-3">
          <div
            className="bg-progress h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <span className="bg-progress-secondary px-[8px] py-[4px] rounded-[5px]">
            <span className="text-[12px] leading-[16px] text-progress font-normal">
              {assigned} Assigned
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-light-background px-[8px] py-[4px] rounded-[5px]">
            <span className="font-normal text-[12px] leading-[16px] text-primary-foreground">
              {remaining} Remaining
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
