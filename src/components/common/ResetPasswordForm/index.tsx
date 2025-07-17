import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordSchema,
  type PasswordFormValues,
} from "@/schemas/resetPasswordSchema";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField/InputField";
import AuthHeader from "../AuthHeader/AuthHeader";
import { useResetPasswordMutation } from "@/redux/services/authApi";
import { toast } from "sonner";

const ResetPasswordForm = ({ token }: any) => {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

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

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await resetPassword({
        password: data.password,
        token,
      }).unwrap();
      toast.success("Password reset successful!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <AuthHeader
          title="Forgot Your Password?"
          description="Let's create a new one now"
        />
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
