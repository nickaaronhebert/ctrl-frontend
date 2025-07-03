import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "@/redux/slices/auth";
import { canAccess } from "./CheckPermission";

export function useUserHasPermission(
  resource: string,
  action: string
): boolean {
  const user = useSelector(selectCurrentUser);
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
