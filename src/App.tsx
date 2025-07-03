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

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
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
    path: ROUTES.LOGIN,
    element: <Login />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
