import PersonalDetails from "@/components/provider/personal-details/PersonalDetails";
import ProfileTabs from "@/components/provider/profile-tab/ProfileTab";
import { useEffect, useRef, useState } from "react";
import { userData } from "@/components/provider/user-data";
import MedicalVerification from "@/components/provider/medical-verification/MedicalVerification";
import AffiliationStatus from "@/components/provider/affiliation-status/AffiliationStatus";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const sections = [
    { id: "personal", ref: useRef<HTMLDivElement>(null) },
    { id: "medical", ref: useRef<HTMLDivElement>(null) },
    { id: "affiliation", ref: useRef<HTMLDivElement>(null) },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.id) {
          setActiveTab(visible.target.id);
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => observer.disconnect();
  }, []);

  console.log("Active Tab", activeTab);

  return (
    <div className="py-[50px]  gap-8">
      <h1 className="font-semibold text-[26px] leading-[30px] text-black mb-6">
        Settings
      </h1>
      <div className="flex gap-8 justify-center">
        <div>
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="flex-1 space-y-6">
          <div id="personal" ref={sections[0].ref}>
            <PersonalDetails />
          </div>
          <div
            id="medical"
            ref={sections[1].ref}
            className="scroll-mt-24 mb-10"
          >
            <MedicalVerification userData={userData} />
          </div>
          <div id="affiliation" ref={sections[2].ref}>
            <AffiliationStatus userData={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
