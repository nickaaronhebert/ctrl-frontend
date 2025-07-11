import ResetPasswordForm from "@/components/common/ResetPasswordForm";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get("access_token");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }

    //  Remove token from URL without reloading
    searchParams.delete("access_token");
    navigate({ search: searchParams.toString() }, { replace: true });
  }, [location.search, navigate]);

  console.log("token", token);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPassword;
