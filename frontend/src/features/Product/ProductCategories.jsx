import CategoryOption from "./CategoryOption";
import { categories } from "../../../data";

const ProductCategories = ({ updateParam, selectedCategory }) => {

	const handleCategoryChange = (slug) => {
		updateParam("category", slug);
	};

	return (
		<div>
			<h3 className="text-headline-sm font-headline-sm text-primary mb-4">Categories</h3>
			<div className="space-y-3">
				{categories.map((categoryItem) => (
					<CategoryOption
						key={categoryItem.id}
						slug={categoryItem.slug}
						value={categoryItem.name}
						category={selectedCategory}
						setCategory={handleCategoryChange}
					/>
				))}
			</div>
		</div>
	)
}

export default ProductCategories
