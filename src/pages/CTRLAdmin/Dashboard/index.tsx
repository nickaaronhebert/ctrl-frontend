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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { mockStats, quickActions, recentInvites } from "@/constants";
import { useNavigate } from "react-router-dom";
import PreInvitationDialog from "@/components/common/PreInvitationDialog/PreInvitationDialog";
import { StatCard } from "@/components/common/StatCard/StatCard";

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
          <StatCard
            title="Total Organizations"
            icon={<Building2 className="w-4 h-4" />}
            value={mockStats.totalOrganizations}
            description="+12% from last month"
            descriptionIcon={
              <TrendingUp className="inline w-3 h-3 text-success" />
            }
          />
          <StatCard
            title="Total Pharmacies"
            icon={<Pill className="w-4 h-4" />}
            value={mockStats.totalPharmacies}
            description="+8% from last month"
            descriptionIcon={
              <TrendingUp className="inline w-3 h-3 text-success" />
            }
          />
          <StatCard
            title="Pending Invites"
            icon={<Clock className="w-4 h-4" />}
            value={mockStats.pendingInvites}
            description="Awaiting completion"
          />

          <StatCard
            title="Active Users"
            icon={<Users className="w-4 h-4" />}
            value={mockStats.activeUsers.toLocaleString()}
            description={`+${mockStats.monthlyGrowth}% growth`}
            descriptionIcon={
              <TrendingUp className="inline w-3 h-3 text-success" />
            }
          />
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
      {isModalOpen && (
        <PreInvitationDialog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalType={modalType}
          handleContinue={handleContinue}
        />
      )}
    </>
  );
};

export default AdminDashboard;
