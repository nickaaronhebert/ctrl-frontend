import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import CTRLLogo from "../CTRLLogo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordSchema,
  type PasswordFormValues,
} from "@/schemas/resetPasswordSchema";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import InputField from "../InputField/InputField";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const form = useForm<PasswordFormValues>({
    mode: "onChange",
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (values: PasswordFormValues) => {
    console.log("Form submitted:", values);
    await new Promise((res) => setTimeout(res, 1000));
    form.reset();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-center mb-[40px]">
          <CTRLLogo />
        </div>
        <div className="text-center my-8">
          <h1 className="text-secondary-foreground font-semibold text-[26px] leading-[30px] mb-2">
            Forgot Your Password?
          </h1>
          <p className="text-muted-foreground font-normal leading-[22px] text-[16px]">
            Let's create a new one now
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <InputField
                  {...field}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <InputField
                  {...field}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              )}
            />
            <div className="flex justify-center">
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                className=" h-12 bg-primary  text-white font-medium rounded-full min-w-[150px] min-h-[52px]"
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
