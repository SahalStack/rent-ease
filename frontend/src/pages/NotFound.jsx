import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const NotFound = () => {
	usePageTitle('Page Not Found');
	
	return (
		<main className="pt-30 pb-section-padding px-margin-mobile md:px-margin-desktop max-w-2xl mx-auto flex flex-col items-center text-center">
			<div className="mb-stack-md animate-in fade-in zoom-in duration-700">
				<img
					src="/images/not-found.jpg"
					alt="Empty armchair"
					className="w-24 h-24 object-contain mx-auto opacity-80"
				/>
			</div>

			<section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
				<h1
					className="font-display-lg text-[100px] leading-none mb-2"
					style={{ color: "#79473d" }}
				>
					404
				</h1>
				<h2 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">
					Looks like this room is empty.
				</h2>

				<p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-lg mx-auto">
					The page you're looking for doesn't exist or may have been
					moved. Let's help you find the perfect furniture instead.
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-stack-lg">
					<Link to='/products' className="w-full sm:w-auto px-8 py-4 bg-primary-container text-on-primary rounded-xl font-label-md text-label-md hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20">
						Browse Products
					</Link>

					<Link to='/' className="w-full sm:w-auto px-8 py-4 border-2 border-primary-container text-primary-container rounded-xl font-label-md text-label-md hover:bg-primary-container/5 active:scale-95 transition-all">
						Go Back Home
					</Link>
				</div>
			</section>
		</main>
	);
};

export default NotFound;