import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slices/auth";

const Home = () => {
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user) {
      navigate("/provider/prescription");
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return null;
};

export default Home;
