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
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slices/auth";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useAuthentication from "@/hooks/use-authentication";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuthentication();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <>
      <div
        className="h-[80px] bg-white w-full fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: "blur(50px)",
          boxShadow: "0px 4px 4px 0px #0000000A",
        }}
      >
        <SidebarTrigger className="md:hidden" />
        <div className=" h-full flex items-center justify-end gap-[15px] pr-5 ">
          <span className="w-[50px] h-[50px] rounded-full  p-3 bg-secondary text-sm font-semibold flex justify-center items-center text-primary">
            JS
          </span>
          <div>
            <h4 className="font-semibold text-base">
              {user?.firstName} {user?.lastName}
            </h4>
            <h6 className="font-normal text-xs">{user?.role?.name}</h6>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDown stroke="black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 w-[174px]">
              {user?.role?.name === "Provider" && (
                <DropdownMenuItem
                  onClick={() => navigate("/provider/settings")}
                >
                  <SettingsSVG />
                  Settings
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onClick={handleLogout}>
                <LogoutSVG />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="h-[80px]"></div>
    </>
  );
}
