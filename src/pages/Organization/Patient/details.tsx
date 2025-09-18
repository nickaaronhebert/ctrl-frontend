import Orders from "@/assets/icons/Orders";
import PatientIcon from "@/assets/icons/PatientIcon";

import { patientOrderColumns } from "@/components/data-table/columns/patient-order";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useDataTable } from "@/hooks/use-data-table";
import { useViewAllOrdersQuery } from "@/redux/services/order";
import { useGetPatientDetailsByIdQuery } from "@/redux/services/patientApi";

import { useMemo } from "react";

import { Link, useParams, useSearchParams } from "react-router-dom";

function PatientOrdersList({ patientId }: { patientId: string }) {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const { data: orderData, meta } = useViewAllOrdersQuery(
    {
      page,
      perPage,
      q: "",
      patient: patientId,
    },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const columns = useMemo(() => patientOrderColumns(), []);
  const { table } = useDataTable({
    data: orderData || [],
    columns,
    pageCount: meta?.pageCount ?? -1,
  });

  return (
    <div className="mt-3.5 bg-white border border-card-border rounded-2xl pb-[12px]  ">
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  );
}

function PatientDetails({ patientId }: { patientId: string }) {
  const { data } = useGetPatientDetailsByIdQuery(patientId, {
    selectFromResult: ({ data, isLoading }) => ({
      data: data?.data,
      isLoading: isLoading,
    }),
  });

  if (!data)
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  const formattedDate = new Date(data?.dob).toLocaleDateString("en-US");
  const allergyList = data?.medicationAllergies
    ? data.medicationAllergies
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0) // removes empty strings
    : [];

  const medicationList = data?.currentMedications
    ? data.currentMedications
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0) // removes empty strings
    : [];

  const defaultAddress = data?.addresses?.filter(
    (address) => address?.isDefault === true
  )?.[0];

  return (
    <>
      <div className=" bg-[#EFE8F5] py-3 px-12 flex justify-between items-center">
        <div>
          <Link
            to={"/org/patients"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Patients"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">
            Patient: {data?.patientId}{" "}
          </h1>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/org/create-order?patientId=${data.id}`}
            className="bg-primary-foreground rounded-full text-white py-2.5 px-7 h-12"
          >
            Create Order
          </Link>
          <Link
            to={`/org/edit-patient/${patientId}`}
            className="bg-white rounded-full text-[#000000] py-2.5 px-7 h-12"
          >
            Edit Patient
          </Link>
        </div>
      </div>
      <div className="p-12 flex gap-8">
        <div className="min-w-[350px] max-w-[330px] border border-card-border rounded-[6px] h-fit">
          <div className="flex gap-4 p-4 rounded-tl-[6px] rounded-tr-[6px] border-b border-card-border bg-[#F6F8F9]">
            <div className="flex justify-center items-center h-16 w-16 p-4 bg-primary rounded-[8px]">
              <PatientIcon />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium capitalize">{`${data.firstName} ${data.lastName}`}</p>
              <p className="text-xs font-normal text-[#3E4D61]">
                {data.phoneNumber}
              </p>
              <p className="text-xs font-normal text-[#3E4D61]">{data.email}</p>
            </div>
          </div>
          <div className="py-3.5 px-5 border-b border-card-border bg-white">
            <p className="text-base font-semibold">Patient Information</p>
            <div>
              <div className="flex justify-between my-2">
                <p className="text-sm font-normal text-[#63627F]">
                  Gender / DOB
                </p>
                <p className="text-sm font-medium">
                  {data.gender}, {formattedDate}
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <p className="text-sm font-normal text-[#63627F]">Address</p>
                <div>
                  <p className="text-sm text-right font-medium">{`${defaultAddress?.address1}, ${defaultAddress?.address2}, ${defaultAddress?.city}, ${defaultAddress?.zipcode}, ${defaultAddress?.state}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-3.5 px-5 bg-white rounded-bl-[6px] rounded-br-[6px]">
            <p className="text-base font-semibold">Patient Diagnostics</p>
            {allergyList?.length > 0 && (
              <div>
                <div className="flex justify-between mt-1">
                  <p className="text-sm font-normal text-[#63627F]">
                    Medication Allergies
                  </p>
                  <div className="max-h-32 overflow-y-auto   rounded-lg">
                    <div className="flex justify-end flex-wrap gap-2">
                      {allergyList.map((allergy, index) => (
                        <span
                          key={`${allergy}${index}`}
                          className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-lg font-medium shadow-sm "
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {medicationList?.length > 0 && (
              <div>
                <div className="flex justify-between my-2">
                  <p className="text-sm font-normal text-[#63627F]">
                    Current Medications
                  </p>
                  <div className="max-h-32 overflow-y-auto   rounded-lg">
                    <div className="flex justify-end flex-wrap gap-2">
                      {medicationList.map((medication, index) => (
                        <span
                          key={`${medication}${index}`}
                          className="text-xs bg-[#F6F8F9] text-primary-foreground px-2 py-1 rounded-lg font-medium shadow-sm "
                        >
                          {medication}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between my-2">
                <p className="text-sm font-normal text-[#63627F]">
                  Height / Weight
                </p>
                <p className="text-sm font-medium">
                  {`${data.height}(inches), ${data.weight}(pounds)`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1  rounded-2xl bg-white shadow-[0px_2px_40px_0px_#0000000D]">
          <div className="flex gap-2.5 items-center border-b border-card-border p-4">
            <Orders color="black" />
            <p className="text-base font-semibold">Order History</p>
          </div>
          <div className="p-5">
            <PatientOrdersList patientId={patientId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default function ViewPatientDetails() {
  const { id } = useParams();

  if (!id) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  } else {
    return <PatientDetails patientId={id} />;
  }
}
