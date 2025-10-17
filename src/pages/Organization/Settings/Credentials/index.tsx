import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  useGenerateCredentialsMutation,
  useViewCredentialsQuery,
} from "@/redux/services/admin";
import { toast } from "sonner";
import type { ListCredentials } from "@/types/responses/IViewAllCredentials";

function ApiCredentialsList({ credentials }: { credentials: ListCredentials }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-w-[800px]  flex justify-center  py-2 rounded-2xl">
      <div className="w-full max-w-3xl ">
        <div className="bg-white rounded-2xl  p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              API Credentials
            </h2>
            <p className="text-gray-600">Manage your generated API keys</p>
          </div>

          <div className="space-y-3  max-h-[350px] overflow-y-auto scrollbar-thin">
            {credentials.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md "
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Public Key
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-gray-800 truncate">
                        {item?.publicKey || ""}
                      </code>
                      {/* <button
                        onClick={() => copyToClipboard(item.publicKey, item.id)}
                        className="flex-shrink-0 p-1.5 text-gray-600 hover:text-purple-600 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied === item.id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button> */}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Expires On
                    </label>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 font-medium">
                        {formatDate(item?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {credentials.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              <p className="text-gray-500">No credentials found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GenerateCredentials({
  setApiSecretKey,
  setApiPublicKey,
  setNewSecretKey,
}: {
  setApiSecretKey: React.Dispatch<React.SetStateAction<string>>;
  setApiPublicKey: React.Dispatch<React.SetStateAction<string>>;
  setNewSecretKey: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [GenerateCredentials] = useGenerateCredentialsMutation();

  async function handleSubmit() {
    await GenerateCredentials({
      description: "API Key for external integrations",
      expiryDate: date,
    })
      .unwrap()
      .then((data) => {
        setApiSecretKey(data?.data?.secretKey || "");
        setApiPublicKey(data?.data?.publicKey || "");
        setNewSecretKey(false);
        toast.success(data?.message || "Credentials Generated Successfully", {
          duration: 1500,
        });
        // reset();
        // navigate("/org/patients");
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 3000,
        });
      });
  }
  return (
    <div className="bg-white  p-8 text-center h-fit">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">API Credentials</h2>
      <p className="text-gray-600 mb-4">
        Generate secure API keys for your application
      </p>

      <div className="flex flex-col gap-3 items-center mb-6">
        <div>
          <Label htmlFor="date" className="px-1 mb-2">
            Set Expiry Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-[340px] justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select Expiry Date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[280px] overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button
        className="rounded-[18px]"
        variant={"ctrl"}
        size={"lg"}
        disabled={!date}
        onClick={handleSubmit}
      >
        {" "}
        Generate API Credentials
      </Button>
    </div>
  );
}

function SaveCredentials({
  publicKey,
  secretKey,
}: {
  publicKey: string;
  secretKey: string;
}) {
  const [copied, setCopied] = useState({ public: false, secret: false });

  const copyToClipboard = (text: string, type: "public" | "secret") => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  return (
    <div className="bg-white ">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">
        Configure Credentials
      </h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Public Key
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={publicKey}
              readOnly
              style={{ width: "450px" }}
              className=" px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-mono text-sm "
            />
            <button
              onClick={() => copyToClipboard(publicKey, "public")}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              {copied.public ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secret Key
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={secretKey}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-mono text-sm"
            />
            <button
              onClick={() => copyToClipboard(secretKey, "secret")}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              {copied.secret ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Save this key securely. It will be hidden after saving.
          </p>
        </div>
      </div>

      {/* <button
        //   onClick={handleSave}
        //   disabled={!expiryDate}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Save Credentials
      </button> */}
    </div>
  );
}

export default function CreateCredentials() {
  const [apiSecretKey, setApiSecretKey] = useState<string>("");
  const [publicKey, setApiPublicKey] = useState<string>("");
  const [newSecretKey, setNewSecretKey] = useState(false);
  const { data } = useViewCredentialsQuery();

  return (
    <div className="min-h-[500px] w-full bg-white rounded-bl-[15px] rounded-br-[15px] flex justify-center pt-8">
      {((!apiSecretKey && !publicKey && data?.data?.length === 0) ||
        newSecretKey) && (
        <GenerateCredentials
          setApiSecretKey={setApiSecretKey}
          setApiPublicKey={setApiPublicKey}
          setNewSecretKey={setNewSecretKey}
        />
      )}

      {!apiSecretKey &&
        !publicKey &&
        !newSecretKey &&
        data?.data &&
        data?.data?.length > 0 && (
          <>
            <div>
              <ApiCredentialsList credentials={data?.data} />
              <div className="w-[750px] flex justify-end mb-3.5">
                <Button
                  className="rounded-[18px] "
                  variant={"ctrl"}
                  size={"lg"}
                  onClick={() => setNewSecretKey(true)}
                >
                  {" "}
                  Generate New API Credentials
                </Button>
              </div>
            </div>
          </>
        )}

      {apiSecretKey && publicKey && !newSecretKey && (
        <SaveCredentials publicKey={publicKey} secretKey={apiSecretKey} />
      )}

      {/* <SaveCredentials /> */}
    </div>
  );
}
