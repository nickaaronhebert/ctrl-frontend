import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { organisationAdminItems } from "@/constants";
import CTRLSVG from "@/assets/images/CTRL.svg";
import CollapsedCTRLSVG from "@/assets/icons/CollapsedCTRL";
import { SidebarToggle } from "./sidebar-toggle";
import { useLocation } from "react-router-dom";
import { PrescriptionSVG } from "@/assets/icons/PrescriptionSVG";
import useAuthentication from "@/hooks/use-authentication";
import SupportSVG from "@/assets/icons/Support";
import type { FC, SVGProps } from "react";

type MenuItem = {
  title: string;
  url: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  activePaths?: string[];
};

export function AppSidebar() {
  const { state, open, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthentication();

  console.log("user>>>>>>", user);

  const isOrganisationAdmin = user?.role?.name === "Organization Admin";
  const isProvider = user?.role?.name === "Provider";

  const providerItems = [
    {
      title: "Prescriptions",
      url:
        isProvider && user?.providerStatus === "med_submitted"
          ? "/provider/pending-approval"
          : "/provider/warning",
      icon: PrescriptionSVG,
      activePaths: ["/provider/warning", "/provider/pending-approval"],
    },
    {
      title: "Support",
      url: "/provider/support",
      icon: SupportSVG,
    },
  ];

  const menuItems = isOrganisationAdmin
    ? organisationAdminItems
    : providerItems;

  const isActive = (item: MenuItem) => {
    if (item.activePaths) {
      return item.activePaths.includes(location.pathname);
    }
    return location.pathname === item.url;
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-none shadow-[0px_2px_40px_0px_#0000000D]"
    >
      <SidebarToggle isOpen={open} setIsOpen={toggleSidebar} />
      <SidebarHeader>
        {state === "collapsed" ? (
          <div className="mt-2.5  flex justify-center">
            <CollapsedCTRLSVG />
          </div>
        ) : (
          <div className="flex justify-center my-[25px]">
            <img src={CTRLSVG} alt="Logo" style={{ height: "41px" }} />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                // const isActive = item.activePaths
                //   ? item.activePaths.includes(location.pathname)
                //   : location.pathname === item.url;
                const { state } = useSidebar();
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className="hover:bg-secondary "
                  >
                    <SidebarMenuButton asChild size="lg" tooltip={item.title}>
                      <div
                        className={`flex items-center gap-3 w-full cursor-pointer ${
                          isActive(item) ? "bg-secondary font-semibold" : ""
                        }`}
                        onClick={() => navigate(item.url)}
                      >
                        <span className="min-w-[30px] min-h-[30px] flex items-center justify-center">
                          <item.icon />
                        </span>
                        <span className="text-lg">
                          {state !== "collapsed" && item.title}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
