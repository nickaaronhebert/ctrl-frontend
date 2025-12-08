import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  orgCredentialSchema,
  type OrgCredential,
} from "@/schemas/orgCredentialsSchema";
import { Form, FormField } from "@/components/ui/form";
import type z from "zod";
import {
  useCreatePharmacyCredsMutation,
  useUpdatePharmacyCredsMutation,
} from "@/redux/services/pharmacy";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface CreateOrganizationCredentialsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  organizationName?: string;
  id?: string;
  invitation?: string;
  update?: boolean;
}

export function CreateOrganizationCredentialsModal({
  open,
  setOpen,
  organizationName,
  id,
  invitation,
  update = false,
}: CreateOrganizationCredentialsModalProps) {
  const form = useForm<z.infer<typeof orgCredentialSchema>>({
    resolver: zodResolver(orgCredentialSchema),
    defaultValues: {
      platformType: "basic",
      apiBaseUrl: "",
      username: "",
      password: "",
      accessToken: "",
      headers: "",
    },
  });

  const [createPharmacyCreds] = useCreatePharmacyCredsMutation();
  const [updatePharmacyCreds] = useUpdatePharmacyCredsMutation();

  const platformType = form.watch("platformType");

  console.log("Errors", form.formState.errors);

  const onSubmit = async (data: OrgCredential) => {
    try {
      let parsedHeaders = {};
      if (data?.headers) {
        try {
          parsedHeaders = JSON.parse(data?.headers);
        } catch (error) {
          toast.error("Invalid JSON format in headers field");
          return;
        }
      }
      const payload =
        data.platformType === "basic"
          ? {
              organization: id,
              invitation,
              url: data.apiBaseUrl,
              headers: parsedHeaders,
              authenticationType: "basic",
              username: data.username!,
              password: data.password!,
            }
          : {
              organization: id,
              invitation,
              url: data.apiBaseUrl,
              headers: parsedHeaders,
              authenticationType: "token",
              token: data.accessToken!,
            };
      if (update) {
        await updatePharmacyCreds(payload).unwrap();
      } else {
        await createPharmacyCreds(payload).unwrap();
      }

      toast.success("Organization credentials created successfully!", {
        duration: 1500,
      });
      setOpen(false);
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const err = error as { data?: { message?: string } };
        toast.error(err.data?.message || "Failed to create credentials");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-5">
        <DialogTitle>{` ${
          update ? "Update" : "Create"
        } Organization Credentials`}</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {update ? "Update" : "Create"} credentials for{" "}
                {organizationName} to access your pharmacy system.
              </p>

              {/* Platform Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="platform-type">Platform Type</Label>
                <Select
                  // id="platform-type"

                  value={platformType}
                  onValueChange={(value) =>
                    form.setValue("platformType", value as "basic" | "token")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Authentication</SelectItem>
                    <SelectItem value="token">Token Authentication</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.platformType && (
                  <p className="text-red-500">
                    {form.formState.errors.platformType.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <FormField
                  name="apiBaseUrl"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="api-base-url">API Base URL</Label>
                      <Input
                        id="api-base-url"
                        placeholder="e.g. https://host27a.diffe.net:1085/api/v1/27"
                        {...field}
                      />
                      {form.formState.errors.apiBaseUrl && (
                        <p className="text-red-500">
                          {form.formState.errors.apiBaseUrl?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Basic Authentication Fields */}
              {platformType === "basic" && (
                <>
                  <div className="space-y-2">
                    <FormField
                      name="username"
                      control={form.control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            placeholder="Enter username"
                            {...field}
                          />
                          {form.formState.errors.username && (
                            <p className="text-red-500">
                              {form.formState.errors.username?.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Minimum 8 characters"
                            {...field}
                          />
                          {form.formState.errors.password && (
                            <p className="text-red-500">
                              {form.formState.errors.password?.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </>
              )}

              {/* Token Authentication Fields */}
              {platformType === "token" && (
                <div className="space-y-2">
                  <FormField
                    name="accessToken"
                    control={form.control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label htmlFor="access-token">Access Token</Label>
                        <Input
                          id="access-token"
                          placeholder="Enter access token"
                          {...field}
                        />
                        {form.formState.errors.accessToken && (
                          <p className="text-red-500">
                            {form.formState.errors.accessToken?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}

              {/* Headers */}
              <div className="space-y-2">
                <FormField
                  name="headers"
                  control={form.control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="headers">Headers (JSON)</Label>
                      <textarea
                        id="headers"
                        placeholder='{"Authorization": "Bearer token", "X-Custom-Header": "value"}'
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                        rows={3}
                        {...field}
                      />
                      {form.formState.errors.headers && (
                        <p className="text-red-500">
                          {form.formState.errors.headers?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="rounded-lg cursor-pointer"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer"
              >
                {form.formState.isSubmitting ? (
                  <LoadingSpinner />
                ) : (
                  "Confirm & Accept"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
