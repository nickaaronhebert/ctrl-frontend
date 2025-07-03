import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slices/auth";
import { canAccess } from "@/components/Permissions/CheckPermission";

export function useUserHasPermission(
  resource: string,
  action: string
): boolean {
  const user = useSelector(selectCurrentUser);
  return canAccess(user!, resource, action);
}
