import React from "react";
import { FaVideo, FaImage } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import dp from "../assets/dp.webp";
const CreatePost = () => {
  return (
    <div className="w-full h-[140px] mx-auto p-3 bg-white rounded-xl shadow border lg:w-[50%] max-h-[500px]  bg-[#f0efe7] shadow-lg rounded p-4 overflow-auto">
      {/* Top: Profile + Input */}
      <div className="flex items-center gap-3">
        <img
          src={dp}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />

        <button className="flex-1 text-left bg-gray-100 text-gray-600 px-4 py-2 rounded-full hover:bg-[#f0efe7] transition bg-transparent border">
          Start a post
        </button>
      </div>

      {/* Bottom: Action Buttons */}
      <div className="flex justify-around mt-8 text-sm text-gray-600">
        <button className="flex items-center gap-1 hover:text-blue-600">
          <FaVideo className="text-green-600" size={18} />
          <span>Video</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600">
          <FaImage className="text-blue-500" size={18} />
          <span>Photo</span>
        </button>
        <button className="flex items-center gap-1 hover:text-blue-600">
          <MdArticle className="text-orange-500" size={18} />
          <span>Write article</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
