import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useVerifyPharmacyInvitationMutation } from "@/redux/services/pharmacy";

export default function PharmacyRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [verifyPharmacy, { isSuccess, isError }] =
    useVerifyPharmacyInvitationMutation();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("pharmacy_token", token);
      verifyPharmacy({ token });
    } else {
      // console.log("token not found");
      navigate("/");
    }
  }, [searchParams, verifyPharmacy, navigate]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/pharmacy-onboarding");
    } else if (isError) {
      console.log("something went wrong");
    }
  }, [isSuccess, isError, navigate]);

  return (
    <div className="h-[650px] flex items-center justify-center">
      <LoadingSpinner size={50} />
    </div>
  );
}
