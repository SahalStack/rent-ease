import { Link } from "react-router-dom";

const FeaturedCategoryCard = ({ icon, name, slug }) => {
	return (
		<Link
			to={`/products?category=${slug}`}
			className="group flex flex-col items-center p-stack-md bg-white rounded-lg card-shadow card-hover transition-all duration-300 group-hover:scale-95 hover:scale-110!"
		>
			<span className="material-symbols-outlined text-primary text-4xl mb-stack-sm">
				{icon}
			</span>

			<span className="text-label-md font-label-md text-on-surface group-hover:text-primary transition-colors">
				{name}
			</span>
		</Link>
	);
};

export default FeaturedCategoryCard;