import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { googleLogout } from '@react-oauth/google';

export const Authcontext = createContext();

export const AuthcontextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
    const [loading, setLoading] = useState(false);

    const login = async (token) => {
        setLoading(true);
        try {
            const res = await axios.post("/auth/login", token);
            const user = res.data.user_object;
            setCurrentUser({
                name: user.name,
                email: user.email,
                picture: user.picture
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/auth/logout");
            googleLogout()
            setCurrentUser(null);
        } catch (error) {
            console.log("Error on logout", error);
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <Authcontext.Provider value={{ currentUser, login, logout, loading }}>
            {children}
        </Authcontext.Provider>
    );
};