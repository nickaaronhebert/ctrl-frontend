import { Outlet } from "react-router-dom";
import CTRLLogo from "../common/CTRLLogo";
export default function OnboardingLayout() {
  return (
    <div className="bg-background lg:px-40 pt-10 px-10">
      <div className="mb-5">
        <CTRLLogo />
      </div>
      <div className="[min-width:1440px]:px-64 px-10 pt-12 bg-white min-h-[690px] rounded-4xl">
        <Outlet />
      </div>
    </div>
  );
}
