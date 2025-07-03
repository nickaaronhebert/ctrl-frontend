import { Button } from "@/components/ui/button";
import CTRLLogo from "../CTRLLogo";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const ResetLink = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-center mb-6">
          <CTRLLogo />
        </div>
        <div className="text-center my-8">
          <h1 className="text-primary-foreground font-semibold text-[26px] leading-[30px] mb-2">
            Forgot Password?
          </h1>
          <p className="text-muted-foreground font-normal leading-[22px] text-[16px]">
            Type your email and we'll send you an invitation link
          </p>
          <p className="font-semibold text-[16px] md:text-[18px] leading-[23px] md:leading-[26px] text-black mt-4">
            A password reset link has been sent to your email. Please check your
            inbox - it should arrive within 10 minutes
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            variant={"outline"}
            className=" h-12 font-medium rounded-full min-w-[150px] min-h-[52px]"
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
