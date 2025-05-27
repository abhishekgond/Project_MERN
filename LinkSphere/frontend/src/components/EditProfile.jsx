import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import { userDataContext } from "../context/UserContext";
import dp from "../assets/dp.webp";

function EditProfile() {
  const { edit, setedit, userData, setUserData } = useContext(userDataContext);
  const [firstName, setfirstName] = useState(userData.firstName || "");
  const [lastName, setlastName] = useState(userData.lastName || "");
  const [userName, setuserName] = useState(userData.userName || "");
  const [headline, setheadline] = useState(userData.headline || "");
  const [location, setlocation] = useState(userData.location || "");
  const [gender, setgender] = useState(userData.gender || "");
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkills, setnewSkills] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkills.trim() && !skills.includes(newSkills.trim())) {
      setSkills([...skills, newSkills.trim()]);
      setnewSkills("");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4 ">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl p-6">
        <ImCross
          className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-red-600 transition text-2xl"
          onClick={() => setedit(false)}
        />

        {/* Cover Image */}
        <div className="relative h-36 w-full rounded-lg bg-gradient-to-r from-blue-400 to-purple-600 shadow-md overflow-hidden mt-[34px]">
          <img src="" alt="" className="h-full w-full object-cover" />
          <TbCameraPlus className="absolute top-4 right-4 cursor-pointer text-white text-3xl drop-shadow-lg" />
        </div>

        {/* Profile Picture */}
        <div
          onClick={() => setedit(true)}
          className="absolute left-6 top-28 flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-md"
        >
          <img src={dp} alt="Profile" className="h-full w-full object-cover" />
          <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 shadow-lg">
            <FaPlus className="text-xs text-white" />
          </div>
        </div>

        <form className="mt-16 flex flex-col gap-4 px-2">
          <input
            type="text"
            placeholder="First Name"
            className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Headline"
            className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={headline}
            onChange={(e) => setheadline(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={location}
            onChange={(e) => setlocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Gender"
            className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={gender}
            onChange={(e) => setgender(e.target.value)}
          />

          {/* Skills Section */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold text-gray-800">Skills</h2>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 shadow"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <form onSubmit={handleAddSkill} className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Add new skill"
                value={newSkills}
                onChange={(e) => setnewSkills(e.target.value)}
                className="flex-grow rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </form>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
