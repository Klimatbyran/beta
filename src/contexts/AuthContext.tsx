import { authenticateWithGithub } from "@/lib/api";
import { Token } from "@/types/token";
import { jwtDecode } from "jwt-decode";
import { nanoid } from "nanoid";
import React, { useContext, createContext, useState } from "react";


export interface AuthContext {
    token: string
    login: (code: string, state: string) => Promise<boolean>
    logout: () => void,
    isAuthentificated: () => boolean,
    getAuthUrl: () => string,
    parseToken: () => Token | null
}


const AuthContext = createContext<AuthContext>({} as AuthContext);

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const login = async (code: string, state: string) => {       
        try {
            const stateParts = state.split(":");
            const oauthState = localStorage.getItem(stateParts[0]);
            localStorage.removeItem(stateParts[0]);
            
            if(stateParts[1] !== oauthState) {
                console.log("error");
                throw new Error("States do not match up");
            }

            const response = await authenticateWithGithub(code);
            if (response.token) {
                localStorage.setItem('token', response.token);
            }
            return true;
            } catch (error) {
                console.error('Login error', error);
                throw error;
            }
    }
    
    const isAuthentificated = () => {
        const parsedToken = parseToken();
        if(parsedToken !== null) {
            return parsedToken.exp > (Date.now() / 1000)
        }
        return false;
    }

    const parseToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        
        try {
            return jwtDecode(token) as Token;
        } catch (error) {
        console.error('Token decode error', error);
            return null;
        }
    }

    const getAuthUrl = () => {
         const oauthState: string = nanoid(10);
         const oauthStateKey: string = nanoid(5);
 
         localStorage.setItem(oauthStateKey, oauthState);
 
         const authUrl = "https://github.com/login/oauth/authorize?" + 
         "client_id=Ov23liXxnsQCvlF3VVnH" +
         "&redirect_uri=" + encodeURIComponent("http://localhost:5173/auth/callback") +
         "&scope=user:email,%20read:org" +
         "&state=" + oauthStateKey + ":" + oauthState;
 
         return authUrl;
    }

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    return (<AuthContext.Provider value={{token, login, logout, isAuthentificated, getAuthUrl, parseToken}}>
        {children}
    </AuthContext.Provider>);  
}

export default AuthProvider;
