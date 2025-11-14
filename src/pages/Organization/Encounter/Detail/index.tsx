import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useGetAllEncounterDetailsQuery } from "@/redux/services/encounter";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import { Download } from "lucide-react";
// const EncounterStatusMapper = {
//   started: 0,
//   in_review: 1,
//   completed: 2,
//   cancelled: 3,
// };

interface EntityDetailProps {
  title: string;

  fields: {
    label: string;
    value: string;
  }[];
}

interface EncounterStatusDetailProps {
  active: boolean;
  title: string;
  subtitle: string;
  date: string;
}

function EncounterStatusDetails({
  active,
  title,
  subtitle,
  date,
}: EncounterStatusDetailProps) {
  return (
    <div className="w-full flex justify-between items-center px-2">
      <div className="flex gap-2.5 items-center ">
        <div
          className={cn(
            "rounded-[50px] p-3 ",
            active ? "bg-[#1AA061]" : "bg-[#9EA5AB]"
          )}
        >
          <CircleCheck size={20} stroke={"white"} />
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="font-normal text-[#3E4D61] text-xs">{subtitle}</p>
        </div>
      </div>

      <p className="text-xs font-medium text-[#64748B]">{date}</p>
    </div>
  );
}

function EntityDetail({ title, fields }: EntityDetailProps) {
  return (
    <div
      className="bg-white rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
      id="patientInformation"
    >
      <h2 className="text-base font-semibold p-5 border-b border-card-border flex items-center gap-2">
        {/* <Profile color="black" width={16} height={16} /> */}
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <h4 className="text-sm font-normal text-muted-foreground">
              {label}
            </h4>
            <span
              className={`text-sm font-medium text-primary-foreground mt-2 ${
                label !== "Email" ? "capitalize" : ""
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function EncounterDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetAllEncounterDetailsQuery(id!, {
    skip: !id,
    selectFromResult: ({ data, isLoading, isError }) => ({
      data: data?.data,
      isLoading,
      isError,
    }),
  });

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-lilac py-3 px-12 flex justify-between items-center">
        <div className="">
          <Link
            to={"/org/encounter"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Encounters"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">
            Encounter: {data?.encounterId}{" "}
          </h1>
        </div>
      </div>

      <div className="w-full flex gap-8">
        <div className=" w-5xl">
          <div className="space-y-12">
            <EntityDetail
              title="Patient Information"
              fields={[
                {
                  label: "Patient Name",
                  value:
                    `${data?.patient.firstName} ${data?.patient.lastName}` ||
                    "",
                },
                {
                  label: "Date of Birth",
                  value: data?.patient.dob
                    ? format(new Date(data.patient.dob), "MMM dd, yyyy")
                    : "",
                },
                {
                  label: "Email",
                  value: data?.patient.email || "-",
                },
                {
                  label: "Phone Number",
                  value: data?.patient.phoneNumber || "-",
                },
              ]}
            />

            <EntityDetail
              title="Service Details"
              fields={[
                {
                  label: "Service Type",
                  value: data?.encounterProduct?.[0]?.name || "-",
                },
              ]}
            />
          </div>

          <div className=" bg-white rounded-[10px] shadow-[0px_2px_40px_0px_#00000014] mt-12">
            <p className="text-[16px] font-semibold border-b border-card-border p-5 ">
              Encounter Status Timeline
            </p>
            <div className="px-5 rounded-bl-[10px] rounded-br-[10px] p-5 ">
              <EncounterStatusDetails
                title="Encounter created"
                subtitle="Intake link not yet sent."
                date="Nov 11, 2025"
                active={false}
              />
              <div className="min-h-[30px] border-l border-l-black border-dotted ml-[30px]" />
              <EncounterStatusDetails
                title="Intake Sent"
                subtitle="Link generated, sent via SMS/email, awaiting patient."
                date="Nov 11, 2025"
                active={true}
              />
              <div className="min-h-[30px] border-l border-l-black border-dotted ml-[30px]" />
              <EncounterStatusDetails
                title="Intake in Progress"
                subtitle="Patient has started but not submitted."
                date="Nov 11, 2025"
                active={false}
              />
              <div className="min-h-[30px] border-l border-l-black border-dotted ml-[30px]" />
              <EncounterStatusDetails
                title="Provider Queue"
                subtitle="Patient submitted intake, awaiting provider review."
                date="Nov 11, 2025"
                active={false}
              />
              <div className="min-h-[30px] border-l border-l-black border-dotted ml-[30px]" />
              <EncounterStatusDetails
                title="Completed"
                subtitle="Provider finalized encounter; ready for order submission."
                date="Nov 11, 2025"
                active={false}
              />
            </div>
          </div>
        </div>

        <div>
          <div className=" bg-white rounded-[10px] shadow-[0px_2px_40px_0px_#00000014] min-w-[350px] ">
            <p className="text-[16px] font-semibold border-b border-card-border p-5 ">
              Attachments
            </p>
            <div className="p-2.5  ">
              <div className="rounded-[10px]  border border-card-border flex justify-around items-center py-2.5">
                <div className="rounded-[6px] bg-purple-100 p-2">
                  <FileText stroke="#5456AD" />
                </div>
                <div>
                  <p className="font-semibold text-base">
                    Patient Intake Form.pdf
                  </p>
                  <div className="space-x-2.5">
                    <span className="text-sm">240kb</span>
                    <span className="text-sm">11/10/2025</span>
                  </div>
                </div>
                <Download />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
