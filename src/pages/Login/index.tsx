import LoginForm from "@/components/common/LoginForm";
import useAuthentication from "@/hooks/use-authentication";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user !== null && user !== undefined) {
      navigate("/provider/warning");
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
