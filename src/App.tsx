import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { ROUTES } from "./constants/routes";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./components/Layout/AppLayout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetLinkScreen from "./pages/ResetLinkScreen";
import ResetPassword from "./pages/ResetPassword";
import ModuleProtectedRoute from "./components/common/ModuleProtectedRoute/ModuleProtectedRoute";
import { MODULE, PERMISSIONS } from "./components/Permissions/permissions";
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

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <SidebarLayout />,
    children: [
      {
        path: "prescription",
        element: <PrescriptionPage />,
      },
    ],
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: (
          <ModuleProtectedRoute
            element={<Dashboard />}
            permissions={[
              {
                resource: MODULE.DASHBOARD,
                permission: PERMISSIONS.READ,
              },
            ]}
          />
        ),
      },
      {
        path: ROUTES.GET_PROFILE,
        element: (
          <ModuleProtectedRoute
            element={<Profile />}
            permissions={[
              {
                resource: MODULE.PROFILE,
                permission: PERMISSIONS.READ,
              },
            ]}
          />
        ),
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
        path: ROUTES.WELCOME,
        element: <WelcomeProvider />,
      },
      {
        path: ROUTES.CREDENTIAL_VERIFICATION,
        element: <ProviderSteppedForm />,
      },
      {
        path: "/skip-verification",
        element: <SkipMedicalVerification />,
      },
      {
        path: "/onboarding-success",
        element: <OnboardingSuccess />,
      },
    ],
  },

  {
    path: ROUTES.LOGIN,
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
