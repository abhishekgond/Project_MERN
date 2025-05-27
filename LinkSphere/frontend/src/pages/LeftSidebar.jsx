import { BsBookmarkFill } from "react-icons/bs";
import { FaUsers, FaRegNewspaper } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import dp from "../assets/dp.webp";
const LeftSidebar = () => {
  return (
    <div className="w-[317px] rounded-xl mt-[80px] overflow-hidden ml-[40px] shadow-sm border bg-white">
      {/* Top Card */}
      <div>
        {/* Cover Image */}
        <div className="bg-yellow-400 h-[60px] w-full"></div>

        {/* Profile Image & Info */}
        <div className="flex flex-col items-center p-3 -mt-10">
          <img
            src={dp}
            alt="Profile"
            className="w-[72px] h-[72px] rounded-full border-2 border-white object-cover"
          />
          <h2 className="text-center font-semibold mt-2 leading-tight">
            Abhishek Kumar ...
          </h2>
          <p className="text-sm text-center text-gray-500 leading-snug mt-1">
            MCA'26 from MNNIT-A || Student at Motilal Nehru National
            Institute...
          </p>
          <p className="text-xs text-gray-500 mt-1">India</p>
          <p className="text-sm text-center font-medium mt-1 text-blue-700">
            Motilal Nehru National Institute Of Technology
          </p>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="border-t px-4 py-2 text-sm text-gray-700">
        <div className="flex justify-between py-1 hover:underline cursor-pointer">
          <span>Profile viewers</span>
          <span className="text-blue-600 font-medium">8</span>
        </div>
        <div className="flex justify-between py-1 hover:underline cursor-pointer">
          <span>Post impressions</span>
          <span className="text-blue-600 font-medium">3</span>
        </div>
      </div>

      {/* Premium Prompt */}
      <div className="border-t px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
        <p className="mb-1">Get 4x more profile views with Premium</p>
        <span className="font-semibold text-yellow-600">🔶 Try for ₹0</span>
      </div>

      {/* Bottom Links */}
      <div className="border-t px-4 py-3 text-sm text-gray-800 space-y-3">
        <div className="flex items-center gap-2 hover:underline cursor-pointer">
          <BsBookmarkFill />
          <span>Saved items</span>
        </div>
        <div className="flex items-center gap-2 hover:underline cursor-pointer">
          <FaUsers />
          <span>Groups</span>
        </div>
        <div className="flex items-center gap-2 hover:underline cursor-pointer">
          <FaRegNewspaper />
          <span>Newsletters</span>
        </div>
        <div className="flex items-center gap-2 hover:underline cursor-pointer">
          <MdEvent />
          <span>Events</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
