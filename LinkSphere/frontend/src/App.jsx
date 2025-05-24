import React from "react";
import { Signup } from "./pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { useContext } from "react";
import { userDataContext } from "./context/UserContext";

function App() {
  const userData  = useContext(userDataContext);
  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={userData ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={userData ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
  );
}

export default App;
