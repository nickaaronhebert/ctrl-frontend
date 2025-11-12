import { StatusBadge } from "@/components/common/StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import ConnectedOrganization from ".";
import RejectedOrganization from "@/components/common/RejectedOrganization/RejectedOrganization";

const ActiveOrgDetails = () => {
  const [activeStatus, setActiveStatus] = useState<"affiliates" | "subOrgs">(
    "affiliates"
  );
  return (
    <>
      <div className=" bg-[#EFE8F5] py-3 px-12 flex justify-between items-end">
        <div>
          <Link
            to={"/admin/encountered"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Organizations"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">Landmark Health Hub</h1>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary-foreground hover:bg-primary-foreground cursor-pointer rounded-full text-white py-2.5 px-7 h-12">
            Modify Credential
          </Button>
          <Button className="bg-primary text-white rounded-full hover:bg-primary cursor-pointer py-2.5 px-7 h-12">
            Manage Status & Billing
          </Button>
        </div>
      </div>

      <div className="bg-white py-4 px-2 rounded-lg shadow-lg mt-10">
        <p className="text-base text-black font-semibold px-5 mb-4">
          Organization Information
        </p>

        <div className="px-5">
          <div className="p-3 bg-[#F7F1FD] text-black rounded-[6px] space-y-3">
            <div className="flex justify-between">
              <p className="text-sm font-normal">Name</p>
              <p className="text-sm font-medium">Landmark Health Hub</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Email</p>
              <p className="text-sm font-medium">landmark@yopmail.com</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Phone</p>
              <p className="text-sm font-medium">43435443245</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Status</p>
              <StatusBadge status="active" />
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-normal">Billing</p>
              <p className="text-sm font-medium">Daily</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 my-3 p-3">
          <Button
            size={"xxl"}
            variant={"tabs"}
            className={cn(
              activeStatus === "affiliates"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
              "p-[30px]"
            )}
            onClick={() => setActiveStatus("affiliates")}
          >
            <span className=" font-medium text-base mx-2.5">
              Affiliate Providers
            </span>
          </Button>

          <Button
            size={"xxl"}
            variant={"tabs"}
            className={cn(
              activeStatus === "subOrgs"
                ? "bg-primary text-white"
                : "bg-slate-background text-secondary-foreground hover:bg-slate-background",
              "p-[30px]"
            )}
            onClick={() => setActiveStatus("subOrgs")}
          >
            Sub-Organizations
          </Button>
        </div>

        <div className="  pb-[12px] px-3.5">
          {activeStatus === "affiliates" ? (
            <ConnectedOrganization />
          ) : (
            <RejectedOrganization />
          )}
        </div>
      </div>
    </>
  );
};

export default ActiveOrgDetails;
