import React from "react";
import { Navigate } from "react-router-dom";
import useAuthentication from "@/hooks/use-authentication";
import { ROUTES } from "@/constants/routes";
import { useLocation } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface PermissionCheck {
  resource: string;
  permission: string;
}

interface ModuleProtectedRouteProps {
  element: React.ReactElement;
  permissions: PermissionCheck[];
  failureElement?: React.ReactElement;
}

const ModuleProtectedRoute: React.FC<ModuleProtectedRouteProps> = ({
  element,
  permissions,
}) => {
  const { user, isLoadingUserDetails, isLoggedIn } = useAuthentication();
  const location = useLocation();

  console.log("user", user);
  console.log("isLoggedIn", isLoggedIn);
  console.log("isLoading", isLoadingUserDetails);

  if (isLoadingUserDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return (
      <Navigate to={ROUTES.HOME} state={{ from: location.pathname }} replace />
    );
  }

  const hasAllPermissions = permissions.every(({ resource, permission }) =>
    user!?.role?.permissions?.some(
      (p) => p.resource === resource && p.action === permission
    )
  );

  return hasAllPermissions ? (
    element
  ) : (
    <Navigate to={ROUTES.UNAUTHORIZED} replace />
  );
};

export default ModuleProtectedRoute;
