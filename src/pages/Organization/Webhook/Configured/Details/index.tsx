import { ArrowLeft } from "lucide-react";
import Logs from "./LogDetail";
import { EditWebhook } from "../Edit";
import { useState } from "react";
import { useGetWebhookDetailsQuery } from "@/redux/services/webhook";
import { Link, useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { convertExtendedDate } from "@/lib/utils";

export default function ConfiguredWebhookDetails() {
  const { id } = useParams();
  console.log(id);
  const [openEditWebhook, setOpenEditWebhook] = useState(false);
  const { data, isLoading } = useGetWebhookDetailsQuery(id!, {
    skip: !id,
    selectFromResult: ({ data, isLoading }) => ({
      data: data?.data,
      isLoading,
    }),
  });

  if (!id || isLoading) {
    return (
      <div className="h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between bg-[#EFE8F5] p-5">
        <div>
          <Link className="flex gap-2 items-center" to={"/org/webhook"}>
            <ArrowLeft stroke="#63627F" size={16} />

            <p className="text-sm font-normal text-[#63627F]">
              {""}
              Back to Webhooks
            </p>
          </Link>
          <h6 className="text-2xl font-semibold mt-1">
            {" "}
            Patient Portal Webhook
          </h6>
        </div>
        <EditWebhook
          open={openEditWebhook}
          onOpenChange={setOpenEditWebhook}
          values={data}
          id={id}
        />
        {/* <CreateWebhook
                  open={openCreateWebhook}
                  onOpenChange={setOpenCreateWebhook}
        /> */}
      </div>

      <div className="p-8">
        <div className="p-5 bg-white shadow-[0px_2px_40px_0px_#00000014] rounded-md">
          <div className="p-3.5 bg-[#F7F1FD] space-y-3">
            <div className="flex justify-between">
              <p className="text-sm font-normal">Webhook ID</p>
              <p className="text-sm font-medium">{data?.webhookId}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm font-normal">Target URL</p>
              <p className="text-sm font-medium text-primary">
                {data?.targetUrl}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm font-normal">Authentication</p>
              <p className="text-sm font-medium">
                {data?.authType === "basic_auth"
                  ? "Basic Authentication"
                  : "Header Authentication"}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-sm font-normal">Created Date</p>
              <p className="text-sm font-medium text-gray-500">
                {convertExtendedDate(data?.createdAt || "")}
              </p>
            </div>
          </div>

          <Logs />
        </div>
      </div>
    </div>
  );
}
