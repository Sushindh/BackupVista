// src/shared/hooks/useAuth.jsx
import React, { useState, useEffect, createContext, useContext } from "react";
import api from "../../services/api";
import { checkDemoLogin, DEMO_USERS } from "../data/dummyData";

// Enable demo mode - set to true to use hardcoded dummy data
const DEMO_MODE = true;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (check token in localStorage)
    const token = localStorage.getItem("authToken");
    if (token) {
      if (DEMO_MODE && token.startsWith("demo-")) {
        // Restore demo user from localStorage
        const storedUser = localStorage.getItem("demoUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      } else {
        verifyToken();
      }
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await api.get("/auth/profile");
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("demoUser");
      }
    } catch (err) {
      console.error("Token verification failed:", err);
      localStorage.removeItem("authToken");
      localStorage.removeItem("demoUser");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    // Check for demo mode login first
    if (DEMO_MODE) {
      const demoResult = checkDemoLogin(credentials.email, credentials.password);
      if (demoResult.success) {
        localStorage.setItem("authToken", demoResult.token);
        localStorage.setItem("demoUser", JSON.stringify(demoResult.user));
        setUser(demoResult.user);
        return { user: demoResult.user, token: demoResult.token };
      }
    }

    // Fall back to API login
    try {
      const response = await api.post("/auth/login", {
        emailId: credentials.email,
        password: credentials.password,
      });

      if (response.data.success) {
        const { token, data } = response.data;
        localStorage.setItem("authToken", token);
        setUser(data);
        return { user: data, token };
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!DEMO_MODE || !token?.startsWith("demo-")) {
        await api.post("/auth/logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("demoUser");
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isDemoMode: DEMO_MODE,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
