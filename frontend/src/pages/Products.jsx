import { motion } from "motion/react";
import Filter from "../features/Product/Filter"
import ProductCard from '../features/Product/ProductCard'
import ProductSearch from "../features/Product/ProductSearch"
import ProductTitle from "../features/Product/ProductTitle"
import ProductPagination from "../features/Product/ProductPagination"
import useProducts from "../hooks/useProducts"
import usePageTitle from "../hooks/usePageTitle"
import ContentLoader from "../ui/ContentLoader"
import { containerVariants, cardVariants } from "../utils/animations"

const Products = () => {
	const {
		products,
		isLoading,
		totalPages,
		currentPage,
		selectedCategory,
		selectedPrice,
		selectedAvailability,
		search,
		sort,
		updateParam,
	} = useProducts();

	usePageTitle("Products");

	return (
		<main className="max-w-container-max mx-auto px-margin-desktop py-8 animate-fadeUp">
			<ProductTitle />
			<ProductSearch
				search={search}
				sort={sort}
				updateParam={updateParam}
			/>
			<div className="flex flex-col md:flex-row gap-gutter">
				<Filter
					updateParam={updateParam}
					selectedCategory={selectedCategory}
					selectedPrice={selectedPrice}
					selectedAvailability={selectedAvailability}
				/>
				{isLoading ? (
					<ContentLoader text="Loading Products..." />
				) : products.length === 0 ? (
					<div className="w-full md:w-3/4 flex flex-col items-center justify-start pt-16 md:pt-24">
						<span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">
							search_off
						</span>
						<p className="text-headline-sm font-headline-sm text-on-surface-variant">
							No Products Found
						</p>
						<p className="text-body-md text-outline mt-2">
							Try adjusting your filters or search term
						</p>
					</div>
				) : (
					<section className="w-full md:w-3/4">
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter"
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							{products.map((product) => (
								<motion.div
									key={product.id}
									variants={cardVariants}
								>
									<ProductCard
										product={product}
										hideActions={false}
									/>
								</motion.div>
							))}
						</motion.div>

						<ProductPagination
							currentPage={currentPage}
							totalPages={totalPages}
							updateParam={updateParam}
						/>
					</section>
				)}


			</div>
		</main>
	)
}

export default Products
