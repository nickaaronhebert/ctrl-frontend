import LoginVerificationForm from "@/components/common/LoginVerificationForm";
import { useLocation } from "react-router-dom";

const LoginVerification = () => {
  const location = useLocation();

  const { username, password } = location.state || {};

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginVerificationForm username={username} password={password} />
      </div>
    </div>
  );
};

export default LoginVerification;
