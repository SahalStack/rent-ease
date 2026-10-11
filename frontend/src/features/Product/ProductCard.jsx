import { useNavigate } from "react-router-dom";
import RentButton from "../../ui/RentButton";

const ProductCard = ({ product, hideActions = true }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/products/${product.id}`)}
			className="card-shadow bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col h-full card-hover transition-all duration-300 cursor-pointer"
		>
			<div className="aspect-4/3 bg-white overflow-hidden">
				<img
					src={product.image}
					alt={product.name}
					loading="lazy"
					decoding="async"
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="p-6 flex flex-col grow">
				<div className={hideActions ? "flex justify-between items-start mb-8" : "flex justify-between items-start mb-2"}>
					<span className="text-label-md font-label-md text-secondary uppercase">
						{product.category}
					</span>

					<div className="flex items-center text-secondary">
						<span
							className="material-symbols-outlined text-[18px]"
							style={{
								fontVariationSettings: "'FILL' 1",
							}}
						>
							star
						</span>

						<span className="ml-1 text-label-md">
							{product.rating}
						</span>
					</div>
				</div>

				<h3 className="text-headline-sm font-headline-sm text-on-surface mb-1">
					{product.name}
				</h3>

				{product.reviewCount !== undefined && (
					<p className="text-caption text-outline mb-4">
						{product.reviewCount === 0 ? '' : `${product.reviewCount} Reviews`}
					</p>
				)}

				{!hideActions && (
					<div className="mt-auto pt-4 flex items-center justify-between">
						<div>
							<p className="text-primary font-bold text-headline-sm">
								${product.price}
								<span className="text-label-md text-outline">
									{" "}
									/mo
								</span>
							</p>
						</div>

						<RentButton
							type="primary"
							label="Rent Now"
							to={`/products/${product.id}`}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductCard;