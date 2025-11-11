import EncounteredForm from "@/components/common/EncounteredForm/EncounteredForm";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  //   const navigate = useNavigate();
  return (
    <>
      <div className=" bg-[#EFE8F5] py-3 px-12 flex">
        <div>
          <Link
            to={"/admin/encountered"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Encountered Products"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">Add Product</h1>
        </div>
      </div>
      <div className="py-10">
        <EncounteredForm />
      </div>
    </>
  );
};

export default AddProductForm;
