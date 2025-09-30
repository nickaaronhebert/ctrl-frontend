import HandWaive from "@/assets/images/HandWave.svg";
import { Link } from "react-router-dom";
import useAuthentication from "@/hooks/use-authentication";
export default function WelcomeOrgAdmin() {
  const { user } = useAuthentication();

  return (
    <div className="flex justify-center items-center  min-h-[670px]">
      <div className="bg-secondary rounded-4xl px-16 py-8 space-y-4 ">
        <div className="flex flex-col items-center gap-2">
          <img src={HandWaive} alt="Logo" className="h-16 w-16" />
          <h1 className="font-semibold text-3xl text-secondary-foreground leading-3">
            Welcome aboard, {user?.firstName}!
          </h1>
        </div>

        <h5 className="text-muted-foreground text-center font-medium text-lg ">
          Your profile is ready to go.
        </h5>

        <div className="flex justify-center  gap-2.5">
          {/* <Link
            to="#"
            className="text-white rounded-full py-4 px-7  text-base font-semibold bg-primary"
          >
            Add Payment Method
          </Link> */}

          <Link
            to="/org/dashboard"
            className=" rounded-full py-4 px-7  text-[#3E4D61]  font-semibold bg-transparent border border-[#3E4D61]"
          >
            Visit Dashboard
          </Link>
        </div>

        <p className="text-sm font-normal text-muted-foreground text-center">
          {/* Add a payment method now to streamline your first order and unlock
          faster checkout */}
          Welcome aboard! You’re all set up and ready to go. Let’s get started!
        </p>
      </div>
    </div>
  );
}
