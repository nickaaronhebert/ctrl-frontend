import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetLinkScreen from "./pages/ResetLinkScreen";
import ResetPassword from "./pages/ResetPassword";
import PermissionDenied from "./pages/PermissionDenied/PermissionDenied";
import OnboardingLayout from "./components/Layout/Onboarding";
import RegisterProvider from "./components/provider/register";
import WelcomeProvider from "./components/provider/welcome";
import ProviderSteppedForm from "./components/provider/credentials-stepped-form";
import ProviderDashboard from "./pages/ProviderDashboard";
import LoginVerification from "./pages/LoginVerification";
import SkipMedicalVerification from "./components/provider/skip-medical-verification";
import OnboardingSuccess from "./components/provider/onboarding-success";
import SidebarLayout from "./components/common/Sidebar/sidebar-layout";
import PrescriptionPage from "./pages/Prescription";
import Settings from "./pages/Settings";
import PendingApproval from "./pages/Prescription/pending-approval";
import ModuleProtectedRoute from "./components/common/ModuleProtectedRoute/ModuleProtectedRoute";
import { MODULE, PERMISSIONS } from "./components/Permissions/permissions";
import Support from "./pages/Support/page";
import Redirect from "./components/provider/redirect";
import RoleChecker from "./guard/RoleChecker";
import PostLoginRedirect from "./components/common/PostLoginRedirect";
import OrganisationDashboard from "./pages/OrganizationDashboard";

import Transactions from "./pages/Transactions";
import Medications from "./pages/Medications";
import Pharmacies from "./pages/Pharmacies";
import ActivityLog from "./pages/ActivityLog";
import OrgSettings from "./pages/OrgSettings";
import OrganizationTransmission from "./pages/OrganizationTransmission";
import OrganizationOrder from "./pages/OrganizationOrder";

import TransmissionDetails from "./pages/OrganizationTransmission/details";
import OrganizationAffiliatedProvider from "./pages/OrganizationAffiliatedProvider";
import ViewOrderDetails from "./pages/OrganizationOrder/details";
import MedicationDetails from "./pages/MedicationDetails";

import CreateOrderPage from "./pages/CreateOrder";
import AccessControl from "./pages/AccessUI";
import AccessDetail from "./pages/AccessDetail";
import PatientList from "./pages/Organization/Patient";
import CreatePatient from "./pages/Organization/Patient/create";
import PatientStatus from "./pages/Organization/Patient/success";
// import EditPatient from "./pages/Organization/Patient/edit";
import ViewPatientDetails from "./pages/Organization/Patient/details";
import EditPatient from "./pages/Organization/Patient/edit";

const router = createBrowserRouter([
  {
    path: "/provider",
    element: (
      <ModuleProtectedRoute
        element={<SidebarLayout />}
        permissions={[
          {
            resource: MODULE.PROVIDER,
            permission: PERMISSIONS.READ,
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
        element: <Transactions />,
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
        path: ROUTES.ORG_PHARMACIES,
        element: <Pharmacies />,
      },
      {
        path: ROUTES.ORG_ACTIVITY_LOG,
        element: <ActivityLog />,
      },
      {
        path: ROUTES.ORG_SETTINGS,
        element: <OrgSettings />,
      },
      {
        path: "/org/transmissions/:id",
        element: <TransmissionDetails />,
      },
      {
        path: ROUTES.ORG_ACCESS_CONTROL,
        element: <AccessControl />,
      },
      {
        path: ROUTES.ORG_MEDICATION_SELECTION,
        element: <AccessDetail />,
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
        path: ROUTES.ONBOARDING,
        element: <RegisterProvider />,
      },

      {
        path: "/redirect",
        element: <Redirect />,
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
  return <RouterProvider router={router} />;
}

export default App;
