import Tick from "@/assets/icons/Tick";
import AddMedicalLicenseDialog from "../update-medical-profile";

export default function MedicalVerification({ userData }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-[20px] leading-[24px] text-black">
          Medical Verification
        </h2>
        <AddMedicalLicenseDialog />
      </div>

      <div className="w-full h-px bg-gray-200 mb-4" />

      {userData.medicalVerification.licenses.length === 0 &&
      userData.medicalVerification.deaCredentials.length === 0 ? (
        <div className="flex items-center justify-center font-medium text-[16px] leading-[22px] text-center py-10">
          No medical license added yet.
        </div>
      ) : (
        <div className="space-y-6">
          {/* NPI Section */}
          {userData.medicalVerification.npi && (
            <div>
              <h3 className="font-semibold text-[14px] leadng-[18px] text-black mb-2">
                National Provider Identifier (NPI)
              </h3>
              <div className="bg-light-background rounded-[5px] border border-card-border h-[50px] px-[15px] py-[12px]">
                <span className="text-gray-900 font-medium">
                  {userData.medicalVerification.npi}
                </span>
              </div>
            </div>
          )}

          {/* Licensed State & Credentials */}
          {userData.medicalVerification.licenses.length > 0 && (
            <div>
              <h3 className="font-semibold text-[14px] leading-[18px] text-black mb-2">
                Licensed State & Credentials
              </h3>
              <div>
                {userData.medicalVerification.licenses.map(
                  (license: any, idx: any) => (
                    <div
                      key={idx}
                      className="bg-light-background border border-gray-200 h-[60px] px-[15px] py-[12px] flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium text-[16px] leading-[22px] text-secondary-foreground">
                          {license.state}
                        </span>
                      </div>
                      <div className="flex flex-col items-end ">
                        <div className=" flex gap-2 items-center">
                          <Tick />
                          <span className="text-[14px] font-semibold leading-[18px] text-black">
                            {license.credential}
                          </span>
                        </div>
                        <span className="font-normal text-[10px] leading-[12px]">
                          Expires ---
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* DEA State & Credentials */}
          {userData.medicalVerification.deaCredentials.length > 0 && (
            <div>
              <h3 className="font-semibold text-[14px] leading-[18px] text-black mb-2">
                DEA State & Credentials
              </h3>
              <div>
                {userData.medicalVerification.deaCredentials.map(
                  (dea: any, idx: any) => (
                    <div
                      key={idx}
                      className="bg-light-background border border-card-border h-[60px] px-[15px] py-[12px] flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium text-[16px] leading-[22px] text-secondary-foreground">
                          {dea.state}
                        </span>
                      </div>
                      <div className="flex flex-col items-end ">
                        <span className="text-[14px] font-semibold leading-[18px] text-black">
                          {dea.credential}
                        </span>
                        <span className="font-normal text-[10px] leading-[12px]">
                          Expires ---
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
