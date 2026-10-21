import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicOnlyRoute = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

	// If logged in → send to home, block login/register
	if (isAuthenticated || token) return <Navigate to="/" replace />;

	return <Outlet />;
};

export default PublicOnlyRoute;