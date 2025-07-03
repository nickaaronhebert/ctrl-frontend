import React from "react";
import { useUserHasPermission } from "./UseUserHasPermissions";

interface AuthorizedUsageProps {
  resource: string;
  action: string;
  failure?: React.ReactNode;
  children: React.ReactNode;
}

const AuthorisedUsage: React.FC<AuthorizedUsageProps> = ({
  resource,
  action,
  failure = null,
  children,
}) => {
  const hasPermission = useUserHasPermission(resource, action);
  return <>{hasPermission ? children : failure}</>;
};

export default AuthorisedUsage;
