import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuth, user, children }) => {
    const location = useLocation();

    if (!isAuth && !location.pathname.includes("/login")) {
        return <Navigate to="/login" />;
    }

    if (isAuth && location.pathname.includes("/login")) {
        return <Navigate to={user?.admin ? "/admin" : "/teacher"} />;
    }

    if (isAuth && user?.admin && location.pathname.startsWith("/teacher")) {
        return <Navigate to="/admin" />;
    }

    if (isAuth && !user?.admin && location.pathname.startsWith("/admin")) {
        return <Navigate to="/teacher" />;
    }

    return <>{children}</>;
};

export default CheckAuth;
