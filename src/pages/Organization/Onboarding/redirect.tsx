import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useVerifyOrganizationInvitationMutation } from "@/redux/services/user";

export default function OrganizationRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [verifyOrgAdmin, { isSuccess, isError }] =
    useVerifyOrganizationInvitationMutation();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("org_admin_token", token);
      verifyOrgAdmin({ token });
    } else {
      navigate("/");
    }
  }, [searchParams, verifyOrgAdmin, navigate]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/organization-onboarding");
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
