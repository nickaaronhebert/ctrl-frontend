import ResetPasswordForm from "@/components/common/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
