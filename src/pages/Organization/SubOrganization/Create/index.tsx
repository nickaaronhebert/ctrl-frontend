import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useAppSelector";
import CreateSubOrganization from "./CreateSubOrganization";
import BillingInfo from "./BillingInfo";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@/redux/store";
import { setCurrentStep, setSubOrgId } from "@/redux/slices/sub-org";

const SubOrganization = () => {
  const subOrg = useAppSelector((state) => state.subOrg);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.state?.goToStep === 1) {
      dispatch(setCurrentStep(1));
      dispatch(setSubOrgId(location.state.subOrganization));
    }
  }, [location.state]);

  return (
    <>
      <div className=" bg-[#EFE8F5] py-3 px-12">
        <Link
          to={"/admin/organizations"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Sub-organizations"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Create Sub-organization</h1>
      </div>
      <div
        className="mt-10 rounded-[15px] max-w-[1000px] mx-auto p-6 bg-white"
        style={{
          boxShadow: "0px 8px 10px 0px hsla(0, 0%, 0%, 0.08)",
        }}
      >
        <div className="pt-2.5 pb-2.5 px-5 flex gap-2.5 justify-center border-b border-card-border border-dashed mb-10">
          <p
            className={cn(
              "text-base font-semibold flex gap-3",
              subOrg.currentStep >= 0 ? "text-primary" : "text-[#63627F]"
            )}
          >
            <span>1.</span>
            <span>Organization Details</span>
          </p>
          <ChevronRight />
          <p
            className={cn(
              "text-base font-semibold flex gap-3",
              subOrg.currentStep >= 1 ? "text-primary" : "text-[#63627F]"
            )}
          >
            <span>2.</span>
            <span>Billing Setup</span>
          </p>
        </div>

        {subOrg.currentStep === 0 && (
          <CreateSubOrganization organizationDetails={subOrg.stepOne} />
        )}

        {subOrg.currentStep === 1 && <BillingInfo />}
      </div>
    </>
  );
};

export default SubOrganization;
