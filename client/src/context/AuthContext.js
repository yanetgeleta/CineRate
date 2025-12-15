import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = async (credentilas)=> {
        const userData = {id: credentilas.id, name: credentilas.name}; //more inforarmation will be collected later on
        setUser(userData);
    };
    const logout = ()=> {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}} >{children}</AuthContext.Provider>
    )
};

export const useAuth = ()=> useContext(AuthContext);