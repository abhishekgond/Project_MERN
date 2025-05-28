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

  // Skill added
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkills, setnewSkills] = useState("");
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkills.trim() && !skills.includes(newSkills.trim())) {
      setSkills([...skills, newSkills.trim()]);
      setnewSkills("");
    }
  };
  const handleSkillRemove = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };
  // Education added
  const [education, setEducation] = useState(userData.education || []);
  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: "",
    description: "",
  });
  const handleAddEducation = (e) => {
    e.preventDefault(e);
    if (
      newEducation.school &&
      newEducation.degree &&
      newEducation.fieldOfStudy &&
      newEducation.from
    ) {
      setEducation([...education, { ...newEducation }]);
      setNewEducation({
        school: "",
        degree: "",
        fieldOfStudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
      });
    }
  };

  const handleEducationRemove = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  // Experiance
  const [experience, setExperience] = useState(userData.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const handleAddExperience = (e) => {
    e.preventDefault(e);
    if (newExperience.title && newExperience.company && newExperience.from) {
      setExperience([...experience, newExperience]);
      setNewExperience({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
      });
    }
  };

  const handleExperienceRemove = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewExperience((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setNewEducation({
      ...newEducation,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4  ">
      <div className="relative   max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl p-6 ">
        <ImCross
          className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-red-600 transition text-2xl"
          onClick={() => setedit(false)}
        />

        {/* Cover Image */}
        <div className="relative h-36 w-full rounded-lg bg-gradient-to-r from-blue-400 to-purple-600 shadow-md overflow-hidden mt-[34px] ">
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
                  <div
                    key={i}
                    className="relative inline-flex items-center rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 shadow pr-8"
                  >
                    {skill}
                    <ImCross
                      className="absolute -top-0 -right-[-2px] bg-white rounded-full p-[2px] cursor-pointer text-gray-500 hover:text-red-600 shadow-sm transition"
                      onClick={() => handleSkillRemove(i)} // define this handler
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Add new skill"
                value={newSkills}
                onChange={(e) => setnewSkills(e.target.value)}
                className="flex-grow rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 "
              />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleAddSkill}
              >
                Add
              </button>
            </div>
          </div>

          {/* Education  */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Education
              </h2>

              {education.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-6">
                  {education.map((edu, i) => (
                    <div
                      key={i}
                      className="relative bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <div className="text-sm text-gray-700 space-y-1">
                        <div>
                          <span className="font-semibold">College:</span>{" "}
                          {edu.school}
                        </div>
                        <div>
                          <span className="font-semibold">Degree:</span>{" "}
                          {edu.degree}
                        </div>
                        <div>
                          <span className="font-semibold">Field of Study:</span>{" "}
                          {edu.fieldOfStudy}
                        </div>
                        <div>
                          <span className="font-semibold">From:</span>{" "}
                          {edu.from}
                        </div>
                        <div>
                          <span className="font-semibold">To:</span>{" "}
                          {edu.to || "Present"}
                        </div>
                        <div>
                          <span className="font-semibold">Current:</span>{" "}
                          {edu.current ? "Yes" : "No"}
                        </div>
                        <div>
                          <span className="font-semibold">Description:</span>{" "}
                          {edu.description || "N/A"}
                        </div>
                      </div>
                      <ImCross
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 cursor-pointer transition-colors duration-200"
                        onClick={() => handleEducationRemove(i)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-inner border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={newEducation.school}
                    onChange={handleInputChange}
                    placeholder="Enter school name"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={newEducation.degree}
                    onChange={handleInputChange}
                    placeholder="Enter degree"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    name="fieldOfStudy"
                    value={newEducation.fieldOfStudy}
                    onChange={handleInputChange}
                    placeholder="Enter field of study"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    name="from"
                    value={newEducation.from}
                    onChange={handleInputChange}
                    placeholder="YYYY-MM"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    name="to"
                    value={newEducation.to}
                    onChange={handleInputChange}
                    placeholder="YYYY-MM or leave blank if current"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                  />
                </div>
                <div className="flex items-center">
                  <label className="block text-sm font-medium text-gray-700 mr-3">
                    Currently Studying
                  </label>
                  <input
                    type="checkbox"
                    name="current"
                    checked={newEducation.current}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newEducation.description}
                    onChange={handleInputChange}
                    placeholder="Describe your education experience"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                    rows="4"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    onClick={handleAddEducation}
                    className="rounded-md bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                  >
                    Add Education
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Exprience  */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Experience
              </h2>

              {experience.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-6">
                  {experience.map((exp, i) => (
                    <div
                      key={i}
                      className="relative bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <div className="text-sm text-gray-700 space-y-1">
                        <div>
                          <span className="font-semibold">Title:</span>{" "}
                          {exp.title}
                        </div>
                        <div>
                          <span className="font-semibold">Company:</span>{" "}
                          {exp.company}
                        </div>
                        <div>
                          <span className="font-semibold">Location:</span>{" "}
                          {exp.location || "N/A"}
                        </div>
                        <div>
                          <span className="font-semibold">From:</span>{" "}
                          {exp.from}
                        </div>
                        <div>
                          <span className="font-semibold">To:</span>{" "}
                          {exp.to || "Present"}
                        </div>
                        <div>
                          <span className="font-semibold">Current:</span>{" "}
                          {exp.current ? "Yes" : "No"}
                        </div>
                        <div>
                          <span className="font-semibold">Description:</span>{" "}
                          {exp.description || "N/A"}
                        </div>
                      </div>
                      <ImCross
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 cursor-pointer transition-colors duration-200"
                        onClick={() => handleExperienceRemove(i)}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-inner border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newExperience.title}
                    onChange={handleInputChange}
                    placeholder="Enter job title"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={newExperience.company}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newExperience.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    name="from"
                    value={newExperience.from}
                    onChange={handleInputChange}
                    placeholder="YYYY-MM"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    name="to"
                    value={newExperience.to}
                    onChange={handleInputChange}
                    placeholder="YYYY-MM or leave blank if current"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                  />
                </div>
                <div className="flex items-center">
                  <label className="block text-sm font-medium text-gray-700 mr-3">
                    Currently Working
                  </label>
                  <input
                    type="checkbox"
                    name="current"
                    checked={newExperience.current}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newExperience.description}
                    onChange={handleInputChange}
                    placeholder="Describe your work experience"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
                    rows="4"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    onClick={handleAddExperience}
                    className="rounded-md bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                  >
                    Add Experience
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
