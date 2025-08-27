import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import CTRLLogo from "../CTRLLogo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchema, type OTPFormValues } from "@/schemas/otpSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useVerifyOtpMutation } from "@/redux/services/authApi";
import { useEffect, useState } from "react";
import { useResendOtpMutation } from "@/redux/services/authApi";
import { ROUTES } from "@/constants/routes";

interface LoginVerificationFormProps {
  username: string;
  password: string;
}

const LoginVerificationForm = ({
  username,
  password,
}: LoginVerificationFormProps) => {
  const [resendOtp] = useResendOtpMutation();
  const navigate = useNavigate();
  const [verifyOtpMutation] = useVerifyOtpMutation();
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(true);

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

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [secondsLeft]);

  const handleResend = async () => {
    if (!username || !password) {
      toast.error("Missing credentials", { duration: 1500 });
      return;
    }
    try {
      await resendOtp({ username, password }).unwrap();
      toast.success("OTP resent to your email", {
        duration: 1500,
      });
      setSecondsLeft(30);
      setIsResendEnabled(false);
    } catch (err) {
      toast.error("Failed to resend OTP", {
        duration: 1500,
      });
      console.error("Resend error", err);
    }
  };

  const onSubmit = async (values: OTPFormValues) => {
    if (!username || !password) {
      toast.error("Missing login credentials.");
      return;
    }
    try {
      await verifyOtpMutation({
        username,
        password,
        otpCode: values.otp,
      }).unwrap();

      toast.success("Verification successful", {
        duration: 1500,
      });
      navigate(ROUTES.POST_LOGIN_REDIRECT);
    } catch (error) {
      toast.error("Invalid or expired OTP", {
        duration: 1500,
      });
      console.error("Verification error:", error);
    }
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
            {username}
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

            <div className="flex justify-center flex-col">
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                className=" h-12 bg-primary text-[16px] leading-[22px] font-semibold text-white  rounded-full min-w-[150px] min-h-[52px]"
              >
                {isSubmitting ? "Verifying..." : "Verify and Continue"}
              </Button>

              <div className="text-center mt-2">
                {isResendEnabled ? (
                  <Button
                    className="font-normal text-muted-foreground text-[14px] leading-[18px] text-center"
                    variant={"link"}
                    onClick={handleResend}
                  >
                    Resend Code
                  </Button>
                ) : (
                  <span className="text-muted-foreground">
                    Resend code in {secondsLeft}s
                  </span>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginVerificationForm;
