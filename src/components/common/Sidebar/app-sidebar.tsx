// import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent />
//     </Sidebar>
//   );
// }

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
import { NavLink } from "react-router-dom";

import CTRLSVG from "@/assets/images/CTRL.svg";
import CollapsedCTRLSVG from "@/assets/icons/CollapsedCTRL";
import { SidebarToggle } from "./sidebar-toggle";
import { PrescriptionSVG } from "@/assets/icons/PrescriptionSVG";

import SupportSVG from "@/assets/icons/Support";
// Menu items.
const items = [
  {
    title: "Prescriptions",
    url: "/provider/prescription",
    icon: <PrescriptionSVG />,
  },
  {
    title: "Support",
    url: "/provider/support",
    icon: <SupportSVG />,
  },
];

export function AppSidebar() {
  const { state, open, toggleSidebar } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-none"
      style={{
        boxShadow: "0px 2px 40px 0px hsla(0, 0%, 0%, 0.05)",
      }}
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
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="hover:bg-secondary py-3"
                >
                  <SidebarMenuButton asChild size="lg">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 w-full px-4 ${
                          isActive ? "bg-secondary font-semibold" : ""
                        }`
                      }
                    >
                      <span className="min-w-[30px] min-h-[30px] flex items-center justify-center">
                        {item.icon}
                      </span>
                      <span className="text-lg">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
