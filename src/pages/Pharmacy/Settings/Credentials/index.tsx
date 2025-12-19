import { useGetPharmacyCredentialsQuery } from "@/redux/services/webhook";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

function ApiCredentialsList({ credentials }: { credentials: any }) {
  const BASE_API_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  const [copied, setCopied] = useState<{
    public: boolean;
    secret: boolean;
    webhook: boolean;
  }>({
    public: false,
    secret: false,
    webhook: false,
  });

  const copyToClipboard = (
    text: string,
    type: "public" | "secret" | "webhook"
  ) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 2000);
  };

  const webhookUrl = credentials?.slug
    ? `${BASE_API_URL}/webhook/pharmacy/${credentials.slug}`
    : "";

  return (
    <div className="min-w-[800px]  flex justify-center  py-2 rounded-2xl">
      <div className="w-full max-w-3xl ">
        <div className="bg-white rounded-2xl  p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Pharmacy Webhook Credentials
            </h2>
            <p className="text-gray-600">Manage your generated API keys</p>
          </div>

          <div className="space-y-3  max-h-[350px] overflow-y-auto scrollbar-thin">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md ">
              <div className="flex items-center justify-between gap-4 ">
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Webhook URL
                  </label>
                  <div className="flex items-center gap-2 justify-between w-full">
                    <code className="text-sm font-mono text-gray-800 truncate">
                      {webhookUrl || ""}
                    </code>

                    <button
                      onClick={() => copyToClipboard(webhookUrl, "webhook")}
                      className="flex-shrink-0 p-1.5 text-gray-600 hover:text-purple-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied.webhook ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md ">
              <div className="flex items-center justify-between gap-4 ">
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Public Key
                  </label>
                  <div className="flex items-center gap-2 justify-between w-full">
                    <code className="text-sm font-mono text-gray-800 truncate">
                      {credentials?.publicKey || ""}
                    </code>

                    <button
                      onClick={() =>
                        copyToClipboard(credentials?.publicKey, "public")
                      }
                      className="flex-shrink-0 p-1.5 text-gray-600 hover:text-purple-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied.public ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md ">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Secret Key
                  </label>
                  <div className="flex items-center gap-2 justify-between w-full">
                    <code className="text-sm font-mono text-gray-800 truncate">
                      {credentials?.secretKey || ""}
                    </code>

                    <button
                      onClick={() =>
                        copyToClipboard(credentials?.secretKey, "secret")
                      }
                      className="flex-shrink-0 p-1.5 text-gray-600 hover:text-purple-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied.secret ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex gap-6 items-center border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md ">
              <div className="flex w-full justify-between">
                <label className="block text-sm font-medium text-gray-500 ">
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
                    {formatDate(credentials?.expiresAt)}
                  </span>
                </div>
              </div>
            </div> */}
          </div>

          {!credentials && (
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

export default function ViewPharmacyCredentials() {
  //   const [apiSecretKey, setApiSecretKey] = useState<string>("");
  //   const [publicKey, setApiPublicKey] = useState<string>("");
  //   const [newSecretKey, setNewSecretKey] = useState(false);
  const { data: pharmacyCredentials, isLoading } =
    useGetPharmacyCredentialsQuery({});

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <LoadingSpinner />
        <span className="text-lg text-black font-semibold mt-2">
          Loading Credentials
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[500px] w-full bg-white rounded-bl-[15px] rounded-br-[15px] flex justify-center pt-8">
        <>
          <div>
            <ApiCredentialsList credentials={pharmacyCredentials?.data} />
          </div>
        </>
      </div>
    </>
  );
}
