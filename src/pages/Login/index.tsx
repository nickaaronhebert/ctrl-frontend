import LoginForm from "@/components/common/LoginForm";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/redux/slices/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
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
