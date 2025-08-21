import SuccessCheckSVG from "@/assets/icons/SuccessCheckIcon";

import { Link } from "react-router-dom";

export default function PatientStatus() {
  return (
    <>
      <div className=" bg-[#EFE8F5] py-3 px-12">
        <Link
          to={"/org/patients"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Patients"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Create Patient</h1>
      </div>
      <div className="mt-6 w-full flex justify-center">
        <div className="w-[700px] h-96 bg-white py-12 px-5 flex justify-center">
          <div className="w-[500px] h-[276px] flex flex-col justify-center items-center py-12 px-5 bg-[#F6F8F9] gap-2.5">
            <SuccessCheckSVG />
            <p className="font-semibold text-xl">
              Patient created successfully!
            </p>
            <p className="text-sm font-normal text-[#63627F]">
              Now you can create order yor this patient.
            </p>
            <Link
              to={"/org/create-order"}
              className="bg-primary rounded-full text-white py-2.5 px-7 h-12"
            >
              Create Order
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
