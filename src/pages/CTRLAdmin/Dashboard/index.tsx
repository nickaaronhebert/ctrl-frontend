import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Building2,
  TrendingUp,
  Pill,
  Clock,
  Users,
  CheckCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { mockStats, quickActions, recentInvites } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"organization" | "pharmacy">(
    "organization"
  );

  const handleInviteClick = (type: "organization" | "pharmacy") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleContinue = () => {
    console.log(`Redirecting to: `);
    setIsModalOpen(false);
    navigate("/admin/organizations");
  };
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">
              Platform Overview
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage your healthcare platform ecosystem
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border border-none outline-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Organizations
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.totalOrganizations}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1 text-success" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border border-none outline-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pharmacies
              </CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.totalPharmacies}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1 text-success" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border border-none outline-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Invites
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.pendingInvites}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting completion
              </p>
            </CardContent>
          </Card>

          <Card className="border border-none outline-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.activeUsers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1 text-success" />+
                {mockStats.monthlyGrowth}% growth
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-none outline-none shadow-lg ">
            <CardHeader>
              <CardTitle>Recent Invitations</CardTitle>
              <CardDescription>
                Latest organization and pharmacy invites
              </CardDescription>
            </CardHeader>
            <CardContent className="px-[0px]">
              <div className="space-y-4">
                {recentInvites.map((invite) => (
                  <>
                    <div
                      key={invite.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3 px-6">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {invite.type === "Organization" ? "ORG" : "RX"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{invite.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {invite.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 px-6">
                        <Badge
                          variant={
                            invite.status === "Completed"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            invite.status === "Completed"
                              ? "bg-success/10 text-success border-success/20"
                              : ""
                          }
                        >
                          {invite.status === "Completed" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {invite.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-300"></div>
                  </>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-none outline-none shadow-lg ">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <h4 className="font-medium text-sm">{action.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">
                    {action.description}
                  </p>
                  <button
                    className="px-4 py-2 bg-primary cursor-pointer hover:bg-primary text-white text-sm rounded-lg font-medium transition-colors"
                    onClick={() => {
                      if (action.title.includes("Organization")) {
                        handleInviteClick("organization");
                      } else if (action.title.includes("Pharmacy")) {
                        handleInviteClick("pharmacy");
                      }
                    }}
                  >
                    {action.action}
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg h-[230px] border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm">
          <DialogHeader className="text-center space-y-2 pt-6">
            <div className="mx-auto relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                {modalType === "organization" ? (
                  <Building2 className="w-8 h-8 text-white relative z-10" />
                ) : (
                  <Pill className="w-8 h-8 text-white relative z-10" />
                )}
                <Sparkles className="w-3 h-3 text-blue-200 absolute top-2 right-2 z-10" />
              </div>
            </div>
            <div className="space-y-3">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Invite a New{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  {modalType === "organization" ? "Organization" : "Pharmacy"}
                </span>
              </DialogTitle>
              <DialogDescription className="text-slate-600 text-base leading-relaxed max-w-sm mx-auto">
                To invite an admin, you must first create the {modalType}{" "}
                profile to get started.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex justify-center pt-3 pb-6">
            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-xl flex items-center gap-3 font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 hover:scale-105 border-0"
            >
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                <Plus className="w-3 h-3" />
              </div>
              Continue to Create{" "}
              {modalType === "organization" ? "Organization" : "Pharmacy"}
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-500/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminDashboard;
