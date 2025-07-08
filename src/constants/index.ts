import User from "@/assets/icons/User";
import Licence from "@/assets/icons/Licence";
import Affiliation from "@/assets/icons/Affiliation";

export const tabsConfig = [
  { id: "personal", label: "Personal Details", icon: User },
  { id: "medical", label: "Medical License", icon: Licence },
  { id: "affiliation", label: "Affiliation Status", icon: Affiliation },
] as const;
