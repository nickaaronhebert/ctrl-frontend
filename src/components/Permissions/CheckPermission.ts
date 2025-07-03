import { type User } from "@/types/global/commonTypes";

export function canAccess(
  user: User | undefined,
  resource: string,
  action: string
): boolean {
  if (!user) return false;
  return user.role.permissions.some(
    (perm) => perm.resource === resource && perm.action === action
  );
}
