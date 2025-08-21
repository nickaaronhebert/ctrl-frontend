import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/Sidebar/app-sidebar";
import Navbar from "./navbar";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function SidebarLayout() {
  const location = useLocation();
  const isTransmissionDetailRoute = /^\/org\/transmissions\/[^/]+$/.test(
    location.pathname
  );
  const isOrderDetailRoute = /^\/org\/order\/[^/]+$/.test(location.pathname);
  const isViewPatientPatientDetailsRoute = /^\/org\/patient\/[^/]+$/.test(
    location.pathname
  );
  const isCreatePatientRoute = location.pathname === "/org/create-patient";

  return (
    <SidebarProvider
      style={{
        ["--sidebar-width" as any]: "280px",
        ["--sidebar-width-mobile" as any]: "280px",
      }}
    >
      <AppSidebar />
      <main className="relative  w-full ">
        <Navbar />
        <div
          className={cn(
            `${
              isTransmissionDetailRoute ||
              isOrderDetailRoute ||
              isViewPatientPatientDetailsRoute ||
              isCreatePatientRoute
                ? ""
                : "p-7.5"
            }`
          )}
        >
          <Outlet />
        </div>
        {/* <div className="flex justify-end">
          <p>
            © 2025 CTRL. All Rights Reserved. Made with love by{" "}
            <span>Telegra!</span>
          </p>
        </div> */}
      </main>
    </SidebarProvider>
  );
}
