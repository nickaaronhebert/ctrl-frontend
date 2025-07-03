import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/redux/slices/auth";
import CTRLLogo from "@/components/common/CTRLLogo";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const quickStats = [
    {
      title: "Connected Pharmacies",
      value: "847",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Active Organizations",
      value: "234",
      change: "+8.2%",
      trend: "up",
    },
    { title: "System Uptime", value: "99.8%", change: "+0.1%", trend: "up" },
    { title: "Data Sync Rate", value: "98.4%", change: "+2.3%", trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Dashboard
                  </h1>
                  <p className="text-xs text-slate-500">
                    Business Intelligence Platform
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center space-x-3 bg-white/50 rounded-xl px-3 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JS</span>
                </div>
                <div>
                  <p className="text-slate-700 font-medium text-sm">
                    {user?.firstName}
                  </p>
                  <p className="text-slate-500 text-xs">Admin</p>
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
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto mb-8 border border-slate-200">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CTRLLogo />
            </div>
            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
              Welcome
              <span className="font-semibold text-blue-600">
                {" "}
                {user?.firstName}
              </span>{" "}
              - your centralized command center for managing pharmaceutical
              operations and organizational workflows.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              CTRL serves as a powerful{" "}
              <span className="font-medium text-purple-600">
                middleware platform
              </span>{" "}
              that seamlessly connects pharmacies and organizations, enabling
              efficient data exchange, inventory management, and streamlined
              operations across your entire network.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Pharmacy Integration
                </h3>
                <p className="text-blue-700 text-sm">
                  Connect and manage multiple pharmacy locations with real-time
                  synchronization
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2">
                  Organization Management
                </h3>
                <p className="text-purple-700 text-sm">
                  Oversee organizational workflows and streamline business
                  processes
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">
                  Middleware Solutions
                </h3>
                <p className="text-green-700 text-sm">
                  Bridge systems and applications for seamless data flow and
                  operations
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-600 font-medium text-sm">
                  {stat.title}
                </h3>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </span>
                <span
                  className={`text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
