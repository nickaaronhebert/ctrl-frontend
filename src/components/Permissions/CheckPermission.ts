import type { UserDetails } from "@/types/responses/user-details";

export function canAccess(
  user: UserDetails | undefined,
  resource: string,
  action: string
): boolean {
  if (!user) return false;
  return user.role.permissions.some(
    (perm) => perm.resource === resource && perm.action === action
  );
}
