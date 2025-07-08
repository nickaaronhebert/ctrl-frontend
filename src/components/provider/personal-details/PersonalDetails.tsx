import { Mail, Phone, User } from "lucide-react";

const PersonalDetails = ({ onEditProfile }: any) => {
  return (
    <div className=" bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h2 className="font-semibold text-[20px] leading-[24px] text-black">
          Personal Details
        </h2>
        <button
          onClick={onEditProfile}
          className="min-w-[80px] min-h-[32px] rounded-[4px] border-1 px-[10px] py-[5px] cursor-pointer"
        >
          EDIT PROFILE
        </button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-4" />

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <div className="font-normal text-[14px] leading-[18px] text-black">
            Name
          </div>
          <div className="flex items-center">
            <User className="w-5 h-5 text-primary mr-1" />
            <span className="text-secondary-foreground font-medium text-[18px] leading-[26px]">
              Johan Smith
            </span>
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <div className="font-normal text-[14px] leading-[18px] text-black">
            Phone
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-primary mr-1" />
            <span className="text-secondary-foreground font-medium text-[18px] leading-[26px]">
              +1-123-456-7890
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <div className="font-normal text-[14px] leading-[18px] text-black">
            Email
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-primary mr-1" />
            <span className="text-secondary-foreground font-medium text-[18px] leading-[26px]">
              john@example.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
