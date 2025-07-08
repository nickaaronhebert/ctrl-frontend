import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "@/redux/slices/auth";
import { ROUTES } from "@/constants/routes";

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
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const hasAllPermissions = permissions.every(({ resource, permission }) =>
    user.role?.permissions?.some(
      (p) => p.resource === resource && p.action === permission
    )
  );

  return hasAllPermissions ? element : <Navigate to={ROUTES.UNAUTHORIZED} />;
};

export default ModuleProtectedRoute;
