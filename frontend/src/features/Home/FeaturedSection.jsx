import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { products } from "../../../data";
import ProductCard from "../Product/ProductCard";
import { containerVariants, cardVariants } from "../../utils/animations";

const fourProducts = products.slice(0, 4);

const Featured = () => {
	return (
		<section className="bg-surface-container-low py-section-padding">
			<div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop">
				<motion.div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-stack-lg"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<div className="flex-1">
						<h2 className="text-headline-md font-headline-md text-on-surface">
							Featured Rentals
						</h2>

						<p className="text-body-md text-on-surface-variant">
							Selected top-tier pieces for your modern home.
						</p>
					</div>

					<Link
						to="/products"
						className="shrink-0 text-primary font-bold text-label-md hover:underline flex items-center gap-1"
					>
						View all items
						<span className="material-symbols-outlined text-sm">
							arrow_forward
						</span>
					</Link>
				</motion.div>

				<motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-md"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					{fourProducts.map((product) => (
						<motion.div
							key={product.id}
							variants={cardVariants}
							whileHover={{
								y: -6,
								transition: { duration: 0.2 },
							}}
						>
							<ProductCard
								product={product}
								for="home"
							/>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Featured;