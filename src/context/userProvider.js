import axios from "axios";
import { useEffect, createContext, useContext, useState } from "react";
import { json, useNavigate } from "react-router-dom";

const authContext = createContext();

const AuthProvider = ({ children }) => {
    
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});

    const navigate = useNavigate();


    return (
        <authContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </authContext.Provider>
    )
}

export const AuthState = () => {
    return useContext(authContext);
};


export default AuthProvider;