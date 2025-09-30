import CreateOrganization from "./Organization";
import CreatePharmacy from "./Pharmacy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function CreateOrgPharmacyForm() {
  return (
    <div className="flex flex-col items-center">
      <div className="min-w-[660px] rounded-2xl p-5 ">
        <Tabs defaultValue="Organization" className=" w-full ">
          <TabsList className="w-full grid grid-cols-2 min-h-16 bg-secondary">
            <TabsTrigger value="Organization">Organization</TabsTrigger>
            <TabsTrigger value="Pharmacy">Pharmacy</TabsTrigger>
          </TabsList>
          <div className="mt-2  min-w-[750px] p-10 bg-white shadow-[0px_8px_10px_0px_#00000014] rounded-[16px]">
            <TabsContent value="Organization">
              <CreateOrganization />
            </TabsContent>
            <TabsContent value="Pharmacy">
              <CreatePharmacy />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
