import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PageLoader from "../ui/PageLoader";

const ProtectedRoute = () => {
	const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

	if (isLoading) return <PageLoader />;
	if (!isAuthenticated) return <Navigate to="/login" replace />;

	return <Outlet />;
};

export default ProtectedRoute;