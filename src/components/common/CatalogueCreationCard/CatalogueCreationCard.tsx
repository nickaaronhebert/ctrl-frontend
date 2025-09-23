// import MedicationLibrary from "@/assets/icons/MedicationLibrary";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// const CatalogueCreationCard = () => {
//   const navigate = useNavigate();

//   const handleCreateCatalogue = () => {
//     navigate("/pharmacy/medications/configure");
//   };

//   const handleViewCatalogue = () => {
//     navigate("/pharmacy/medications/view-catalogue");
//   };

//   return (
//     <div className="mb-5">
//       <div className="bg-lilac py-3 px-12">
//         <h1 className="font-semibold text-[24px] leading-[30px] text-black">
//           Medication Catalogue
//         </h1>
//         <span className="text-[14px] leading-[18px] text-gray-400 font-normal mt-1">
//           Manage your default pricing catalogue
//         </span>
//       </div>
//       <div
//         className="flex flex-col gap-3 mt-5 items-center justify-center min-h-[423px] h-[423px] bg-white rounded-[15px] "
//         style={{ boxShadow: "0px 2px 40px 0px hsla(0, 0%, 0%, 0.05)" }}
//       >
//         <div className="rounded-full flex items-center justify-center bg-light-background h-[68px] w-[68px]">
//           <MedicationLibrary />
//         </div>
//         <p className="font-semibold text-[18px] leading-[26px] text-black">
//           Setup Medication Catalogue
//         </p>
//         <span className="font-normal text-[14px] max-w-[471px] leading-[18px] text-center text-gray-400">
//           You need to set up your default medication pricing that will serve as
//           the foundation.
//         </span>
//         <div className="flex gap-2 items-center">
//           <Button
//             onClick={handleCreateCatalogue}
//             className="bg-primary min-w-[142px] min-h-[40px] rounded-[50px] cursor-pointer px-[20px] py-[5px] gap-[10px] text-white"
//           >
//             Create Catalogue
//           </Button>
//           <Button
//             onClick={handleViewCatalogue}
//             className="bg-black hover:bg-black min-w-[142px] min-h-[40px] rounded-[50px] cursor-pointer px-[20px] py-[5px] gap-[10px] text-white"
//           >
//             View Catalogue
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CatalogueCreationCard;
