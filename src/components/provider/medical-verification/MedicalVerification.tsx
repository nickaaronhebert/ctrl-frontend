import Tick from "@/assets/icons/Tick";
import type { UserDetails } from "@/types/responses/user-details";
import AddMedicalLicenseDialog from "../update-medical-profile";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MedicalLicense {
  _id: string;
  licenseNumber: string;
  state: string;
}

interface DEA {
  _id: string;
  registrationNumber: string;
  state: string;
}

interface MedicalVerificationProps {
  user: UserDetails;
  medicalLicense?: MedicalLicense[];
  deaNumber?: DEA[];
}

export default function MedicalVerification({
  user,
}: MedicalVerificationProps) {
  const [openAddLicenseModal, setOpenLicenseModal] = useState(false);

  console.log("Medical Licenses:: ", user?.medicalLicense);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-[20px] leading-[24px] text-black">
            Medical Verification
          </h2>
          <Button
            variant="outline"
            className="min-w-[80px] min-h-[32px] font-bold text-[12px] leading-[16px] rounded-[4px] border-1 border-black px-[10px] py-[5px] cursor-pointer"
            onClick={() => setOpenLicenseModal(!openAddLicenseModal)}
          >
            ADD LICENSE
          </Button>
        </div>

        <div className="w-full h-px bg-gray-200 mb-4" />

        {user?.medicalLicense?.length === 0 && user?.deaNumber?.length === 0 ? (
          <div className="flex items-center justify-center font-medium text-[16px] leading-[22px] text-center py-10">
            No medical license added yet.
          </div>
        ) : (
          <div className="space-y-6">
            {/* NPI Section */}
            {user?.npi && (
              <div>
                <h3 className="font-semibold text-[14px] leadng-[18px] text-black mb-2">
                  National Provider Identifier (NPI)
                </h3>
                <div className="bg-light-background rounded-[5px] border border-card-border h-[50px] px-[15px] py-[12px]">
                  <span className="text-gray-900 font-medium">{user?.npi}</span>
                </div>
              </div>
            )}

            {/* Licensed State & Credentials */}
            {user?.medicalLicense?.length! > 0 && (
              <div>
                <h3 className="font-semibold text-[14px] leading-[18px] text-black mb-2">
                  Licensed State & Credentials
                </h3>
                <div>
                  {user?.medicalLicense?.map((license: MedicalLicense) => (
                    <div
                      key={license._id}
                      className="bg-light-background border border-gray-200 h-[60px] px-[15px] py-[12px] flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium uppercase text-[16px] leading-[22px] text-secondary-foreground">
                          {license.state}
                        </span>
                      </div>
                      <div className="flex flex-col items-end ">
                        <div className=" flex gap-2 items-center">
                          <Tick />
                          <span className="text-[14px] font-semibold leading-[18px] text-black">
                            {license.licenseNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEA State & Credentials */}
            {user?.deaNumber?.length! > 0 && (
              <div>
                <h3 className="font-semibold text-[14px] leading-[18px] text-black mb-2">
                  DEA State & Credentials
                </h3>
                <div>
                  {user?.deaNumber?.map((dea: DEA) => (
                    <div
                      key={dea._id}
                      className="bg-light-background border border-card-border h-[60px] px-[15px] py-[12px] flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium uppercase text-[16px] leading-[22px] text-secondary-foreground">
                          {dea.state}
                        </span>
                      </div>
                      <div className="flex flex-col items-end ">
                        <span className="text-[14px] font-semibold leading-[18px] text-black">
                          {dea.registrationNumber}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <AddMedicalLicenseDialog
        openAddLicenseModal={openAddLicenseModal}
        setOpenLicenseModal={setOpenLicenseModal}
      />
    </>
  );
}
