import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "@/hooks/use-authentication";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const PostLoginRedirect = () => {
  const { user, isLoadingUserDetails, isLoggedIn } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingUserDetails && isLoggedIn && user) {
      const status = user.providerStatus;
      const role = user.role.name;

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
        navigate("/unauthorized", { replace: true });
      }
    }
  }, [isLoadingUserDetails, isLoggedIn, user, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <LoadingSpinner size={40} />
      <p className="ml-4 text-muted-foreground">Loading your dashboard...</p>
    </div>
  );
};

export default PostLoginRedirect;
