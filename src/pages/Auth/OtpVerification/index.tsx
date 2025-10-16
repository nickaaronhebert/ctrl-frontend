import LoginVerificationForm from "@/components/common/LoginVerificationForm";
import useAuthentication from "@/hooks/use-authentication";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginVerification = () => {
  const location = useLocation();
  const { isLoadingUserDetails, isLoggedIn, user } = useAuthentication();
  const navigate = useNavigate();

  const { username, password } = location.state || {};

  useEffect(() => {
    if (!isLoadingUserDetails && isLoggedIn && user) {
      const role = user.role.name;
      const status = user.providerStatus;

      if (role === "Organization Admin") {
        navigate("/org/dashboard", { replace: true });
      } else if (role === "Provider") {
        if (status === "med_submitted") {
          navigate("/provider/pending-approval", { replace: true });
        } else {
          navigate("/provider/warning", { replace: true });
        }
      } else if (role === "Pharmacy Admin") {
        navigate("/pharmacy/transmissions", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isLoadingUserDetails, isLoggedIn, user, navigate]);

  if (isLoadingUserDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginVerificationForm username={username} password={password} />
      </div>
    </div>
  );
};

export default LoginVerification;
