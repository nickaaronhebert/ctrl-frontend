import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import CTRLLogo from "../CTRLLogo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthentication from "@/hooks/use-authentication";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchema, type OTPFormValues } from "@/schemas/otpSchema";

const LoginVerificationForm = () => {
  const { user } = useAuthentication();

  const form = useForm<OTPFormValues>({
    mode: "onChange",
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const {
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (values: OTPFormValues) => {
    console.log("Otp value", values);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-center mb-[40px]">
          <CTRLLogo />
        </div>
        <div className="text-center my-8">
          <h1 className="text-secondary-foreground font-semibold text-[26px] text-center leading-[30px] mb-2">
            Verification Required
          </h1>
          <p className="text-muted-foreground font-normal leading-[22px] text-[16px] text-center">
            Please enter the verification code to continue
          </p>
        </div>
        <div className="text-center">
          <span className="font-normal text-[16px] leading-[22px] text-black">
            Enter the 6 digit code sent to{" "}
          </span>{" "}
          <br />
          <span className="font-medium text-[16px] leading-[22px] text-primary">
            {user?.email}
          </span>
        </div>

        <Form {...form}>
          <form
            className="space-y-6 flex items-center justify-center flex-col mt-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="space-x-2 flex items-center justify-center">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="rounded-md border-l"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />

            <div className="flex justify-center">
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                className=" h-12 bg-primary text-[16px] leading-[22px] font-semibold text-white  rounded-full min-w-[150px] min-h-[52px]"
              >
                {isSubmitting ? "Verifying..." : "Verify and Continue"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginVerificationForm;
