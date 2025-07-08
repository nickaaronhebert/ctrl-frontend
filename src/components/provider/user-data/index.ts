export const userData = {
  medicalVerification: {
    npi: "CA-PH-001234",
    licenses: [
      { state: "California", credential: "CA-MD-124824" },
      { state: "Texas", credential: "TX-MD-567890" },
      { state: "Arizona", credential: "TX-MI-567895" },
    ],
    deaCredentials: [
      {
        state: "California",
        credential: "CA-DEA-452121",
        expiry: "Sep 5, 2026",
      },
    ],
  },
  affiliations: [
    { name: "MedConnect Pro", status: "Inactive" },
    { name: "GoGoMeds", status: "Inactive" },
  ],
};
