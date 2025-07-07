import LoginVerificationForm from "@/components/common/LoginVerificationForm";

const LoginVerification = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginVerificationForm />
      </div>
    </div>
  );
};

export default LoginVerification;
