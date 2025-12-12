import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import type z from "zod";

import { createWebhookSchema } from "@/schemas/createWebhook";
import InputElement from "@/components/Form/input-element";
import PasswordInputElement from "@/components/Form/password-element";
import SelectElement from "@/components/Form/select-element";
import { SelectSubOrganization } from "@/components/Form/SelectSubOrganization";
import { useState } from "react";
import TextAreaElement from "@/components/Form/textarea-elements";
import { useCreateWebhookMutation } from "@/redux/services/webhook";
import type { Auth } from "@/types/requests/ICreateWebhook";
import { toast } from "sonner";
import useAuthentication from "@/hooks/use-authentication";

interface CreateWebhookProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const authenticationType = [
  {
    label: "Basic Authentication",
    value: "basic_auth",
  },
  {
    label: "Header Authentication",
    value: "header_auth",
  },
];

export function CreateWebhook({ open, onOpenChange }: CreateWebhookProps) {
  const [status, setStatus] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [createWebhook] = useCreateWebhookMutation();
  const { user } = useAuthentication();

  const form = useForm<z.infer<typeof createWebhookSchema>>({
    mode: "onTouched",
    resolver: zodResolver(createWebhookSchema),
    defaultValues: {
      name: "",
      targetUrl: "",
      userName: "",
      password: "",
      header: "",
      subOrganization: "",
      authenticationType: "",
    },
  });
  const { reset, setError, clearErrors } = form;
  const authType = form.watch("authenticationType");

  const handleCheckboxChange = (checkboxType: "status" | "tracking") => {
    if (checkboxType === "status") {
      setStatus(!status);
    } else {
      setTracking(!tracking);
    }
    if (status || tracking) {
      clearErrors("root");
    }
  };

  async function onSubmit(values: z.infer<typeof createWebhookSchema>) {
    console.log("values", values);

    if (!status && !tracking) {
      setError("root", {
        message: "At least one webhook type must be selected",
      });
      return;
    }

    const eventTypes = [];
    if (status) eventTypes.push("status_update");
    if (tracking) eventTypes.push("tracking_received");

    let parsedHeaders = {};
    if (values.authenticationType === "header_auth") {
      if (values.header) {
        try {
          parsedHeaders = JSON.parse(values.header);
        } catch (error) {
          setError("header", { message: "Invalid JSON format for headers" });
          toast.error("Invalid JSON format for headers");
          return;
        }
      }
    }

    const auth: Auth =
      values.authenticationType === "header_auth"
        ? {
            headers: parsedHeaders,
          }
        : {
            username: values.userName,
            password: values.password,
          };

    await createWebhook({
      name: values.name,
      targetUrl: values.targetUrl,
      targetOrganization: values.subOrganization || user?.organization?._id,
      authType: values.authenticationType,
      authConfig: auth,
      eventTypes: eventTypes,
    })
      .unwrap()
      .then((data) => {
        toast.success(data?.message || "Webhook  Created Successfully");
        reset();
        onOpenChange?.(false);
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong");
      });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"ctrl"} size={"xl"} className="">
          Create Webhook
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl ">
        <DialogHeader className="flex-col border-b border-[#D9D9D9] px-5 py-1.5">
          <DialogTitle className="text-lg font-semibold p-2">
            Create Webhook
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 max-h-[800px] overflow-y-auto overflow-x-hidden">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <InputElement
                name="name"
                label="Webhook Name"
                isRequired={true}
                placeholder="Eg. ERP System"
                messageClassName="text-right"
                inputClassName="border-[#9EA5AB]"
              />

              <InputElement
                name="targetUrl"
                label="Target URL"
                isRequired={true}
                placeholder="https://api-example.com"
                messageClassName="text-right"
                inputClassName="border-[#9EA5AB]"
              />

              <SelectElement
                name="authenticationType"
                placeholder="Select Authentication"
                options={authenticationType}
                className="w-full min-h-[56px]"
                label="Authentication Type"
                triggerClassName="border-[#9EA5AB]"
              />

              {authType === "basic_auth" && (
                <>
                  <InputElement
                    name="userName"
                    label="Username"
                    isRequired={true}
                    placeholder="eg. CVS org"
                    messageClassName="text-right"
                    inputClassName="border-[#9EA5AB]"
                  />

                  <PasswordInputElement
                    name="password"
                    label="Password"
                    isRequired={true}
                    messageClassName="text-right"
                    inputClassName="border-[#9EA5AB]"
                  />
                </>
              )}

              {authType === "header_auth" && (
                <TextAreaElement
                  name="header"
                  label="Headers (JSON)"
                  isRequired={true}
                  labelClassName="text-sm font-medium"
                  messageClassName="text-right"
                />
              )}

              <div className="space-y-4 mb-10">
                <p className="text-sm font-semibold">
                  Webhook Types <span className="text-red-600">*</span>
                </p>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="status"
                    className="border-[#9EA5AB]"
                    checked={status}
                    onCheckedChange={() => handleCheckboxChange("status")}
                  />
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status Changed at Pharmacy</Label>
                    <p className="text-muted-foreground text-sm">
                      Triggered when transmission status changes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="tracking"
                    className="border-[#9EA5AB]"
                    checked={tracking}
                    onCheckedChange={() => handleCheckboxChange("tracking")}
                  />
                  <div className="grid gap-2">
                    <Label htmlFor="tracking">Tracking Received</Label>
                    <p className="text-muted-foreground text-sm">
                      Triggered when tracking information is received
                    </p>
                  </div>
                </div>
                {form.formState.errors.root && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.root.message}
                  </p>
                )}
              </div>

              <SelectSubOrganization />

              <p className="text-sm border-l-4 border-primary p-3 bg-white shadow-[0px_2px_40px_0px_#00000014]">
                If No sub-organization is selected. This Webhook will be created
                for{" "}
                <span className="font-medium underline underline-offset-2">
                  {user?.organization?.name}
                </span>
              </p>

              <div className="flex items-center justify-end gap-2.5 mt-10 pb-4 px-4">
                <Button
                  onClick={() => {
                    form.reset();
                    onOpenChange?.(false);
                  }}
                  variant={"transparent"}
                  type="button"
                  // to={"#"}
                  className="rounded-full border border-[#3E4D61] text-center py-2.5 px-6 min-h-12 min-w-32"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  //   disabled={}
                  className="rounded-full text-white cursor-pointer py-2.5 px-6 min-h-12 min-w-32"
                >
                  Create & Send
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
