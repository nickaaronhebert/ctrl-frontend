import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetLinkScreen from "./pages/Auth/ResetLinkScreen";
import ResetPassword from "./pages/Auth/ResetPassword";
// import PermissionDenied from "./pages/Auth/PermissionDenied/PermissionDenied";
import OnboardingLayout from "./components/Layout/Onboarding";
import RegisterProvider from "./components/provider/register";
import WelcomeProvider from "./components/provider/welcome";
import ProviderSteppedForm from "./components/provider/credentials-stepped-form";
import ProviderDashboard from "./pages/Provider/Dashboard";
import LoginVerification from "./pages/Auth/OtpVerification";
import SkipMedicalVerification from "./components/provider/skip-medical-verification";
import OnboardingSuccess from "./components/provider/onboarding-success";
import SidebarLayout from "./components/common/Sidebar/sidebar-layout";
import PrescriptionPage from "./pages/Provider/Prescription";
import Settings from "./pages/Provider/Settings";
import PendingApproval from "./pages/Provider/Prescription/pending-approval";
import ModuleProtectedRoute from "./components/common/ModuleProtectedRoute/ModuleProtectedRoute";
import { MODULE, PERMISSIONS } from "./components/Permissions/permissions";
import Support from "./pages/Provider/Support/page";
import Redirect from "./components/provider/redirect";
import RoleChecker from "./guard/RoleChecker";
import PostLoginRedirect from "./components/common/PostLoginRedirect";
import OrganisationDashboard from "./pages/Organization/Dashboard";
import Medications from "./pages/Organization/MedicationLibrary/Medications";
import OrganizationTransmission from "./pages/Organization/Transmission";
import OrganizationOrder from "./pages/Organization/Order";
import TransmissionDetails from "./pages/Organization/Transmission/details";
import OrganizationAffiliatedProvider from "./pages/Organization/AffiliatedProvider";
import ViewOrderDetails from "./pages/Organization/Order/details";
import MedicationDetails from "./pages/Organization/MedicationLibrary/MedicationDetails";
import CreateOrderPage from "./pages/Organization/CreateOrder";
import AccessControl from "./pages/Organization/AccessControl/AccessUI";
import AccessDetail from "./pages/Organization/AccessControl/AccessDetail";
import PatientList from "./pages/Organization/Patient";
import CreatePatient from "./pages/Organization/Patient/create";
import PatientStatus from "./pages/Organization/Patient/success";
import ViewPatientDetails from "./pages/Organization/Patient/details";
import EditPatient from "./pages/Organization/Patient/edit";
import ActivityLogs from "./pages/Organization/ActivityLogs";
import PharmacyTransmission from "./pages/Pharmacy/Transmission";
import PharmacyInvoices from "./pages/Pharmacy/Invoices";
import RegisterPharmacy from "./components/pharmacy/register";
import PharmacyRedirect from "./components/pharmacy/verify-invitation";
import WelcomePharmacy from "./components/pharmacy/welcome";
import OrganizationSettings from "./pages/Organization/Settings";
import PharmacyTransmissionDetails from "./pages/Pharmacy/Transmission/details";
import Invoices from "./pages/Organization/Invoices";
import PharmacyMedicationsLayout from "./components/Layout/PharmacyMedicationLayout";
import PharmacyMedicationsContent from "./pages/Pharmacy/Medications";
import SetDefaultPrices from "./components/pharmacy/selectedMedications/SelectedMedications";
// import CatalogueCreationCard from "./components/common/CatalogueCreationCard/CatalogueCreationCard";
import ViewInvoiceDetails from "./pages/Organization/Invoices/details";
// import CatalogueCreationSuccess from "./components/common/CatalogueCreationSuccess/CatalogueCreationSuccess";
import PharmacySettings from "./pages/Pharmacy/Settings";
import PharmacyDetailsPage from "./pages/Pharmacy/Medications/details";
import ViewPharmacyInvoiceDetails from "./pages/Pharmacy/Invoices/detail";
import OrgPharmaciesTransmission from "./pages/Organization/Pharmacies";
import Prescriptions from "./pages/Provider/Approve/prescription";
import ModifyPrices from "./components/pharmacy/modifyPrices/ModifyPrices";
import OrganizationRedirect from "./pages/Organization/Onboarding/redirect";
import RegisterOrgAdmin from "./pages/Organization/Onboarding";
import WelcomeOrgAdmin from "./pages/Organization/Onboarding/welcome";
import MedicationCatalogue from "./pages/CTRLAdmin/MedicationCatalogue";
import AdminDashboard from "./pages/CTRLAdmin/Dashboard";
import InviteAdmin from "./pages/CTRLAdmin/Invitation";
import InviteProvider from "./pages/Organization/AffiliatedProvider/Provider";
import OrganizationList from "./pages/CTRLAdmin/Business/Organization";
import CreateOrganization from "./pages/CTRLAdmin/Create/Organization";
import PharmacyList from "./pages/CTRLAdmin/Business/Pharmacy";
import CreatePharmacy from "./pages/CTRLAdmin/Create/Pharmacy";
import InvitationList from "./pages/CTRLAdmin/Invitation/view";
import ViewMedicationCatalogue from "./pages/CTRLAdmin/MedicationCatalogue/view";
import PharmacyOrganizationStatus from "./pages/Pharmacy/Organization";
// import CreateSubOrganization from "./pages/Organization/SubOrganization/Create/CreateSubOrganization";
import ViewSubOrganization from "./pages/Organization/SubOrganization";
import EditMedicationCatalogue from "./pages/CTRLAdmin/MedicationCatalogue/edit";
import Encountered from "./pages/CTRLAdmin/Encountered";
import SubOrganization from "./pages/Organization/SubOrganization/Create";
import AddProductForm from "./pages/CTRLAdmin/Encountered/AddProductForm/AddProductForm";
import ActiveOrgDetails from "./pages/Pharmacy/Organization/Active/details";
import EncounterPage from "./pages/Organization/Encounter";
import EncounterDetails from "./pages/Organization/Encounter/Detail";
import Webhook from "./pages/Organization/Webhook";
import ConfiguredWebhookDetails from "./pages/Organization/Webhook/Configured/Details";
import GetCatalogueList from "./pages/Pharmacy/Catalogues";
import GetAllCatalogues from "./components/common/Card/get-catalogue-card";
// import SelectedCatalogues from "./components/pharmacy/selectedCatalogues/selectedCatalogues";
import SelectedCatalogues from "./components/pharmacy/selectedCatalogues/SelectedCatalogues";
import PharmacyCatalogueDetails from "./pages/Pharmacy/Catalogues/details";
import ConfigureCatalogues from "./pages/Pharmacy/Catalogues/configure";
import SelectedPlanCatalogues from "./components/pharmacy/selectedPlanCatalogues/SelectedPlanCatalogues";
import ModifyPlanPrices from "./components/pharmacy/modifyPlanPrices";
import PharmacySupplies from "./pages/Pharmacy/Supplies";
import ShippingConfiguration from "./pages/Pharmacy/ShippingConfiguration";
import FulfillmentTracking from "./pages/Organization/FulfillmentTracking";
import SelectedSpecialCatalogues from "./components/pharmacy/selectedSpecialCatalogues";
import SubOrgDashboard from "./pages/SubOrg/Dashboard";
import SubOrgTransmissions from "./pages/SubOrg/Transmission";
import SubOrgTransmissionDetail from "./pages/SubOrg/Transmission/details";
import SubOrgOrder from "./pages/SubOrg/Order";
import SubOrgInvoices from "./pages/SubOrg/Invoices";
import MedicationLibrary from "./pages/SubOrg/MedicationLibrary";
import ActivityLog from "./pages/SubOrg/ActivityLog";
import SubOrgOrderDetails from "./pages/SubOrg/Order/details";
import SubOrgInvoiceDetails from "./pages/SubOrg/Invoices/details";
import SubOrgSettings from "./pages/SubOrg/Settings";
import SubOrgPatientList from "./pages/SubOrg/Patient";

const router = createBrowserRouter([
  {
    path: "/provider",
    element: (
      <ModuleProtectedRoute
        element={<SidebarLayout />}
        permissions={[
          {
            resource: MODULE.PRESCRIPTION,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.TRANSMISSION,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ORDER,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.PRESCRIPTION,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.DELETE,
          },
        ]}
      />
    ),
    children: [
      {
        path: ROUTES.WARNING,
        element: <PrescriptionPage />,
      },
      {
        path: ROUTES.PENDING_APPROVAL,
        element: <PendingApproval />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
      {
        path: ROUTES.SUPPORT,
        element: <Support />,
      },
      {
        path: ROUTES.APPROVE_PRESCRIPTION,
        element: <Prescriptions />,
      },
    ],
  },
  {
    path: "/org",
    element: (
      <ModuleProtectedRoute
        element={<SidebarLayout />}
        permissions={[
          {
            resource: MODULE.BUSINESS,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.BUSINESS,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ORDER,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ORDER,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.ORDER,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ORDER,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.ACCESS_CONTROL,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ACCESS_CONTROL,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ACCESS_CONTROL,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.ACCESS_CONTROL,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.PRESCRIPTION,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.PRESCRIPTION,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.PRESCRIPTION,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.PHARMACY_CATALOGUE,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.MEDICATION_CATALOGUE,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.PROVIDER_GROUP_INVITATION,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.DELETE,
          },
        ]}
      />
    ),
    children: [
      {
        path: ROUTES.ORG_DASHBOARD,
        element: <OrganisationDashboard />,
      },
      {
        path: ROUTES.ORG_TRANSMISSIONS,
        element: <OrganizationTransmission />,
      },
      {
        path: ROUTES.ORG_TRANSMISSION_TRACKING,
        element: <FulfillmentTracking />,
      },

      {
        path: ROUTES.ORG_ORDERS,
        element: <OrganizationOrder />,
      },
      {
        path: ROUTES.ORG_ORDER_DETAILS,
        element: <ViewOrderDetails />,
      },
      {
        path: ROUTES.ORG_CREATE_ORDER,
        element: <CreateOrderPage />,
      },
      {
        path: ROUTES.ORG_ENCOUNTER,
        element: <EncounterPage />,
      },
      {
        path: ROUTES.ORG_ENCOUNTER_DETAILS,
        element: <EncounterDetails />,
      },

      {
        path: ROUTES.ORG_PROVIDERS,
        element: <OrganizationAffiliatedProvider />,
      },
      {
        path: ROUTES.ORG_WEBHOOK,
        element: <Webhook />,
      },
      {
        path: ROUTES.ORG_WEBHOOK_DETAILS,
        element: <ConfiguredWebhookDetails />,
      },
      {
        path: ROUTES.ORG_VIEW_PATIENT,
        element: <PatientList />,
      },
      {
        path: ROUTES.ORG_CREATE_PATIENT,
        element: <CreatePatient />,
      },
      {
        path: ROUTES.ORG_PATIENT_SUCCESS,
        element: <PatientStatus />,
      },
      {
        path: ROUTES.ORG_EDIT_PATIENT,
        element: <EditPatient />,
      },
      {
        path: ROUTES.ORG_VIEW_PATIENT_DETAILS,
        element: <ViewPatientDetails />,
      },
      {
        path: ROUTES.ORG_TRANSACTIONS,
        element: <Invoices />,
      },
      {
        path: ROUTES.ORG_MEDICATIONS,
        element: <Medications />,
      },
      {
        path: ROUTES.ORG_MEDICATION_DETAILS,
        element: <MedicationDetails />,
      },

      {
        path: ROUTES.ORG_ACTIVITY_LOG,
        element: <ActivityLogs />,
      },
      {
        path: ROUTES.ORG_SETTINGS,
        element: <OrganizationSettings />,
      },
      {
        path: ROUTES.ORG_INVITE_PROVIDERS,
        element: <InviteProvider />,
      },
      {
        path: ROUTES.VIEW_TRANSMISSION_DETAIL,
        element: <TransmissionDetails />,
      },
      {
        path: ROUTES.VIEW_TRANSACTION_DETAIL,
        element: <ViewInvoiceDetails />,
      },
      {
        path: ROUTES.ORG_ACCESS_CONTROL,
        element: <AccessControl />,
      },
      {
        path: ROUTES.ORG_MEDICATION_SELECTION,
        element: <AccessDetail />,
      },
      {
        path: ROUTES.ORG_PHARMACIES_TRANSMISSIONS,
        element: <OrgPharmaciesTransmission />,
      },
      {
        path: ROUTES.CREATE_SUB_ORGANIZATION,
        element: <SubOrganization />,
      },
      {
        path: ROUTES.VIEW_SUB_ORGANIZATION,
        element: <ViewSubOrganization />,
      },
    ],
  },

  {
    path: "/sub-org",
    element: (
      <ModuleProtectedRoute
        element={<SidebarLayout />}
        permissions={[
          {
            resource: MODULE.BUSINESS,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.BUSINESS,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ORDER,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ORDER,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.ORDER,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ORDER,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.ACCESS_CONTROL,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ACCESS_CONTROL,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ACCESS_CONTROL,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.ACCESS_CONTROL,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.PRESCRIPTION,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.PRESCRIPTION,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.PRESCRIPTION,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.PHARMACY_CATALOGUE,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.MEDICATION_CATALOGUE,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.PROVIDER_GROUP_INVITATION,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.DELETE,
          },
        ]}
      />
    ),
    children: [
      {
        path: ROUTES.SUB_ORG_DASHBOARD,
        element: <SubOrgDashboard />,
      },
      {
        path: ROUTES.SUB_ORG_ORDERS,
        element: <SubOrgOrder />,
      },
      {
        path: ROUTES.SUB_ORG_ORDER_DETAILS,
        element: <SubOrgOrderDetails />,
      },
      {
        path: ROUTES.SUB_ORG_TRANSMISSION,
        element: <SubOrgTransmissions />,
      },
      {
        path: ROUTES.SUB_ORG_TRANSMISSION_DETAIL,
        element: <SubOrgTransmissionDetail />,
      },
      {
        path: ROUTES.SUB_ORG_VIEW_PATIENT,
        element: <SubOrgPatientList />,
      },
      {
        path: ROUTES.SUB_ORG_CREATE_PATIENT,
        element: <CreatePatient />,
      },
      {
        path: ROUTES.SUB_ORG_PATIENT_SUCCESS,
        element: <PatientStatus />,
      },
      {
        path: ROUTES.SUB_ORG_EDIT_PATIENT,
        element: <EditPatient />,
      },
      {
        path: ROUTES.SUB_ORG_VIEW_PATIENT_DETAILS,
        element: <ViewPatientDetails />,
      },
      {
        path: ROUTES.SUB_ORG_INVOICES,
        element: <SubOrgInvoices />,
      },
      {
        path: ROUTES.SUB_ORG_INVOICE_DETAIL,
        element: <SubOrgInvoiceDetails />,
      },

      {
        path: ROUTES.SUB_ORG_MEDICATIONS,
        element: <MedicationLibrary />,
      },
      {
        path: ROUTES.SUB_ORG_ACTIVITY_LOG,
        element: <ActivityLog />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <SubOrgSettings />,
      },
    ],
  },

  // Pharmacy admin dashboard //
  {
    path: "/pharmacy",
    element: (
      <ModuleProtectedRoute
        element={<SidebarLayout />}
        permissions={[
          {
            resource: MODULE.PRESCRIPTION,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.PHARMACY_CATALOGUE,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.PHARMACY_CATALOGUE,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.TRANSMISSION,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.PHARMACY_CATALOGUE,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.PHARMACY_CATALOGUE,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.MEDICATION_CATALOGUE,
            permission: PERMISSIONS.READ,
          },
        ]}
      />
    ),
    children: [
      {
        path: ROUTES.PHARMACY_TRANSMISSIONS,
        element: <PharmacyTransmission />,
      },
      {
        path: ROUTES.PHARMACY_INVOICES,
        element: <PharmacyInvoices />,
      },
      {
        path: ROUTES.PHARMACY_INVOICES_DETAILS,
        element: <ViewPharmacyInvoiceDetails />,
      },
      {
        path: ROUTES.PHARMACY_MEDICATIONS,
        element: <PharmacyMedicationsLayout />,
        children: [
          // These below routes are for default catalogues //
          {
            path: ROUTES.PHARMACY_CONFIGURE,
            element: <PharmacyMedicationsContent />,
          },
          {
            path: ROUTES.PHARMACY_SELECTED_MEDICATIONS,
            element: <SetDefaultPrices />,
          },
          {
            path: ROUTES.PHARMACY_MODIFY_PRICES,
            element: <ModifyPrices />,
          },
          {
            path: `${ROUTES.VIEW_CATALOGUE}/:id?`,
            element: <PharmacyDetailsPage />,
          },
          // These below routes are for plan catalogues //
          {
            path: `${ROUTES.CONFIGURE_CATALOGUES}/:id?`,
            element: <ConfigureCatalogues />,
          },
          {
            path: `${ROUTES.GET_SELECTED_PLAN_CATALOGUES}/:id?`,
            element: <SelectedPlanCatalogues />,
          },
          {
            path: `${ROUTES.GET_SELECTED_SPECIAL_CATALOGUES}/:id?`,
            element: <SelectedSpecialCatalogues />,
          },
          {
            path: `${ROUTES.MODIFY_PLAN_PRICES}/:id?`,
            element: <ModifyPlanPrices />,
          },
          {
            path: ROUTES.PHARMACY_CATALOGUES,
            element: <GetCatalogueList />,
          },
          {
            path: `${ROUTES.GET_ALL_CATALOGUES}/:id?`,
            element: <GetAllCatalogues />,
          },
          {
            path: `${ROUTES.GET_SELECTED_CATALOGUES}/:id?`,
            element: <SelectedCatalogues />,
          },
          {
            path: `${ROUTES.PLAN_CATALOGUES}/:id`,
            element: <PharmacyCatalogueDetails />,
          },
        ],
      },
      {
        path: ROUTES.PHARMACY_SETTINGS,
        element: <PharmacySettings />,
      },
      {
        path: ROUTES.PHARMACY_ORGANIZATIONS,
        element: <PharmacyOrganizationStatus />,
      },
      {
        path: `${ROUTES.PHARMACY_ACTIVE_ORGANIZATIONS}/:id`,
        element: <ActiveOrgDetails />,
      },
      {
        path: `${ROUTES.PHARMACY_TRANSMISSIONS}/:id`,
        element: <PharmacyTransmissionDetails />,
      },
      {
        path: ROUTES.PHARMACY_SUPPLIES,
        element: <PharmacySupplies />,
      },
      {
        path: ROUTES.PHARMACY_SHIPPING,
        element: <ShippingConfiguration />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ModuleProtectedRoute
        element={<SidebarLayout />}
        permissions={[
          {
            resource: MODULE.PRESCRIPTION,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.MEDICATION_CATALOGUE,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.MEDICATION_CATALOGUE,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.MEDICATION_CATALOGUE,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.MEDICATION_CATALOGUE,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.BUSINESS,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.BUSINESS,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.BUSINESS,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.BUSINESS,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.PHARMACY_CATALOGUE,
            permission: PERMISSIONS.WRITE,
          },

          {
            resource: MODULE.PHARMACY_CATALOGUE,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.DELETE,
          },
          {
            resource: MODULE.ME,
            permission: PERMISSIONS.UPDATE,
          },
          {
            resource: MODULE.ORGANIZATION_ADMIN_INVITATION,
            permission: PERMISSIONS.WRITE,
          },
          {
            resource: MODULE.TRANSMISSION,
            permission: PERMISSIONS.READ,
          },
          {
            resource: MODULE.PATIENT,
            permission: PERMISSIONS.READ,
          },
        ]}
      />
    ),
    children: [
      {
        path: ROUTES.ADMIN_DASHBOARD,
        element: <AdminDashboard />,
      },
      {
        path: ROUTES.ADMIN_ORGANIZATION,
        element: <OrganizationList />,
      },
      {
        path: ROUTES.CREATE_ORGANIZATION,
        element: <CreateOrganization />,
      },
      {
        path: ROUTES.CREATE_PHARMACY,
        element: <CreatePharmacy />,
      },
      {
        path: ROUTES.ADMIN_PHARMACY,
        element: <PharmacyList />,
      },
      {
        path: ROUTES.CREATE_MEDICATION,
        element: <MedicationCatalogue />,
      },
      {
        path: ROUTES.EDIT_MEDICATION,
        element: <EditMedicationCatalogue />,
      },
      {
        path: ROUTES.CTRL_MEDICATIONS,
        element: <ViewMedicationCatalogue />,
      },
      {
        path: ROUTES.CTRL_ADMIN_MEDICATION_DETAILS,
        element: <MedicationDetails />,
      },
      {
        path: ROUTES.INVITATION,
        element: <InvitationList />,
      },
      {
        path: ROUTES.SEND_INVITATION,
        element: <InviteAdmin />,
      },
      {
        path: ROUTES.ADMIN_ENCOUNTERED,
        element: <Encountered />,
      },
      {
        path: ROUTES.ADMIN_PRODUCT,
        element: <AddProductForm />,
      },
    ],
  },

  {
    element: (
      <RoleChecker
        element={<OnboardingLayout />}
        providerStatus={"invitation_accepted"}
      />
    ),
    children: [
      {
        path: ROUTES.WELCOME,
        element: <WelcomeProvider />,
      },
      {
        path: ROUTES.WELCOME_PHARMACY,
        element: <WelcomePharmacy />,
      },
      {
        path: ROUTES.WELCOME_ORGANIZATION_ADMIN,
        element: <WelcomeOrgAdmin />,
      },
      {
        path: ROUTES.CREDENTIAL_VERIFICATION,
        element: <ProviderSteppedForm slug="onboarding" />,
      },
      {
        path: "/skip-verification",
        element: <SkipMedicalVerification />,
      },
    ],
  },

  {
    element: (
      <RoleChecker
        element={<OnboardingLayout />}
        providerStatus={"med_submitted"}
      />
    ),
    children: [
      {
        path: "/onboarding-success",
        element: <OnboardingSuccess />,
      },
    ],
  },
  {
    element: <OnboardingLayout />,
    children: [
      {
        path: ROUTES.PHARMACY_ONBOARDING,
        element: <RegisterPharmacy />,
      },
      {
        path: ROUTES.ONBOARDING,
        element: <RegisterProvider />,
      },

      {
        path: ROUTES.ORGANIZATION_ADMIN_ONBOARDING,
        element: <RegisterOrgAdmin />,
      },

      {
        path: ROUTES.REDIRECT,
        element: <Redirect />,
      },
      {
        path: ROUTES.PHARMACY_REDIRECT,
        element: <PharmacyRedirect />,
      },
      {
        path: ROUTES.ORGANIZATION_REDIRECT,
        element: <OrganizationRedirect />,
      },
    ],
  },

  {
    path: ROUTES.HOME,
    element: <Login />,
  },
  {
    path: ROUTES.LOGIN_VERIFICATION,
    element: <LoginVerification />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.RESET_LINK,
    element: <ResetLinkScreen />,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  // {
  //   path: ROUTES.UNAUTHORIZED,
  //   element: <PermissionDenied />,
  // },
  {
    path: ROUTES.PROVIDER_DASHBOARD,
    element: <ProviderDashboard />,
  },
  {
    path: ROUTES.POST_LOGIN_REDIRECT,
    element: <PostLoginRedirect />,
  },
]);

function App() {
  console.log(
    "App running in live mode123",
    import.meta.env.VITE_CTRL_FE_BUILD
  );
  return <RouterProvider router={router} />;
}

export default App;
