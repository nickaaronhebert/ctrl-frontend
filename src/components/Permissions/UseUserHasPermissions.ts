import { useEffect, useState } from "react";
import useAuthentication from "@/hooks/use-authentication";
import { canAccess } from "./CheckPermission";

export function useUserHasPermission(
  resource: string,
  action: string
): boolean {
  const { user } = useAuthentication();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (user) {
      const result = canAccess(user, resource, action);
      setHasPermission(result);
    } else {
      setHasPermission(false);
    }
  }, [user, resource, action]);

  return hasPermission;
}
