import CreateOrderForm from "@/components/provider/create-order-stepper";
import { Link } from "react-router-dom";

const CreateOrder = () => {
  return (
    <>
      <div className="bg-lilac py-3 px-12">
        <Link
          to={"/org/orders"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Orders"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Create Order </h1>
      </div>
      <div
        className="mt-10 min-h-screen rounded-[15px] max-w-[1000px] mx-auto p-6 bg-white"
        style={{
          boxShadow: "0px 8px 10px 0px hsla(0, 0%, 0%, 0.08)",
        }}
      >
        <CreateOrderForm />
      </div>
    </>
  );
};

export default CreateOrder;
