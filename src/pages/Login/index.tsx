import LoginForm from "@/components/common/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
