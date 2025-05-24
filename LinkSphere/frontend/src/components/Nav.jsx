import React from "react";
import { FaHome, FaUserFriends, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/linkSphere_logo.png"; // Replace with your logo file
import profilePic from "../assets/profile.jpg"; // Replace with user's profile image
import { IoSearchSharp } from "react-icons/io5";

export const Nav = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-2 shadow-lg bg-white w-full h-[52px] fixed top-0 ">
      {/* Left Section - Logo & Search */}
      <div className="flex items-center space-x-4 ml-[200px]">
        <img src={logo} alt="LinkedIn" className="w-8 h-8" />
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-black w-full transition-all duration-300 ease-in-out focus:w-[20rem]"
          />
          <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
        </div>
      </div>

      {/* Right Section - Icons */}
      <div className="flex items-center space-x-6 text-gray-700 mr-[200px]">
        <Link
          to="/"
          className="flex flex-col items-center text-sm hover:text-blue-600"
        >
          <FaHome size={20} />
          <span>Home</span>
        </Link>

        <Link
          to="/network"
          className="flex flex-col items-center text-sm hover:text-blue-600"
        >
          <FaUserFriends size={20} />
          <span>My Network</span>
        </Link>

        <Link
          to="/notifications"
          className="flex flex-col items-center text-sm hover:text-blue-600"
        >
          <FaBell size={20} />
          <span>Notification</span>
        </Link>

        <img
          src={profilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover border border-gray-300"
        />
      </div>
    </nav>
  );
};
