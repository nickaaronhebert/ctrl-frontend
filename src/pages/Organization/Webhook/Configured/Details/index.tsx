import { ArrowLeft } from "lucide-react";
import Logs from "./LogDetail";
import { EditWebhook } from "../Edit";
import { useState } from "react";
import { useGetWebhookDetailsQuery } from "@/redux/services/webhook";
import { Link, useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { convertExtendedDate } from "@/lib/utils";
import { useGetEventLogsQuery } from "@/redux/services/webhook";

export default function ConfiguredWebhookDetails() {
  const { id } = useParams();
  const [openEditWebhook, setOpenEditWebhook] = useState(false);
  const { data, isLoading } = useGetWebhookDetailsQuery(id!, {
    skip: !id,
    selectFromResult: ({ data, isLoading }) => ({
      data: data?.data,
      isLoading,
    }),
  });

  const { data: eventDetail, isLoading: eventsLoading } = useGetEventLogsQuery(
    {
      page: 1,
      perPage: 10,
      webhook: id,
    },
    {
      skip: !id,
    }
  );
  if (!id || isLoading || eventsLoading) {
    return (
      <div className="h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  console.log("data>>>]>", data);

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
          <h6 className="text-2xl font-semibold mt-1">{data?.name}</h6>
        </div>
        <EditWebhook
          open={openEditWebhook}
          onOpenChange={setOpenEditWebhook}
          values={data}
          id={id}
        />
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
              <p className="text-sm font-normal">Organization</p>
              <p className="text-sm  text-black font-semibold">
                {data?.targetOrganization?.name}
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

          <Logs response={eventDetail} />
        </div>
      </div>
    </div>
  );
}
