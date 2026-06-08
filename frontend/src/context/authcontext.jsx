import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister, getProfile as apiGetProfile } from "../services/authservice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const profile = await apiGetProfile(token);
          setUser(profile);
        } catch (err) {
          console.error("Token verification failed, logging out:", err);
          logoutUser();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiLogin(credentials);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRegister(userData);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        error,
        loginUser,
        registerUser,
        logoutUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
