import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import InputField from "../InputField/InputField";
import { useLoginMutation } from "@/redux/services/authApi";
import AuthHeader from "../AuthHeader/AuthHeader";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (values: LoginFormValues) => {
    console.log("Email", values.email);
    console.log("Password", values.password);
    try {
      const response = await login({
        username: values.email,
        password: values.password,
      }).unwrap();
      console.log("response", response);
      form.reset();
      toast.success("Login Successful");
      navigate("/provider/warning");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <AuthHeader title="Welcome Back" />
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
            <div className="flex items-center justify-end">
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-muted-peach font-normal text-[14px] leading-[18px]"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex justify-center">
              <Button
                disabled={!isDirty || !isValid}
                type="submit"
                className=" h-12 bg-primary text-[16px] leading-[22px] font-semibold text-white  rounded-full min-w-[150px] min-h-[52px]"
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
