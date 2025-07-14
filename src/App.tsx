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
import CompleteVerification from "./pages/Prescription/initiate-verification";
import SuccessfullVerification from "./pages/Prescription/complete-verification";
import PendingApproval from "./pages/Prescription/pending-approval";
import ModuleProtectedRoute from "./components/common/ModuleProtectedRoute/ModuleProtectedRoute";
import { MODULE, PERMISSIONS } from "./components/Permissions/permissions";
import Support from "./pages/Support/page";
import Redirect from "./components/provider/redirect";
import RoleChecker from "./guard/RoleChecker";

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
        path: "warning",
        element: <PrescriptionPage />,
      },
      {
        path: "start-verification",
        element: <CompleteVerification />,
      },
      {
        path: "complete-verification",
        element: <SuccessfullVerification />,
      },
      {
        path: "pending-approval",
        element: <PendingApproval />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: ROUTES.SUPPORT,
        element: <Support />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
