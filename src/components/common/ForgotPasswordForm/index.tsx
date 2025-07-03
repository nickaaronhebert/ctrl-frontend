import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import CTRLLogo from "../CTRLLogo";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import InputField from "../InputField/InputField";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    console.log("Form submitted:", values);
    await new Promise((res) => setTimeout(res, 1000));
    form.reset();
  };

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-center mb-6">
          <CTRLLogo />
        </div>
        <div className="text-center my-8">
          <h1 className="text-primary-foreground font-semibold text-[26px] leading-[30px] mb-2">
            Forgot Password?
          </h1>
          <p className="text-muted-foreground font-normal leading-[22px] text-[16px]">
            Type your email and we'll send you an invitation link
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email Field */}
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
                className=" h-12 font-medium rounded-full w-full md:min-w-[150px] md:max-w-[150px] min-h-[52px]"
                onClick={() => navigate(ROUTES.LOGIN)}
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
                className="h-12 bg-primary text-white font-medium rounded-full w-full sm:min-w-[150px] sm:max-w-[200px] min-h-[52px]"
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
