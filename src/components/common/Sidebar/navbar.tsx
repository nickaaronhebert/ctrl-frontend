import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import SettingsSVG from "@/assets/icons/Settings";
import LogoutSVG from "@/assets/icons/LogOut";

export default function Navbar() {
  return (
    <div className="h-[80px]">
      <SidebarTrigger className="md:hidden" />
      <div className=" h-full flex items-center justify-end gap-[15px] pr-5">
        <span className="w-[50px] h-[50px] rounded-full  p-3 bg-secondary text-sm font-semibold flex justify-center items-center text-primary">
          JS
        </span>
        <div>
          <h4 className="font-semibold text-base">Johan Smith</h4>
          <h6 className="font-normal text-xs">Provider</h6>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDown stroke="black" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4 w-[174px]">
            <DropdownMenuItem>
              <SettingsSVG />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutSVG />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
