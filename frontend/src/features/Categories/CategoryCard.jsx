import { useNavigate } from "react-router-dom";

const CategoryCard = ({ image, name, quantity, description, slug }) => {

	const navigate = useNavigate();

	return (
		<div className="group cursor-pointer bg-surface-container-lowest rounded-2xl overflow-hidden soft-card-shadow hover:-translate-y-1 transition-all duration-300"
			onClick={() => navigate(`/products?category=${slug}`)}
		>
			<div className="aspect-4/3 overflow-hidden bg-white">
				<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					data-alt="A luxurious, high-end emerald green velvet sofa positioned in a bright, modern living room with cream-colored walls. The lighting is soft and natural, pouring in from large windows. Minimalist decor and a warm wooden side table complete the sophisticated, quiet luxury aesthetic of a premium home interior."
					src={image} />
			</div>
			<div className="p-6">
				<div className="flex justify-between items-start mb-2">
					<h3 className="font-headline-sm text-headline-sm text-primary">{name}</h3>
					<span className="font-caption text-caption text-outline">{quantity} Items</span>
				</div>
				<p className="font-body-md text-body-md text-on-surface-variant mb-4">{description}</p>
			</div>
		</div>
	)
}

export default CategoryCard
