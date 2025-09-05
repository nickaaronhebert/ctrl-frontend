import { LoadingSpinner } from "@/components/ui/loading-spinner";
import useAuthentication from "@/hooks/use-authentication";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

interface RoleCheckerProps {
  element: React.JSX.Element;
  providerStatus: string;
}

export default function RoleChecker({
  element,
  providerStatus,
}: RoleCheckerProps) {
  const navigate = useNavigate();
  const { user, isLoadingUserDetails, isLoggedIn } = useAuthentication();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, []);

  if (isLoadingUserDetails)
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <LoadingSpinner size={50} />;
      </div>
    );

  if (!user) return null;

  if (user.role.name === "Provider" && user.providerStatus === providerStatus)
    return element;

  if (user.role.name === "Pharmacy Admin") return element;
}
