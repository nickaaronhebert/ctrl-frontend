import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type LoginFormValues, loginSchema } from "@/schemas/loginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import BackButton from "@/components/BackButton/BackButton";
import CTRLLogo from "@/components/CTRLLogo/CTRLLogo";
import PasswordInputField from "@/components/PasswordInputField/PasswordInputField";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    console.log("Form submitted:", values);
    await new Promise((res) => setTimeout(res, 1000));
    form.reset();
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <BackButton />
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <CTRLLogo />
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Welcome to Ctrl by Telegra
              </h1>
              <p className="text-gray-600 text-sm">
                Sign in to access your workflow management dashboard
              </p>
            </div>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email address"
                          className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-200 focus-visible:ring-blue-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInputField
                          field={field}
                          showPassword={showPassword}
                          togglePassword={togglePassword}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-white data-[state=checked]:border-black"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-white-700 font-normal cursor-pointer">
                          Remember me
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg"
                >
                  {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-8 space-y-1">
            <p className="text-sm text-blue-600">
              Designed to make your prescription workflow easier
            </p>
            <p className="text-xs text-gray-500">
              Protected by industry-standard encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
