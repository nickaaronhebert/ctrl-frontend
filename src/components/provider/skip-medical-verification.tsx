import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SuccessCheckSVG from "@/assets/icons/SuccessCheckIcon";
export default function SkipMedicalVerification() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center  min-h-[670px]">
      <div className=" rounded-4xl px-8 py-8 w-[670px] ">
        <div className="flex flex-col items-center gap-2">
          <SuccessCheckSVG />
          {/* <img src={HandWaive} alt="Logo" className="h-16 w-16" /> */}
          <h1 className="font-semibold text-3xl text-primary-foreground text-center">
            All set, Johan Smith!
          </h1>
          <h1 className="font-semibold text-3xl text-secondary-foreground">
            You can verify your credentials later.
          </h1>
        </div>

        <h5 className="text-muted-foreground text-center font-medium text-lg mt-4">
          Your account is ready to use with basic access.
        </h5>

        <div className="flex justify-center mt-6">
          <Button
            onClick={() => {
              navigate("/provider/warning");
            }}
            className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
          >
            Verify Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
