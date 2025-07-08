import OnboardingSuccess from "@/components/provider/onboarding-success";

export default function SuccessfullVerification() {
  return (
    <div className="mt-10">
      <h1 className="font-semibold text-2xl">
        Medical Credentials Verification
      </h1>
      <div>
        <div className="mt-4 p-10 bg-white rounded-2xl ">
          <OnboardingSuccess />
        </div>
      </div>
    </div>
  );
}
