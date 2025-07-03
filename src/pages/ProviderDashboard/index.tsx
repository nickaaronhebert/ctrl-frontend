import { useState, useEffect } from "react";
import { Bell, Search, Calendar, Clock, Star, Stethoscope } from "lucide-react";

const ProviderDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [providerName] = useState("Dr. Sarah Johnson");
  const [specialty] = useState("Internal Medicine");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    CTRL Provider
                  </h1>
                  <p className="text-xs text-slate-500">
                    Healthcare Management Platform
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search patients, prescriptions..."
                  className="pl-10 pr-4 py-2 w-80 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                />
              </div>
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center space-x-3 bg-white/50 rounded-xl px-3 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">SJ</span>
                </div>
                <div>
                  <p className="text-slate-700 font-medium text-sm">
                    {providerName}
                  </p>
                  <p className="text-slate-500 text-xs">{specialty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-medium text-sm">
              Provider Portal
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {getGreeting()}, Dr. Johnson! 👩‍⚕️
          </h1>
          <p className="text-xl text-slate-600 mb-6 max-w-3xl mx-auto">
            Welcome to your personalized healthcare management dashboard.
            Streamline your practice and provide exceptional patient care with
            CTRL's integrated platform.
          </p>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto mb-8 border border-slate-200">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CTRL</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                CTRL Provider Dashboard
              </h2>
            </div>
            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
              Your centralized hub for{" "}
              <span className="font-semibold text-blue-600">
                patient care management
              </span>
              , prescription handling, and healthcare coordination. CTRL
              connects you seamlessly with pharmacies, laboratories, and
              healthcare networks.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              As a healthcare provider, you have access to{" "}
              <span className="font-medium text-green-600">
                real-time patient data
              </span>
              , integrated prescription management, and comprehensive care
              coordination tools designed specifically for medical
              professionals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Patient Care
                </h3>
                <p className="text-blue-700 text-sm">
                  Comprehensive patient records and treatment management
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">
                  Prescription Management
                </h3>
                <p className="text-green-700 text-sm">
                  Integrated pharmacy networks and medication oversight
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2">
                  Care Coordination
                </h3>
                <p className="text-purple-700 text-sm">
                  Seamless communication with healthcare teams
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
