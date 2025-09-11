import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SuccessCheckSVG from "@/assets/icons/SuccessCheckIcon";
import { useLocation } from "react-router-dom";

export default function CatalogueCreationSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const pricedVariants = location.state.pricedVariants ?? 0;
  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12">
        <div>
          <Link
            to={"/pharmacy/medications/configure"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Medications"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">Set Default Prices</h1>
        </div>
      </div>
      <div className="flex justify-center items-start mt-4 min-h-[670px] bg-background">
        <div
          style={{ boxShadow: "0px 2px 40px 0px hsla(0, 0%, 0%, 0.05)" }}
          className="rounded-4xl px-8 py-8 w-[900px] h-[308px] bg-white "
        >
          <div className="flex flex-col items-center gap-2">
            <SuccessCheckSVG />
            <h1 className="font-semibold text-3xl text-primary-foreground text-center">
              Catalogue Created Successfully
            </h1>
          </div>

          <h5 className="text-muted-foreground text-center font-medium text-lg mt-4">
            {pricedVariants} medication variants now have default pricing
          </h5>

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => {
                navigate("/pharmacy/medications/view-catalogue");
              }}
              className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold cursor-pointer"
            >
              View Catalogue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
