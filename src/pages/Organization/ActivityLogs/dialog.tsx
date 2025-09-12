import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useViewAuditLogsDetailsQuery } from "@/redux/services/audit";

import { Files } from "lucide-react";
import { useState } from "react";

const obj = {
  message: "string",
  code: "string",
  data: [
    {
      _id: "string",
      metadata: {},
      amount: 0,
      keywords: ["string"],
      createdBy: {
        _id: "string",
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        password: "string",
        role: "string",
        organization: {
          _id: "string",
          name: "string",
          email: "string",
          phoneNumber: "string",
          status: "active",
          allowedStates: ["string"],
          stripeAccountId: "string",
          stripeConnectOnboardingStatus: "string",
          createdBy: {},
        },
        pharmacy: {
          _id: "string",
          name: "string",
          email: "string",
          phoneNumber: "string",
          status: "active",
          allowedStates: ["string"],
          stripeAccountId: "string",
          stripeConnectOnboardingStatus: "string",
          createdBy: {},
        },
        organizations: {},
        medicalLicense: ["string"],
        deaNumber: ["string"],
        otpSecret: "string",
        emailOtpSecret: "string",
        isEmailVerified: true,
      },
    },
  ],
};

interface AddMedicalLicenseDialogProps {
  id: string;
  openLogsModal: boolean;
  setOpenLogsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CopyComponent() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleCopy}
      className="relative w-24"
    >
      <Files />
      {copied ? <span>Copied</span> : <span>Copy All</span>}
      {/* {copied && <span>Copied</span>} */}
    </Button>
  );
}

export default function ViewLogsDetail({
  openLogsModal,
  setOpenLogsModal,
  id,
}: AddMedicalLicenseDialogProps) {
  const { data } = useViewAuditLogsDetailsQuery(id);
  console.log("dddddd", data);
  return (
    <Dialog open={openLogsModal} onOpenChange={setOpenLogsModal}>
      <DialogContent className="min-w-[600px] bg-secondary">
        <DialogHeader className="py-4 px-5 border-b border-card-border">
          <DialogTitle className="text-xl font-semibold text-black ">
            Activity Log - Transmission
          </DialogTitle>

          {/* <X className="cursor-pointer" onClick={onCancel} /> */}
        </DialogHeader>
        <div className="p-5 space-y-5">
          <div className=" rounded-[10px] p-3.5 bg-white space-y-2.5">
            <div className="flex justify-between">
              <p className="text-sm text-[#63627F] font-medium">
                Activity Type
              </p>
              <p className="text-xs font-semibold">Transmission</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-[#63627F] font-medium">Performed By</p>
              <p className="text-xs font-semibold">
                Provider - Dr. Sarah Thompson, #1234
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-[#63627F] font-medium">Event</p>
              <p className="text-xs font-semibold">Transmission Transmitted</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-[#63627F] font-medium">
                Activity Status
              </p>
              <p className="text-xs font-semibold">Completed</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-[#63627F] font-medium">Created At</p>
              <p className="text-xs font-semibold">Sep 3, 2025, 8:02:00 AM</p>
            </div>
          </div>
          <div className="p-3.5 rounded-[10px] bg-white ">
            <div className="flex justify-end px-4">
              <CopyComponent />
            </div>
            <pre className="max-h-72 overflow-y-scroll">
              {" "}
              {JSON.stringify(obj, null, 2)}
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
