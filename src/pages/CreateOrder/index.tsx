import CreateOrderFormV2 from "@/components/provider/create-order-stepperV2";

import { Link } from "react-router-dom";

const CreateOrderPage = () => {
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
        className="mt-10  rounded-[15px] max-w-[1000px] mx-auto p-6 bg-white"
        style={{
          boxShadow: "0px 8px 10px 0px hsla(0, 0%, 0%, 0.08)",
        }}
      >
        <CreateOrderFormV2 />
      </div>
    </>
  );
};

export default CreateOrderPage;
