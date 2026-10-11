import { useLocation } from "react-router-dom";
import { pageHeaders } from "../helper";

const PageHeader = () => {
	const location = useLocation();

	const current = pageHeaders.find((page) => page.path === location.pathname);

	if (!current) return null;

	return (
		<div className="py-6 px-12 border-b border-gray-200">
			<h1 className="text-3xl font-bold text-gray-900">{current.heading}</h1>
			<p className="text-sm text-gray-500">{current.subheading}</p>

		</div>
	);
};

export default PageHeader;