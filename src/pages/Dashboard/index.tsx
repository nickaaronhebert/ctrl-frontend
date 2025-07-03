import AuthorisedUsage from "@/components/Permissions/AuthorizedUsage";
import { MODULE, PERMISSIONS } from "@/components/Permissions/permissions";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="">
      <h1>Hello</h1>
      <AuthorisedUsage
        resource={MODULE.DASHBOARD}
        action={PERMISSIONS.READ}
        failure={
          <div className="text-center text-red-500">Permission Denied</div>
        }
      >
        <div>
          <h1 className="text-3xl font-bold text-center">
            Welcome to the Dashboard
          </h1>
        </div>
      </AuthorisedUsage>
    </div>
  );
};

export default Dashboard;
