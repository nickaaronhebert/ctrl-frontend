import LoginForm from "@/components/common/LoginForm";
// import PostLoginRedirect from "@/components/common/PostLoginRedirect";
import { useNavigate } from "react-router-dom";
import useAuthentication from "@/hooks/use-authentication";
import { useEffect } from "react";

const Login = () => {
  const { isLoadingUserDetails, isLoggedIn } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingUserDetails && isLoggedIn) {
      navigate(-1);
    }
  }, [isLoggedIn, isLoadingUserDetails, navigate]);

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
