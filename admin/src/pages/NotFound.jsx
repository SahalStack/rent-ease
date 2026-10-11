import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="min-h-screen bg-white flex items-center justify-center px-6">
			<div className="text-center max-w-md">
				<h1 className="text-[9rem] leading-none font-black text-black tracking-tight select-none">
					404
				</h1>
				<div className="w-12 h-px bg-black mx-auto my-6" />
				<h2 className="text-xl font-semibold text-black mb-2">
					Page not found
				</h2>
				<p className="text-sm text-gray-500 mb-8">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Link
					href="/admin/dashboard"
					className="inline-block border border-black text-black text-sm font-medium px-6 py-2.5 hover:bg-black hover:text-white transition-colors duration-200"
				>
					Back to Home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;