import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

// Back Button Component
const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBackClick}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8 cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-medium">Back</span>
    </Button>
  );
};

export default BackButton;
