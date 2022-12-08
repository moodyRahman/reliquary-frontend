import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authState } from "../features/authUpdate";

const ProtectedRoutes = () => {
    const loggedin = useSelector((state: {auth: authState}) => state.auth.isLoggedIn);

    if (loggedin) {
        return <Outlet />
    }
    return <Navigate to="/" replace />;
}

const OnlyUnauthRoutes = () => {
    const loggedin = useSelector((state: {auth: authState}) => state.auth.isLoggedIn);

    if (loggedin) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />
}

export { ProtectedRoutes, OnlyUnauthRoutes }
