export interface UpdatePharmacyCatalogueRequest {
  inStock: boolean;
  pharmacyDescriptor: string;
  primaryPharmacyIdentifier: string;
  secondaryPharmacyIdentifier?: string;
  drugStrength: string;
  drugForm: string;
  scheduleCode?: string;
  shippingClass: string;
}
