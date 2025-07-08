import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface AffiliationItem {
  id: string;
  name: string;
  isActive: boolean;
}

const AffiliationStatus = ({ userData }: any) => {
  const [affiliations, setAffiliations] = useState<AffiliationItem[]>([
    {
      id: "1",
      name: "MedConnect Pro",
      isActive: true,
    },
    {
      id: "2",
      name: "GoGoMeds",
      isActive: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setAffiliations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  return (
    <div className="wbg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Affiliation Status
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Your brand affiliations and their status:
      </p>

      <div className="space-y-4">
        {userData.affiliations.map((affiliation: any) => (
          <div
            key={affiliation.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900">
                {affiliation.name}
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    affiliation.isActive ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    affiliation.isActive ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {affiliation.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <Switch
              checked={affiliation.isActive}
              onCheckedChange={() => handleToggle(affiliation.id)}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliationStatus;
