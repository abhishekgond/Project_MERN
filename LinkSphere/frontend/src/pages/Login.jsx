import React, { useContext, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";

export const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);

  const [email, setemail] = useState(""); // Username or Email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    navigate("/");
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res);
      setMessage(res.data.message || "Login successful");
      setLoading(false);
      setemail("");
      setPassword("");
      // Optional: Save token
      // localStorage.setItem("token", res.data.token);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center relative px-4">
      {/* Logo at Top Left */}
      <div className="absolute top-4 left-4 w-36">
        <img src={logo} alt="Logo" className="w-full" />
      </div>

      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Welcome Back
        </h2>

        {message && (
          <div className="text-green-600 mb-4 text-center">{message}</div>
        )}
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="email"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-4 text-lg border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
            className="w-full bg-blue-600 text-white py-3 text-lg rounded-2xl font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p
          className="text-center cursor-pointer text-sm mt-6 text-gray-600"
          onClick={() => navigate("/signup")}
        >
          Don’t have an account? <span className="text-blue-700">Sign up</span>
        </p>
      </div>
    </div>
  );
};
