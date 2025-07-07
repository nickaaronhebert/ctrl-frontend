import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/Sidebar/app-sidebar";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

export default function SidebarLayout() {
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
        <div className="p-7.5">
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
