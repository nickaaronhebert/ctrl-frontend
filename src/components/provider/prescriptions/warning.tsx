import { Button } from "@/components/ui/button";

export default function PrescriptionWarning() {
  return (
    <div className="rounded-2xl p-10 bg-white flex flex-col justify-center items-center">
      <h3 className="font-semibold text-[26px]">
        Medical Verification Required
      </h3>
      <p className="my-1.5 text-base font-normal text-muted-foreground w-[480px] text-center">
        To access prescription management features, you need to complete your
        medical verification first. This ensures compliance with healthcare
        regulations and protects patient safety.
      </p>
      <div className="mt-6 bg-light-background px-6 py-5 rounded-[6px]">
        <h6 className="font-medium text-black text-base">
          What you'll need to provide:
        </h6>
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
      <div className="flex justify-center mt-6 mb-3">
        <Button variant={"ctrl"} size={"xl"}>
          Complete Verification Now
        </Button>
      </div>
      <p className="w-[480px] text-center font-normal text-sm text-muted-foreground">
        The verification process takes just a few minutes and your information
        is encrypted and secure.
      </p>
    </div>
  );
}
