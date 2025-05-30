import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import logo from "../assets/linkSphere_logo.png";
import { FaHome } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import dp from "../assets/dp.webp";
import { userDataContext } from "../context/UserContext";
import { useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Nav = () => {
  const [activeSearch, setActiveSearch] = useState(false);
  const { userData, setUserData } = useContext(userDataContext);
  const [showPopup, setShowPopup] = useState(false);
  let navigate = useNavigate();
  const serverUrl = useContext(AuthDataContext);
  const handleSignOut = async () => {
    try {
      let result = await axios.get(serverUrl + "api/auth/logout", {
        withCredentials: true,
      });

      navigate("/login");
      setUserData(null);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex  md:justify-around justify-between items-center px-4 py-2 shadow-lg bg-white w-full h-[52px] fixed top-0 z-50 p-[10px]">
      {/* Container to wrap everything and center content */}
      <div className="flex justify-between items-center w-full max-w-[1200px] px-4">
        {/* Left Section - Logo & Search */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div
            onClick={() => {
              setActiveSearch(false);
            }}
          >
            <img src={logo} alt="LinkedIn" className="w-8 h-8" />
          </div>
          {/* Search Icon - Always visible */}
          <div>
            {!activeSearch && (
              <IoSearchSharp
                className="w-[23px] h-[23px] text-gray-600 cursor-pointer lg:hidden"
                onClick={() => setActiveSearch(true)}
              />
            )}
          </div>

          {/* Search Form - Visible only on large screens */}
          <form
            className={`relative ${
              !activeSearch ? "hidden" : "flex"
            } lg:flex items-center transition-all duration-300 ease-in-out md:w-[350px] lg:w-[350px] lg:focus-within:w-[500px] h-[40px] bg-[#f0efe7] rounded-md`}
          >
            <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] text-gray-600" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none lg:focus:ring-2 focus:ring-black w-full bg-[#f0efe7]"
            />
          </form>
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center space-x-6 relative">
          {/* Home - Hidden on medium and smaller screens */}
          {/* Popup Div  */}
          {showPopup && (
            <div className="w-[300px] h-[320px] bg-white  flex flex-col items-center shadow-lg absolute top-[52px] right-[25px] rounded-lg">
              <div className="w-10 h-10 rounded-full justify-center mt-[20px] overflow-hidden cursor-pointer ">
                <img
                  src={dp}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* heare Are issues in this code it can not fetch user first and last name  */}
              {userData ? (
                <div className="text-md font-medium">
                  {userData.firstName} {userData.lastName}
                </div>
              ) : (
                <div className="text-md text-gray-500">Loading...</div>
              )}

              <button className="w-[70%] h-[40px] rounded-full border-2 border-[#2dc0ff] mt-[40px] text-[#2dc0ff]">
                View Profile
              </button>
              <div className="w-full mt-[20px] h-[1px] bg-gray-400 "></div>
              <div className="flex mt-[23px] items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
                <FaUserGroup className="text-2xl mr-[15px] hidden sm:block" />
                <div className="text-lg hidden sm:block">My Network</div>
              </div>
              <div className="w-full mt-[20px] h-[1px] bg-gray-400 "></div>
              <button
                className="w-[70%] h-[40px] rounded-full border-2 border-[#da3838] mt-[15px] text-[#da3838]"
                onClick={handleSignOut}
              >
                SignOut
              </button>
            </div>
          )}
          <div className="hidden md:flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaHome className="text-2xl" />
            <div className="text-sm">Home</div>
          </div>

          {/* Network - Show icon always, text hidden on small */}
          <div className="flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
            <FaUserGroup className="text-2xl hidden sm:block" />
            <div className="text-sm hidden sm:block">Network</div>
          </div>

          {/* Notifications - Show icon always, text hidden on small */}
          <div className="flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer">
            <IoNotifications className="text-2xl" />
            <div className="text-sm hidden sm:block">Notifications</div>
          </div>

          {/* Profile Picture */}
          <div
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            onClick={() => {
              setShowPopup((previous) => !previous);
            }}
          >
            <img
              src={dp}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
