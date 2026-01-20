export type ExternalPharmacyPrescriptionSendFailedResponse = {
  data: {
    reason: string;
    logType: string;
    type: string;
    rawResponse: string;
    isExternalPharmacyError?: boolean;
    entityType: string;
    entityId: string;
    metadata: {
      order: string;
      [key: string]: unknown;
    };
  };
};
