import LoginForm from "@/components/common/LoginForm";
// import PostLoginRedirect from "@/components/common/PostLoginRedirect";
import { useNavigate } from "react-router-dom";
import useAuthentication from "@/hooks/use-authentication";
import { useEffect } from "react";

const Login = () => {
  const { isLoadingUserDetails, isLoggedIn, user } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingUserDetails && isLoggedIn && user) {
      console.log("user>>>>", user);
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
      } else if (role === "Platform Admin") {
        navigate("/admin/dashboard");
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
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

// useEffect(() => {
//   if (!isLoadingUserDetails && isLoggedIn) {
//     navigate(-1);
//   }
// }, [isLoggedIn, isLoadingUserDetails, navigate]);

// if (isLoadingUserDetails) {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-lg font-medium text-gray-700">Loading...</p>
//     </div>
//   );
// }
