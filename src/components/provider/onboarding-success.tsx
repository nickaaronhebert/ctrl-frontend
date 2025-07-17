import CredentialVerificationSVG from "@/assets/icons/CredentialVerification";
import EmailSVG from "@/assets/icons/Email";
import PLatformAccessSVG from "@/assets/icons/PlatformAccess";
import SuccessCheckSVG from "@/assets/icons/SuccessCheckIcon";
import type { JSX } from "react";
import { Link } from "react-router-dom";
import useAuthentication from "@/hooks/use-authentication";

interface OnboardingSuccessPerks {
  icon: JSX.Element;
  title: string;
  content: string;
}
const OnboardingSuccessPers: OnboardingSuccessPerks[] = [
  {
    icon: <CredentialVerificationSVG />,
    title: "Credential Verification",
    content:
      "Our team will verify your medical credentials with licensing boards. This typically takes 1-2 business days.",
  },
  {
    icon: <EmailSVG />,
    title: "Email Updates",
    content:
      "You will receive email notifications about your verification status and next steps. Keep an eye on your inbox!",
  },
  {
    icon: <PLatformAccessSVG />,
    title: "Platform Access",
    content:
      "Once approved, you'll receive full access to your provider profile.",
  },
];
export default function OnboardingSuccess() {
  const { user, isLoadingUserDetails } = useAuthentication();
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-2">
        <SuccessCheckSVG />
        <h1 className="font-semibold text-3xl text-primary-foreground mt-3.5">
          All set, {!isLoadingUserDetails && user?.firstName}
        </h1>
        <p className="text-muted-foreground text-center font-normal text-base ">
          You'll be ready to manage prescription workflow after verification.
        </p>
      </div>

      <div className="flex justify-center gap-5 my-6">
        {OnboardingSuccessPers.map((perks, index) => {
          return (
            <div
              key={index}
              className="w-[300px] py-9 px-5 bg-background rounded-3xl border border-border-secondary flex flex-col items-center gap-1"
            >
              {perks.icon}
              <h4 className="font-semibold text-base mt-5">{perks.title}</h4>
              <p className="text-sm font-normal text-center text-light-black">
                {perks.content}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <Link
          to="/provider/pending-approval"
          className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold bg-primary flex items-center"
        >
          Verify Your Medical Credentials
        </Link>
      </div>
    </div>
  );
}
