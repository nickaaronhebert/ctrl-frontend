export type Pharmacy = {
  name: string;
  id: string;
};

export type PendingTransmission = {
  transmissionId: string;
  pharmacy: Pharmacy;
  transmittedOn: string;
};

export type TrackedTransmission = {
  transmissionId: string;
  status: string;
  pharmacy: Pharmacy;
  trackingNumber: string;
  trackedOn: string;
};
