import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";
export const userDataContext = createContext(null);
function UserContext({ children }) {
  const [userData, setUserData] = useState();
  const { serverUrl } = useContext(AuthDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/currentuser", {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (error) {
      setUserData(null);
      // console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  });
  const value = { userData, setUserData };
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
