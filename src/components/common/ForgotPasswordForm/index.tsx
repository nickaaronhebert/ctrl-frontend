import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import InputField from "../InputField/InputField";
import AuthHeader from "../AuthHeader/AuthHeader";
import { useRequestPasswordResetMutation } from "@/redux/services/authApi";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [requestPasswordReset] = useRequestPasswordResetMutation();

  const form = useForm<ForgotPasswordFormValues>({
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      const response = await requestPasswordReset({
        email: values.email,
      }).unwrap();

      if (response && response.statusCode === 200) {
        toast.success("Reset link sent successfully to your email.");
        form.reset();
        navigate(ROUTES.RESET_LINK);
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };
      const message =
        err?.data?.message || "Failed to send reset link. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <AuthHeader
          title=" Forgot Password?"
          description="Type your email and we'll send you an invitation link"
        />
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <InputField
                  {...field}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
              )}
            />

            <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-3 sm:gap-4 ">
              <Button
                type="button"
                variant={"outline"}
                className="h-12 border-border-secondary font-semibold text-[16px] leading-[22px] text-center rounded-full w-full md:min-w-[150px] md:w-[163px] md:max-w-[150px] min-h-[52px] md:h-[52px]"
                onClick={() => navigate(ROUTES.HOME)}
              >
                Back to Login
              </Button>
              <Button
                type="submit"
                onClick={async () => {
                  const isEmailValid = await form.trigger("email");
                  if (!isEmailValid) {
                    return;
                  }
                  navigate(ROUTES.RESET_LINK);
                }}
                className="h-12 bg-primary text-white font-semibold text-[16px] leading-[22px] rounded-full w-full md:min-w-[150px] sm:max-w-[250px] min-h-[52px] md:h-[52px] "
              >
                Send Reset Password Link
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
