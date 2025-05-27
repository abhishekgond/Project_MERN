import React, { useContext } from "react";
import { Nav } from "../components/Nav";
import CreatePost from "./CreatePost ";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidbar";
import dp from "../assets/dp.webp";
import { FaPlus } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import { userDataContext } from "../context/UserContext";
import { FaPencilAlt } from "react-icons/fa";
import EditProfile from "../components/EditProfile";

function Home() {
  const { userData, seetUserData, edit, setedit } = useContext(userDataContext);
  return (
    <div className="w-full min-h-[100vh] flex bg-[#f0efe7]  justify-center items-center gap-[20px]">
      {edit && <EditProfile />}
      <Nav />
      {/* <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-4 px-4">
        //{/* Left Sidebar */}
      {/* <div className="w-full md:w-1/2 lg:w-1/4">
          <LeftSidebar />
        </div> */}
      {/* Create Post */}
      {/* <div className="w-full md:w-1/2 lg:w-1/2">
          <CreatePost />
        </div> */}
      {/* Right Sidebar: On medium it wraps below, on large it stays in row }
        <div className="w-full md:w-full lg:w-1/4">
          <RightSidebar />
        </div>
      </div> */}
      <div className="w-full min-h-[100vh] flex bg-[#f0efe7]  justify-center items-start lg:pt-[100px] gap-[20px] flex-col lg:flex-row px-[54px] sm:mt-[56px] md:mt-[10px]">
        <div className="w-full lg:w-[25%] min-h-[400px] bg-white shadow-lg">
          {/* Banner */}
          <div
            className="w-full h-[100px] bg-gray-300 rounded overflow-hidden flex items-center justify-center p-[10px]  cursor-pointer"
            onClick={() => {
              setedit(true);
            }}
          >
            <img src="" alt="" className="w-full" />

            {/* Camera icon in top-right */}
            <TbCameraPlus className=" relative top-[-30px] right-1 text-white text-lg cursor-pointer size-6" />
          </div>

          {/* Profile image container */}
          <div
            className="w-[70px] h-[70px] rounded-full justify-center items-center overflow-hidden cursor-pointer relative top-[-40px] left-[30%]"
            onClick={() => {
              setedit(true);
            }}
          >
            <img src={dp} alt="Profile" className="h-full" />

            {/* FaPlus icon inside profile image at bottom-right */}
            <div className="absolute bottom-2 right-1 bg-white p-[4px] rounded-full shadow-lg cursor-pointer bg-blue-500 ">
              <FaPlus className=" text-xs text-white" />
            </div>
          </div>
          <div className="border p-4 rounded-md bg-white shadow-sm">
            {userData ? (
              <h2 className="text-center font-semibold text-lg text-gray-800 leading-tight">
                {userData.firstName} {userData.lastName}
              </h2>
            ) : (
              <h2 className="text-center font-semibold text-lg text-gray-800 leading-tight">
                Loding...
              </h2>
            )}
            {userData ? (
              <p className="text-sm text-center text-gray-600 leading-snug mt-2 px-2">
                {`${userData.introduction} || ${userData.skills}`}
                {/* {`${userData.headline}`} */}
              </p>
            ) : (
              <p className="text-sm text-center text-gray-600 leading-snug mt-2 px-2">
                Loading...
              </p>
            )}

            {userData ? (
              <p className="text-xs text-gray-500 text-center mt-2">
                {userData.location}
              </p>
            ) : (
              <p className="text-xs text-gray-500 text-center mt-2"></p>
            )}
            {userData ? (
              <p className="text-sm text-center font-medium mt-2 text-blue-700">
                {userData.institute}
              </p>
            ) : (
              <p className="text-sm text-center font-medium mt-2 text-blue-700"></p>
            )}
          </div>
          <div
            className="flex items-center justify-center"
            onClick={() => {
              setedit(true);
            }}
          >
            <button className="w-[70%] h-[40px] rounded-full border-2 border-[#2dc0ff] mt-[20px] text-[#2dc0ff] items-center justify-center flex ">
              Edit Profile
              <FaPencilAlt className="ml-[10px]" />
            </button>
          </div>
          {/* Taking Input From The user */}
        </div>
        <div className="w-full lg:w-[50%] min-h-[200px] bg-[white]  shadow-lg rounded p-[10px]"></div>
        <div className="w-full lg:w-[25%] min-h-[200px] bg-white shadow-lg rounded p-[10px] block md:hidden lg:block">
          {/* Content here */}
        </div>
      </div>
    </div>
  );
}

export default Home;
