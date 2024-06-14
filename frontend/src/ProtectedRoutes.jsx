import { Outlet, Navigate } from "react-router-dom";
import { Authcontext } from './context/authContext'
import { useContext } from "react";

const ProtectedRoutes = () => {
    const { currentUser } = useContext(Authcontext);
    return currentUser ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
