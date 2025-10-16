import { ShieldX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useAuthentication from "@/hooks/use-authentication";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PermissionDenied = () => {
  const { user, isLoadingUserDetails, isLoggedIn } = useAuthentication();
  const navigate = useNavigate();

  console.log("user>>>", user);

  useEffect(() => {
    if (!isLoadingUserDetails && isLoggedIn) {
      if (!user || !user.role?.name) {
        navigate("/", { replace: true }); // Redirect to login if no user or role
        return;
      }

      const role = user.role.name;
      const status = user.providerStatus;

      switch (role) {
        case "Organization Admin":
          navigate("/org/dashboard", { replace: true });
          break;
        case "Provider":
          if (status === "med_submitted") {
            navigate("/provider/pending-approval", { replace: true });
          } else {
            navigate("/provider/warning", { replace: true });
          }
          break;
        case "Pharmacy Admin":
          navigate("/pharmacy/transmissions", { replace: true });
          break;
        case "Platform Admin":
          navigate("/admin/dashboard", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    }
  }, [user, isLoadingUserDetails, isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        {/* Animated Shield Icon */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <ShieldX className="w-32 h-32 mx-auto text-red-200 opacity-75" />
          </div>
          <ShieldX className="w-32 h-32 mx-auto text-red-500 relative z-10" />
        </div>

        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-red-600 tracking-tight animate-pulse">
            403
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Access Denied
          </h2>
          <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
            Sorry, you don't have permission to access this resource. Your
            access level is insufficient for this content.
          </p>
        </div>

        {/* Information Card */}
        <Card className="max-w-md mx-auto border-red-200 bg-red-50/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-3 text-left">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <ShieldX className="w-5 h-5 text-red-500" />
                What happened?
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  You may not have the required permissions
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  Your session might have expired
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  The resource may be restricted
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact your administrator or
            <button className="text-red-600 hover:text-red-700 font-medium ml-1 hover:underline transition-colors duration-200">
              support team
            </button>
          </p>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default PermissionDenied;
