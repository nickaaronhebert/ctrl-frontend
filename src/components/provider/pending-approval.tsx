import Shield from "@/assets/icons/Shield";

export default function ApprovalPending() {
  return (
    <div className="rounded-2xl p-10 bg-white flex flex-col justify-center items-center">
      <div className="w-[68px] h-[68px] bg-primary rounded-full flex justify-center items-center border-[3px] border-primary-light">
        <Shield />
      </div>
      <h3 className="font-semibold text-[26px] mt-6">
        Medical Verification in Progress
      </h3>
      <p className="my-1.5 text-base font-normal text-muted-foreground w-[480px] text-center">
        We're securely verifying your medical credentials. This process
        typically takes 1 - 2days.
      </p>
      <div className="mt-6 bg-light-background px-6 py-5 rounded-[6px]">
        <h6 className="font-medium text-black text-base">What Happens Next?</h6>
        <div className="p-2">
          <ul className="list-disc">
            <li className="text-light-black text-sm font-normal ml-6">
              National Provider Identifier (NPI) - 10 digits
            </li>
            <li className="text-light-black text-sm font-normal ml-6">
              Medical licenses for all states where you practice
            </li>
            <li className="text-light-black text-sm font-normal ml-6">
              DEA registration number (if applicable)
            </li>
          </ul>
        </div>
      </div>

      <p className="w-[480px] text-center font-normal text-sm text-muted-foreground mt-4">
        Need help with verification?you can contact us at{" "}
        <span className="text-primary">support@telegramd.com</span>.
      </p>
    </div>
  );
}
