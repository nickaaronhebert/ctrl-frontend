import { Mail, Phone, User } from "lucide-react";

const PersonalDetails = () => {
  return (
    <div className=" bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Personal Details
        </h2>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          EDIT PROFILE
        </button>
      </div>

      <div className="w-full h-px bg-gray-200 mb-4" />

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {/* Name */}
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Name</div>
          <div className="flex items-center">
            <User className="w-5 h-5 text-blue-600 mr-1" />
            <span className="text-gray-900 font-medium">Johan Smith</span>
          </div>
        </div>

        {/* Phone */}
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Phone</div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-blue-600 mr-1" />
            <span className="text-gray-900 font-medium">+1-123-456-7890</span>
          </div>
        </div>

        {/* Email */}
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Email</div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-blue-600 mr-1" />
            <span className="text-gray-900 font-medium">john@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
