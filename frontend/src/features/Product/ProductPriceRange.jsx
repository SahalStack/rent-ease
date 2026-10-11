const ProductPriceRange = ({ updateParam, selectedPrice }) => {

	const handlePriceChange = (e) => {
		updateParam("maxPrice", e.target.value);
	};

	return (
		<div>
			<h3 className="text-headline-sm font-headline-sm text-primary mb-4">Price Range</h3>
			<div className="px-2">
				<input
					className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
					max="500"
					min="10"
					type="range"
					value={selectedPrice}
					onChange={handlePriceChange}
				/>
				<div className="flex justify-between mt-2 text-label-md font-label-md text-outline">
					<span>$10</span>
					<span>${selectedPrice}+</span>
				</div>
			</div>
		</div>
	)
}

export default ProductPriceRange
