import { ShieldX, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PermissionDenied = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleGoBack}
            variant="outline"
            size="lg"
            className="group hover:bg-gray-50 border-gray-300 hover:border-gray-400 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Go Back
          </Button>

          <Button
            onClick={handleGoHome}
            size="lg"
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
        </div>

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
