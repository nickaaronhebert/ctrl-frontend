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

import InputElement from "@/components/Form/input-element";
import PasswordInputElement from "@/components/Form/password-element";
import SelectElement from "@/components/Form/select-element";
import { useState } from "react";
import TextAreaElement from "@/components/Form/textarea-elements";
import {
  useDeleteWebhookMutation,
  useEditWebhookMutation,
} from "@/redux/services/webhook";
import type { Auth } from "@/types/requests/ICreateWebhook";
import { toast } from "sonner";
import { editWebhookSchema } from "@/schemas/createWebhook";
import type { WebhookDetails } from "@/types/responses/IGetAllWebhook";
import { useNavigate } from "react-router-dom";

interface CreateWebhookProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  values?: WebhookDetails;
  id: string;
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

export function EditWebhook({
  open,
  onOpenChange,
  values,
  id,
}: CreateWebhookProps) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(
    values?.eventTypes?.indexOf("status_update") !== -1 ? true : false
  );
  const [tracking, setTracking] = useState(
    values?.eventTypes?.indexOf("tracking_received") !== -1 ? true : false
  );
  const [editWebhook] = useEditWebhookMutation();
  const [deleteWebhook] = useDeleteWebhookMutation();

  const form = useForm<z.infer<typeof editWebhookSchema>>({
    mode: "onTouched",
    resolver: zodResolver(editWebhookSchema),
    defaultValues: {
      name: values?.name || "",
      targetUrl: values?.targetUrl || "",
      userName: values?.authConfig?.username || "",
      password: values?.authConfig?.password || "",
      header:
        values?.authType === "header_auth"
          ? JSON.stringify(values?.authConfig)
          : "",
      //   subOrganization: values?.targetOrganization || "",
      authenticationType: values?.authType || "",
    },
  });

  const { setError, clearErrors } = form;

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

  const authType = form.watch("authenticationType");

  async function onSubmit(values: z.infer<typeof editWebhookSchema>) {
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
            ...parsedHeaders,
          }
        : {
            username: values.userName,
            password: values.password,
          };

    await editWebhook({
      name: values.name,
      targetUrl: values.targetUrl,
      targetOrganization: values.subOrganization,
      authType: values.authenticationType,
      authConfig: auth,
      eventTypes: eventTypes,
      id: id,
    })
      .unwrap()
      .then((data) => {
        toast.success(data?.message || "Webhook  Edited Successfully");

        onOpenChange?.(false);
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong");
      });
  }

  async function handleDelete() {
    await deleteWebhook(id)
      .unwrap()
      .then((data) => {
        toast.error(data?.message || "Webhook Deleted Successfully");
        onOpenChange?.(false);
        navigate("/org/webhook");
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"ctrl"} size={"lg"} className="rounded-[12px]">
          Modify Webhook
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl ">
        <DialogHeader className="flex-col border-b border-[#D9D9D9] px-5 py-1.5">
          <DialogTitle className="text-lg font-semibold p-2">
            Modify Webhook
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

              <div className="flex items-center justify-end gap-2.5 mt-5 pb-4 px-4 mb-4">
                <Button
                  onClick={() => {
                    form.reset();
                    onOpenChange?.(false);
                  }}
                  variant={"transparent"}
                  type="button"
                  className="rounded-full border border-[#3E4D61] text-center py-2.5 px-6 min-h-12 min-w-32"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleDelete}
                  variant={"transparent"}
                  type="button"
                  className="rounded-full border border-[#E31010] text-center text-[#E31010] py-2.5 px-6 min-h-12 min-w-32"
                >
                  Delete
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
