import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsConfig } from "@/constants";

const ProfileTabs = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (id: string) => void;
}) => {
  return (
    <div className="w-[291px] h-[162px] bg-white rounded-lg shadow-sm">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-1 bg-transparent p-0 h-auto">
          {tabsConfig.map((tab, index) => {
            const IconComponent = tab.icon;
            const isActive = tab.id === activeTab;
            console.log("isActive", isActive);
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                onClick={() => {
                  const el = document.getElementById(tab.id);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  onTabChange(tab?.id);
                }}
                className={`
                  flex items-center h-[54px] justify-start gap-3 px-4 py-4 text-left
                  data-[state=active]:bg-primary data-[state=active]:text-white
                  data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-700
                  hover:bg-purple-50 transition-colors duration-200
                  ${index === 0 ? "rounded-t-lg" : ""}
                  ${index === tabsConfig.length - 1 ? "rounded-b-lg" : ""}
                  border-b border-gray-100 last:border-b-0
                `}
              >
                <div className="min-w-[30px] min-h-[30px]">
                  <IconComponent color={isActive ? "white" : "#9EA5AB"} />
                </div>
                <span className="font-medium text-[18px] leading-[26px]">
                  {tab.label}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
