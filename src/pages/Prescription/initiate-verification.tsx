import ProviderSteppedForm from "@/components/provider/credentials-stepped-form";
import { STEPPER_FORM } from "@/constants/routes";

export default function CompleteVerification() {
  return (
    <div className="mt-10">
      <h1 className="font-semibold text-2xl">
        Medical Credentials Verification
      </h1>
      <div>
        <div className="mt-4 p-10 bg-white rounded-2xl ">
          <ProviderSteppedForm slug={STEPPER_FORM.COMPLETE_VERIFICATION} />
        </div>
      </div>
    </div>
  );
}
