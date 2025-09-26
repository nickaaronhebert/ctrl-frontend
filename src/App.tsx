import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetLinkScreen from "./pages/Auth/ResetLinkScreen";
import ResetPassword from "./pages/Auth/ResetPassword";
import PermissionDenied from "./pages/Auth/PermissionDenied/PermissionDenied";
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
import CatalogueCreationSuccess from "./components/common/CatalogueCreationSuccess/CatalogueCreationSuccess";
import PharmacySettings from "./pages/Pharmacy/Settings";
import PharmacyDetailsPage from "./pages/Pharmacy/Medications/details";
import ViewPharmacyInvoiceDetails from "./pages/Pharmacy/Invoices/detail";
import OrgPharmaciesTransmission from "./pages/Organization/Pharmacies";
import Prescriptions from "./pages/Provider/Approve/prescription";
import ModifyPrices from "./components/pharmacy/modifyPrices/ModifyPrices";
import OrganizationRedirect from "./pages/Organization/Onboarding/redirect";
import RegisterOrgAdmin from "./pages/Organization/Onboarding";
import WelcomeOrgAdmin from "./pages/Organization/Onboarding/welcome";
// import AdminDashboard from "./pages/CTRLAdmin/Create";
// import CreatePharmacy from "./pages/CTRLAdmin/Create/Pharmacy";
import CreateOrgPharmacyForm from "./pages/CTRLAdmin/Create";
import MedicationCatalogue from "./pages/CTRLAdmin/MedicationCatalogue";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <CreateOrgPharmacyForm />,
  },
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
        path: ROUTES.ORG_PROVIDERS,
        element: <OrganizationAffiliatedProvider />,
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
      // {
      //   path: ROUTES.CATALOGUE_CREATION,
      //   element: <CatalogueCreationCard />,
      // },
      {
        path: ROUTES.PHARMACY_MEDICATIONS,
        element: <PharmacyMedicationsLayout />,
        children: [
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
            path: ROUTES.CATALOGUE_CREATION_SUCCESS,
            element: <CatalogueCreationSuccess />,
          },
          {
            path: ROUTES.VIEW_CATALOGUE,
            element: <PharmacyDetailsPage />,
          },
        ],
      },
      {
        path: ROUTES.PHARMACY_SETTINGS,
        element: <PharmacySettings />,
      },
      {
        path: `${ROUTES.PHARMACY_TRANSMISSIONS}/:id`,
        element: <PharmacyTransmissionDetails />,
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
        element: <CreateOrgPharmacyForm />,
      },
      {
        path: ROUTES.CREATE_MEDICATION,
        element: <MedicationCatalogue />,
      },
      // {
      //   path: ROUTES.CREATE_PHARMACY,
      //   element: <CreatePharmacy />,
      // },
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
  {
    path: ROUTES.UNAUTHORIZED,
    element: <PermissionDenied />,
  },
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
  console.log("App running in live");
  return <RouterProvider router={router} />;
}

export default App;
