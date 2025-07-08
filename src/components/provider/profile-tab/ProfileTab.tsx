import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import User from "@/assets/icons/User";
import Licence from "@/assets/icons/Licence";
import Affiliation from "@/assets/icons/Affiliation";

const ProfileTabs = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (id: string) => void;
}) => {
  const tabsData = [
    {
      id: "personal",
      label: "Personal Details",
      icon: User,
      content: "Personal details content goes here...",
    },
    {
      id: "medical",
      label: "Medical License",
      icon: Licence,
      content: "Medical license information goes here...",
    },
    {
      id: "affiliation",
      label: "Affiliation Status",
      icon: Affiliation,
      content: "Affiliation status details go here...",
    },
  ];

  console.log("Current active tab", activeTab);

  return (
    <div className="w-[291px] h-[162px]  bg-white rounded-lg shadow-sm">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-1 bg-transparent p-0 h-auto">
          {tabsData.map((tab, index) => {
            const IconComponent = tab.icon;
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
                  ${index === tabsData.length - 1 ? "rounded-b-lg" : ""}
                  border-b border-gray-100 last:border-b-0
                `}
              >
                <IconComponent className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px]" />
                <span className="font-medium">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
