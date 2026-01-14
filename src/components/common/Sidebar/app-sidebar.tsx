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
import {
  nestedOrgItems,
  nestedPharmacyItems,
  organisationAdminItems,
  pharmacyAdminItems,
  platformAdminItems,
  nestedOrgTransmissionItems,
} from "@/constants";
import CTRLSVG from "@/assets/images/CTRL.svg";
import CollapsedCTRLSVG from "@/assets/icons/CollapsedCTRL";
import { SidebarToggle } from "./sidebar-toggle";
import { useLocation } from "react-router-dom";
import { PrescriptionSVG } from "@/assets/icons/PrescriptionSVG";
import useAuthentication from "@/hooks/use-authentication";
import SupportSVG from "@/assets/icons/Support";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type MenuItem = {
  title: string;
  url: string;
  icon?: React.ComponentType<{}>;
  activePaths?: string[];
};

interface CollapsibleMenuItemProps {
  item: any;
  settingsOpen: boolean;
  nestedItems: { title: string; url: string }[];
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function CollapsibleMenuItem({
  setSettingsOpen,
  settingsOpen,
  item,
  nestedItems,
}: CollapsibleMenuItemProps) {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (item: MenuItem) => {
    return location.pathname === item.url;
  };
  return (
    <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton
          asChild
          size="lg"
          tooltip={item.title}
          onClick={() => {}}
        >
          <div
            className={`flex items-center gap-3 w-full cursor-pointer
                                 ${
                                   isActive(item)
                                     ? "bg-secondary font-semibold text-primary"
                                     : ""
                                 }
                              `}
          >
            <span className="min-w-[30px] min-h-[30px] flex items-center justify-center">
              {item?.icon && (
                <item.icon
                  color={`${isActive(item) ? "#5354ac" : "#9aa2ac"}`}
                />
              )}
            </span>
            <span className={`text-lg ${state !== "collapsed" && "flex-1"}`}>
              {state !== "collapsed" && item.title}
            </span>
            {state !== "collapsed" &&
              (settingsOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              ))}
          </div>
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent className=" mt-2 flex flex-col gap-2">
        {nestedItems.map((nestedItem) => (
          <SidebarMenuButton
            key={nestedItem.title}
            asChild
            size="lg"
            tooltip={nestedItem.title}
          >
            <div
              className={`flex items-center gap-3 w-full cursor-pointer ${
                isActive(nestedItem)
                  ? "bg-secondary font-semibold text-red-300"
                  : ""
              }`}
              onClick={() => navigate(nestedItem.url)}
            >
              <span className="font-normal text-[16px] leading-[22px] ml-10 text-secondary-foreground">
                {state !== "collapsed" && nestedItem.title}
              </span>
            </div>
          </SidebarMenuButton>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
export function AppSidebar() {
  const { state, open, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthentication();
  const isSettingsItem = (item: MenuItem) => item.title === "Settings";
  const isOrgTransmissionItems = (item: MenuItem) =>
    item.title === "Transmissions" && user?.role?.name === "Organization Admin";
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isOrganisationAdmin = user?.role?.name === "Organization Admin";
  const isProvider = user?.role?.name === "Provider";
  const isPharmacyAdmin = user?.role?.name === "Pharmacy Admin";
  const isPlatformAdmin = user?.role?.name === "Platform Admin";

  const nestedItems = isOrganisationAdmin
    ? nestedOrgItems
    : nestedPharmacyItems;

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
    {
      title: "Prescription",
      url: "/provider/prescriptions",
      icon: PrescriptionSVG,
    },
  ];

  const menuItems = isOrganisationAdmin
    ? organisationAdminItems
    : isPharmacyAdmin
    ? pharmacyAdminItems
    : isPlatformAdmin
    ? platformAdminItems
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
      className="border-none shadow-[0px_2px_40px_0px_#0000000D] z-50"
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
            {/* <SidebarMenu>
              {menuItems.map((item) => {
                const { state } = useSidebar();
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className="hover:bg-secondary "
                  >
                    <SidebarMenuButton asChild size="lg" tooltip={item.title}>
                      <div
                        className={`flex items-center gap-3 w-full cursor-pointer ${
                          isActive(item)
                            ? "bg-secondary font-semibold text-primary"
                            : ""
                        }`}
                        onClick={() => navigate(item.url)}
                      >
                        <span className="min-w-[30px] min-h-[30px] flex items-center justify-center">
                          <item.icon
                            color={`${isActive(item) ? "#5354ac" : "#9aa2ac"} `}
                          />
                        </span>
                        <span className="text-lg">
                          {state !== "collapsed" && item.title}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu> */}

            {/* For Future Scope */}
            <SidebarMenu>
              {menuItems.map((item) => {
                const { state } = useSidebar();
                const isSettings = isSettingsItem(item);

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className="hover:bg-secondary"
                  >
                    {isSettings ? (
                      <Collapsible
                        open={settingsOpen}
                        onOpenChange={setSettingsOpen}
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            size="lg"
                            tooltip={item.title}
                            onClick={() => {}}
                          >
                            <div
                              className={`flex items-center gap-3 w-full cursor-pointer ${
                                isActive(item)
                                  ? "bg-secondary font-semibold text-primary"
                                  : ""
                              }`}
                            >
                              <span className="min-w-[30px] min-h-[30px] flex items-center justify-center">
                                <item.icon
                                  color={`${
                                    isActive(item) ? "#5354ac" : "#9aa2ac"
                                  }`}
                                />
                              </span>
                              <span
                                className={`text-lg ${
                                  state !== "collapsed" && "flex-1"
                                }`}
                              >
                                {state !== "collapsed" && item.title}
                              </span>
                              {state !== "collapsed" &&
                                (settingsOpen ? (
                                  <ChevronUp size={18} />
                                ) : (
                                  <ChevronDown size={18} />
                                ))}
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className=" mt-2 flex flex-col gap-2">
                          {nestedItems.map((nestedItem) => (
                            <SidebarMenuButton
                              key={nestedItem.title}
                              asChild
                              size="lg"
                              tooltip={nestedItem.title}
                            >
                              <div
                                className={`flex items-center gap-3 w-full cursor-pointer ${
                                  isActive(nestedItem)
                                    ? "bg-secondary font-semibold text-red-300"
                                    : ""
                                }`}
                                onClick={() => navigate(nestedItem.url)}
                              >
                                <span className="font-normal text-[16px] leading-[22px] ml-10 text-secondary-foreground">
                                  {state !== "collapsed" && nestedItem.title}
                                </span>
                              </div>
                            </SidebarMenuButton>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : isOrgTransmissionItems(item) ? (
                      <CollapsibleMenuItem
                        item={item}
                        nestedItems={nestedOrgTransmissionItems}
                        setSettingsOpen={setSettingsOpen}
                        settingsOpen={settingsOpen}
                      />
                    ) : (
                      <SidebarMenuButton asChild size="lg" tooltip={item.title}>
                        <div
                          className={`flex items-center gap-3 w-full cursor-pointer ${
                            isActive(item)
                              ? "bg-secondary font-semibold text-primary"
                              : ""
                          }`}
                          onClick={() => navigate(item.url)}
                        >
                          <span className="min-w-[30px] min-h-[30px] flex items-center justify-center">
                            <item.icon
                              color={`${
                                isActive(item) ? "#5354ac" : "#9aa2ac"
                              }`}
                            />
                          </span>
                          <span className="text-lg">
                            {state !== "collapsed" && item.title}
                          </span>
                        </div>
                      </SidebarMenuButton>
                    )}
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
