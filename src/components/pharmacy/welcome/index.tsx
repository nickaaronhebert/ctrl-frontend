import HandWaive from "@/assets/images/HandWave.svg";
import { Link } from "react-router-dom";
import useAuthentication from "@/hooks/use-authentication";
export default function WelcomePharmacy() {
  const { user } = useAuthentication();

  return (
    <div className="flex justify-center items-center  min-h-[670px]">
      <div className="bg-secondary rounded-4xl px-16 py-8 space-y-4 ">
        <div className="flex flex-col items-center gap-2">
          <img src={HandWaive} alt="Logo" className="h-16 w-16" />
          <h1 className="font-semibold text-3xl text-secondary-foreground">
            Hi {user?.firstName},
          </h1>
          <h1 className="font-semibold text-3xl text-secondary-foreground">
            we're excited to have you on board!
          </h1>
        </div>

        <h5 className="text-muted-foreground text-center font-medium text-lg ">
          Your profile has been successfully created.
        </h5>

        <div className="flex justify-center  gap-2.5">
          <Link
            to="#"
            className="text-white rounded-full py-4 px-7  text-base font-semibold bg-primary"
          >
            Choose Service States
          </Link>

          <Link
            to="#"
            className="text-white rounded-full py-4 px-7  text-base font-semibold bg-primary"
          >
            Configure Payouts
          </Link>
          <Link
            to="#"
            className=" rounded-full py-4 px-7  text-[#3E4D61]  font-semibold bg-transparent border border-[#3E4D61]"
          >
            Skip for now
          </Link>
        </div>

        <p className="text-sm font-normal text-muted-foreground text-center">
          You can select states later and Configure Payouts in settings
        </p>
      </div>
    </div>
  );
}
