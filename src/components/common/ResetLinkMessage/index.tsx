import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import AuthHeader from "../AuthHeader/AuthHeader";

const ResetLink = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <AuthHeader
          title=" Forgot Password?"
          description="Type your email and we'll send you an invitation link"
          secondaryDescription=" A password reset link has been sent to your email. Please check your
            inbox - it should arrive within 10 minutes"
        />
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            variant={"outline"}
            className="h-12 border-border-secondary font-semibold text-[16px] leading-[22px] text-center rounded-full w-full md:min-w-[150px] md:w-[163px] md:max-w-[150px] min-h-[52px] md:h-[52px]"
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetLink;
