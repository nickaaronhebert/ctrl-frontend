import PersonalDetails from "@/components/provider/personal-details/PersonalDetails";
import ProfileTabs from "@/components/provider/profile-tab/ProfileTab";
import { useState } from "react";
import { userData } from "@/components/provider/user-data";
import MedicalVerification from "@/components/provider/medical-verification/MedicalVerification";
import AffiliationStatus from "@/components/provider/affiliation-status/AffiliationStatus";
import EditProfileDialog from "@/components/common/EditProfileForm/EditProfileForm";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  return (
    <>
      <div className="py-[50px] gap-8">
        <h1 className="font-semibold text-[26px] leading-[30px] text-black mb-6">
          Settings
        </h1>
        <div className="flex gap-8 justify-center">
          <div>
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="flex-1 space-y-6">
            <div id="personal">
              <PersonalDetails onEditProfile={() => setEditProfileOpen(true)} />
            </div>
            <div id="medical" className="scroll-mt-24 mb-10">
              <MedicalVerification userData={userData} />
            </div>
            <div id="affiliation">
              <AffiliationStatus userData={userData} />
            </div>
          </div>
        </div>
      </div>
      {editProfileOpen && (
        <EditProfileDialog
          open={editProfileOpen}
          onOpenChange={setEditProfileOpen}
        />
      )}
    </>
  );
};

export default Settings;
