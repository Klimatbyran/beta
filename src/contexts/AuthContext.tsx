import { authenticateWithGithub } from "@/lib/api";
import { Token } from "@/types/token";
import { jwtDecode } from "jwt-decode";
import { nanoid } from "nanoid";
import React, { useContext, createContext, useState } from "react";

export interface AuthContext {
  token: string;
  login: (code: string, state: string) => Promise<boolean>;
  logout: () => void;
  isAuthentificated: () => boolean;
  getAuthUrl: () => string;
  parseToken: () => Token | null;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = async (code: string, state: string) => {
    try {
      const stateParts = state.split(":");
      const oauthState = localStorage.getItem(stateParts[0]);
      localStorage.removeItem(stateParts[0]);

      if (stateParts[1] !== oauthState) {
        console.log("error");
        throw new Error("States do not match up");
      }

      const response = await authenticateWithGithub(code);
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      return true;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const isAuthentificated = () => {
    const parsedToken = parseToken();
    if (parsedToken !== null) {
      return parsedToken.exp > Date.now() / 1000;
    }
    return false;
  };

  const parseToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      return jwtDecode(token) as Token;
    } catch (error) {
      console.error("Token decode error", error);
      return null;
    }
  };

  const getAuthUrl = () => {
    const oauthState = nanoid(10);
    const oauthStateKey = nanoid(5);
    localStorage.setItem(oauthStateKey, oauthState);

    const redirectUri = `${window.location.origin}/auth/callback`;
    const environment = import.meta.env.VITE_NODE_ENV;
    console.log("environment_log", environment);

    let app_client_id;
    switch (environment) {
      case "production":
        app_client_id = "Ov23liRK6WrVG8jPDU5M";
        break;
      case "staging":
        app_client_id = "Ov23liKHcV6ZlmTZqOtv";
        break;
      default:
        app_client_id = "Ov23liXxnsQCvlF3VVnH";
    }

    return `https://github.com/login/oauth/authorize?client_id=${app_client_id}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=user:email,%20read:org&state=${oauthStateKey}:${oauthState}`;
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthentificated,
        getAuthUrl,
        parseToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
