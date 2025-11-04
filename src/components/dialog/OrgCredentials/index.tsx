import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  basicAuthenticationSchema,
  // basicTokenAuthenticationSchema,
} from "@/schemas/createOrganizationCredentialSchema";
import InputElement from "@/components/Form/input-element";
import TextAreaElement from "@/components/Form/textarea-elements";

interface CreateCredentialDialogProps {
  //   id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  setCurrentStep: (step: number) => void;
  setOpenConnection: (open: boolean) => void;
  //   email: string;
  //   phoneNumber: string;
  //   invitationId: string;
}

interface AuthenticationProps {
  setOpen: (open: boolean) => void;
  setCurrentStep: (step: number) => void;
  setOpenConnection: (open: boolean) => void;
}

export default function CreateOrganizationCredentialsDialog({
  open,
  setOpen,
  name,
  setCurrentStep,
  setOpenConnection,
}: CreateCredentialDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" max-w-96 ">
        <DialogTitle className="pt-4 pb-2 px-5 border-b  ">
          Create Organization Credentials
        </DialogTitle>

        <DialogDescription className="text-sm text-[#3E4D61] font-normal px-5">
          Create credentials for <span className="font-semibold">{name}</span>{" "}
          to access your pharmacy system.
        </DialogDescription>

        <div className="px-5">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Authentication Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="basicAuthentication">
                  Basic Authentication
                </SelectItem>
                <SelectItem value="tokenAuthentication">
                  Token Authentication
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <BasicAuthentication
          setOpen={setOpen}
          setCurrentStep={setCurrentStep}
          setOpenConnection={setOpenConnection}
        />

        {/* <DialogFooter className="p-5">
          <Button
            variant={"transparent"}
            size={"lg"}
            onClick={() => {
              setCurrentStep(1);
              setOpenConnection(true);
              setOpen(false);
            }}
            // onClick={handleRejectInvitation}
            className="min-w-40 text-[#E31010] border-[#E31010] bg-white rounded-[18px]"
          >
            Back
          </Button>
          <Button
            variant={"ctrl"}
            size={"lg"}
            className="min-w-40 bg-[#21BB72] text-white rounded-[18px]"
            // onClick={handleSendInvite}
            // onClick={handleAcceptInvitation}
          >
            {" "}
            Confirm & Accept
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

function BasicAuthentication({
  setCurrentStep,
  setOpen,
  setOpenConnection,
}: AuthenticationProps) {
  const form = useForm<z.infer<typeof basicAuthenticationSchema>>({
    mode: "onChange",
    resolver: zodResolver(basicAuthenticationSchema),
    defaultValues: {
      baseApiUrl: "",
      username: "",
      password: "",
      headers: "",
    },
  });

  async function onSubmit(data: z.infer<typeof basicAuthenticationSchema>) {
    console.log("data", data);
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col  p-5 items-center"
        >
          <InputElement
            name="baseApiUrl"
            className="w-full"
            label="API Base URL"
            isRequired={true}
            messageClassName="text-right"
            placeholder="Eg. https://host27a.lifefile.net:10165/lfapi/v1%27"
            inputClassName="border border-[#9EA5AB]"
          />

          <InputElement
            name="username"
            className="w-full"
            label="Username"
            isRequired={true}
            messageClassName="text-right"
            placeholder="Enter username"
            inputClassName="border border-[#9EA5AB]"
          />

          <InputElement
            name="password"
            className="w-full"
            label="Password"
            isRequired={true}
            messageClassName="text-right"
            placeholder="Enter password"
            inputClassName="border border-[#9EA5AB]"
          />

          <TextAreaElement
            placeholder={`{"Authorization": "Bearer token", "X-Custom-Header": "value"}`}
            name="headers"
            isRequired={false}
            label="Headers (JSON)"
            className="w-full "
            inputClassName="border border-[#9EA5AB] "
          />

          <div className="flex justify-end  w-full gap-2.5">
            <Button
              variant={"transparent"}
              size={"lg"}
              type="button"
              onClick={() => {
                setCurrentStep(1);
                setOpenConnection(true);
                setOpen(false);
              }}
              // onClick={handleRejectInvitation}
              className="min-w-40 text-[#E31010] border-[#E31010] bg-white rounded-[18px]"
            >
              Back
            </Button>
            <Button
              variant={"ctrl"}
              size={"lg"}
              type="submit"
              className="min-w-40 bg-[#21BB72] text-white rounded-[18px]"
              // onClick={handleSendInvite}
              // onClick={handleAcceptInvitation}
            >
              {" "}
              Confirm & Accept
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// function TokenAuthentication({
//   setCurrentStep,
//   setOpen,
//   setOpenConnection,
// }: AuthenticationProps) {
//   const form = useForm<z.infer<typeof basicTokenAuthenticationSchema>>({
//     mode: "onChange",
//     resolver: zodResolver(basicTokenAuthenticationSchema),
//     defaultValues: {
//       accessToken: "",
//       headers: "",
//     },
//   });

//   async function onSubmit(
//     data: z.infer<typeof basicTokenAuthenticationSchema>
//   ) {
//     console.log("data", data);
//   }

//   return (
//     <div className="">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="flex flex-col  p-5 items-center"
//         >
//           <InputElement
//             name="accessToken"
//             className="w-full"
//             label="Access Token"
//             isRequired={true}
//             messageClassName="text-right"
//             placeholder="Eg. https://host27a.lifefile.net:10165/lfapi/v1%27"
//             inputClassName="border border-[#9EA5AB]"
//           />

//           <TextAreaElement
//             placeholder={`{"Authorization": "Bearer token", "X-Custom-Header": "value"}`}
//             name="headers"
//             isRequired={false}
//             label="Headers (JSON)"
//             className="w-full "
//             inputClassName="border border-[#9EA5AB] "
//           />

//           <div className="flex justify-end  w-full gap-2.5">
//             <Button
//               variant={"transparent"}
//               size={"lg"}
//               type="button"
//               onClick={() => {
//                 setCurrentStep(1);
//                 setOpenConnection(true);
//                 setOpen(false);
//               }}
//               // onClick={handleRejectInvitation}
//               className="min-w-40 text-[#E31010] border-[#E31010] bg-white rounded-[18px]"
//             >
//               Back
//             </Button>
//             <Button
//               variant={"ctrl"}
//               size={"lg"}
//               type="submit"
//               className="min-w-40 bg-[#21BB72] text-white rounded-[18px]"
//               // onClick={handleSendInvite}
//               // onClick={handleAcceptInvitation}
//             >
//               {" "}
//               Confirm & Accept
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }
