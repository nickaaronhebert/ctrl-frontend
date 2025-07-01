import { Button } from "@/components/ui/button";
import HandWaive from "@/assets/images/HandWave.svg";
export default function WelcomeProvider() {
  return (
    <div className="bg-background lg:px-40 pt-20 px-5 ">
      <div className="px-64  bg-white min-w-[690px] min-h-[690px] rounded-4xl flex justify-center items-center">
        <div className="bg-secondary rounded-4xl px-8 py-8 min-w-[670px]">
          <div className="flex flex-col items-center gap-2">
            <img src={HandWaive} alt="Logo" className="h-16 w-16" />
            <h1 className="font-semibold text-3xl text-primary-foreground">
              Hi Johan,
            </h1>
            <h1 className="font-semibold text-3xl text-secondary-foreground">
              we're excited to have you on board!
            </h1>
          </div>

          <h5 className="text-muted-foreground text-center font-medium text-lg mt-4">
            Your profile has been successfully created.
          </h5>

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
            >
              Verify Your Medical Credentials
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
