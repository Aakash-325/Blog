/* eslint-disable */
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth")) || {};
  const [user, setUser] = useState(auth ? auth.user?._id : null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    window.location.href = "/auth";
  };

  const AuthData = {
    user: user,
    setUser: setUser,
    userInfo: auth.user,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={AuthData}>{children}</AuthContext.Provider>
  );
};
