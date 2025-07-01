import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { ROUTES } from "./constants/routes";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.GET_PROFILE} element={<Profile />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
