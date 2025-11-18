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
import { toast } from "sonner";
import type { BillingFrequency } from "../BillingFrequencySelector/BillingFrequencySelector";
import { useCreateSubOrgCredsMutation } from "@/redux/services/pharmacy";
import { useUpdatePharmacyCredsMutation } from "@/redux/services/pharmacy";

interface SubCreateOrganizationCredentialsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  organizationName?: string;
  organization: string;
  invitation?: string;
  update?: boolean;
  subOrganization: string;
  invoiceFrequency: BillingFrequency;
  isEditing: boolean;
}

export function CreateSubOrgCredentialsModal({
  open,
  setOpen,
  organizationName,
  organization,
  subOrganization,
  invoiceFrequency,
  invitation,
  isEditing,
}: SubCreateOrganizationCredentialsModalProps) {
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

  const [createSubOrgCreds, { isLoading }] = useCreateSubOrgCredsMutation();
  const [updateSubOrgCreds] = useUpdatePharmacyCredsMutation();
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
              organization: organization,
              subOrganization: subOrganization,
              invoiceFrequency: invoiceFrequency,
              invitation,
              url: data.apiBaseUrl,
              headers: parsedHeaders,
              authenticationType: "basic",
              username: data.username!,
              password: data.password!,
            }
          : {
              organization: organization,
              subOrganization: subOrganization,
              invoiceFrequency: invoiceFrequency,
              invitation,
              url: data.apiBaseUrl,
              headers: parsedHeaders,
              authenticationType: "token",
              token: data.accessToken!,
            };

      let finalPayload = payload;
      if (isEditing) {
        const { invoiceFrequency, ...rest } = payload as any;
        finalPayload = rest;
      }

      if (isEditing) {
        await updateSubOrgCreds(finalPayload).unwrap();
        toast.success("Organizations credentials updated successfully", {
          duration: 1500,
        });
      } else {
        await createSubOrgCreds(finalPayload).unwrap();
        toast.success("Organization credentials created successfully!", {
          duration: 1500,
        });
      }

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
        <DialogTitle>Set Sub-Organization Credentials</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Create credentials for{" "}
                <span className="font-bold">{organizationName} </span>to access
                your pharmacy system.
              </p>

              <div className="space-y-2">
                <Label htmlFor="platform-type">Platform Type</Label>
                <Select
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

              {/* API Base URL */}
              {platformType === "basic" && (
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
              )}

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
                className="rounded-lg"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                {isLoading ? "Saving.." : "Confirm & Accept"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
