import React, { useContext, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
export const Signup = () => {
  const [show, setShow] = useState(false); // your show state for toggling password visibility
  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext); // to Accesing context api
  const { userData, setUserData } = useContext(userDataContext);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Without page referance
    setLoding(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          FirstName,
          LastName,
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      setUserData(res.data.user);
      navigate("/");
      console.log(res);
      setMessage(res.data.message || "Signup successful!");
      setLoding(false);
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setLoding(false);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center relative px-4">
      {/* Logo at Top Left */}
      <div className="absolute top-4 left-4 w-40">
        <img src={logo} alt="Logo" className="w-full" />
      </div>

      {/* Signup Form */}
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Join LinkSphere
        </h2>

        {message && (
          <div className="text-green-600 mb-4 text-center">{message}</div>
        )}
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password input with show/hide button */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 "
              required
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-blue-600"
              tabIndex={-1}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 text-lg rounded-2xl font-semibold hover:bg-blue-700 transition "
            disabled={loading}
          >
            {loading ? "loading.." : "Sign Up"}
          </button>
        </form>

        <p
          className="text-center cursor-pointer "
          onClick={() => navigate("/login")}
        >
          Already have an account?{"  "}
          <span className="text-blue-700">Sign In</span>
        </p>
      </div>
    </div>
  );
};
