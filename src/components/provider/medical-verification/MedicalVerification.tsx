import { Button } from "@/components/ui/button";

export default function MedicalVerification({ userData }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Medical Verification
        </h2>
        <Button
          variant="outline"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          ADD LICENSE
        </Button>
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
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                National Provider Identifier (NPI)
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <span className="text-gray-900 font-medium">
                  {userData.medicalVerification.npi}
                </span>
              </div>
            </div>
          )}

          {/* Licensed State & Credentials */}
          {userData.medicalVerification.licenses.length > 0 ? (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Licensed State & Credentials
              </h3>
              <div className="space-y-3">
                {userData.medicalVerification.licenses.map(
                  (license: any, idx: any) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <span className="text-gray-900 font-medium block">
                          {license.state}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-900 font-medium block">
                          {license.credential}
                        </span>
                        <span className="text-gray-500 text-sm">
                          Expires {license.expiry}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}

          {/* DEA State & Credentials */}
          {userData.medicalVerification.deaCredentials.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                DEA State & Credentials
              </h3>
              <div className="space-y-3">
                {userData.medicalVerification.deaCredentials.map(
                  (dea: any, idx: any) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <span className="text-gray-900 font-medium block">
                          {dea.state}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-900 font-medium block">
                          {dea.credential}
                        </span>
                        <span className="text-gray-500 text-sm">
                          Expires {dea.expiry}
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
