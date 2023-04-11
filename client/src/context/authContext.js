import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrUser(res.data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currUser));
  }, [currUser]);

  return (
    <AuthContext.Provider value={{ currUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
