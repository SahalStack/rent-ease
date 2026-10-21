import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Spinner from "../ui/Spinner";

const PublicOnlyRoute = () => {
	const { user, loading } = useAuth();

	if (loading) return <Spinner />;
	if (user?.role === "admin") {
		return <Navigate to="/admin/dashboard" replace />;
	}
	return <Outlet />;
};

export default PublicOnlyRoute;