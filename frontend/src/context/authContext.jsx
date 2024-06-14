import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const Authcontext = createContext()

export const AuthcontextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))

    const login = async (token) => {
        try {
            const res = await axios.post("/auth/login", token)
            // console.log("DEBUG REACT", token);
            // const user_credential = jwtDecode(token);
            // setCurrentUser({
            //     google_id: user_credential.sub,
            //     name: user_credential.name,
            //     email: user_credential.email,
            //     picture: user_credential.picture
            // })
            setCurrentUser({ // FIXME change to real data
                google_id: "test",
                name: "test test",
                email: "testEmail",
                picture: "testpicture"
            })
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async (token) => {
        try {
            const res = await axios.post("/auth/logout")
            setCurrentUser(null)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])


    return (
        <Authcontext.Provider value={{ currentUser, login, logout }}>
            {children}
        </Authcontext.Provider>
    )
}




// const loginUser = async () => {
//     try {
//         await axios.post("/auth/login", userToken)
//         // navigate("/")
//         console.log("sent")
//     } catch (error) {
//         console.log(error);
//     }
// }