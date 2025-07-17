import PersonalDetails from "@/components/provider/personal-details/PersonalDetails";
import ProfileTabs from "@/components/provider/profile-tab/ProfileTab";
import { useState } from "react";
import MedicalVerification from "@/components/provider/medical-verification/MedicalVerification";
import AffiliationStatus from "@/components/provider/affiliation-status/AffiliationStatus";
import EditProfileDialog from "@/components/common/EditProfileForm/EditProfileForm";
import useAuthentication from "@/hooks/use-authentication";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const { user } = useAuthentication();

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
              <PersonalDetails
                onEditProfile={() => setEditProfileOpen(true)}
                user={user!}
              />
            </div>
            <div id="medical" className="scroll-mt-24 mb-10">
              <MedicalVerification user={user!} />
            </div>
            <div id="affiliation">
              <AffiliationStatus userData={user!} />
            </div>
          </div>
        </div>
      </div>
      {editProfileOpen && (
        <EditProfileDialog
          open={editProfileOpen}
          onOpenChange={setEditProfileOpen}
          user={user!}
        />
      )}
    </>
  );
};

export default Settings;
