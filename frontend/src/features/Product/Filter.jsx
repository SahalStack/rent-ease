import ProductAvailability from "./ProductAvailability"
import ProductCategories from "./ProductCategories"
import ProductPriceRange from "./ProductPriceRange"

const Filter = ({ updateParam, selectedCategory, selectedPrice, selectedAvailability }) => {
	return (
		<aside className="w-full md:w-1/4 space-y-8">
			<ProductCategories
				selectedCategory={selectedCategory}
				updateParam={updateParam}
			/>

			<ProductPriceRange
				selectedPrice={selectedPrice}
				updateParam={updateParam}
			/>

			<ProductAvailability
				selectedAvailability={selectedAvailability}
				updateParam={updateParam}
			/>
		</aside>
	)
}

export default Filter
