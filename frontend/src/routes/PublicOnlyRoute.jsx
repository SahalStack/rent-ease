import { Navigate, Outlet } from "react-router-dom"

const PublicOnlyRoute = () => {
	const token = localStorage.getItem('token');

	// If token exists → send to home, block login/register
	if (token) return <Navigate to='/' replace />

	return <Outlet />;
}

export default PublicOnlyRoute;