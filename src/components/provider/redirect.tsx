import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { LoadingSpinner } from "../ui/loading-spinner";
import { useVerifyProviderInvitationMutation } from "@/redux/services/provider";
import { toast } from "sonner";

export default function Redirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifyProvider, { isSuccess, isError }] =
    useVerifyProviderInvitationMutation();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("provider_token", token);
      verifyProvider({ token });
    } else {
      console.log("token not found");
      //   navigate("/");
    }
  }, [searchParams, verifyProvider, navigate]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/onboarding");
      toast.success("Invitation accepted successfully");
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
