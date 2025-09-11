import ForgotPasswordForm from "@/components/common/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
