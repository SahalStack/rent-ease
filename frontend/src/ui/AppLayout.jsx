import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const AppLayout = () => {
	const location = useLocation()
	const showFooter = location.pathname === "/"

	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			{showFooter && <Footer />}
		</>
	)
}

export default AppLayout
