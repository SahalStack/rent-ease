import { motion } from "motion/react";
import FeaturedCategoryCard from "./FeaturedCategoryCard";
import { categories } from "../../../data";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const cardVariants = {
	hidden: (index) => ({
		opacity: 0,
		x: index % 2 === 0 ? -30 : 30,
	}),
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

const remainingCategories = categories.slice(1);

const FeaturedCategory = () => {
	return (
		<section className="bg-surface-container-low py-section-padding">
			<div className="max-w-container-max mx-auto px-margin-desktop">
				<motion.h2 className="text-headline-md font-headline-md text-on-surface text-center mb-stack-lg"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					Shop by Category
				</motion.h2>

				<motion.div className="group grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-stack-md"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					{remainingCategories.map((category, index) => (
						<motion.div
							key={category.id}
							variants={cardVariants}
							custom={index}
						>
							<FeaturedCategoryCard
								icon={category.icon}
								name={category.name}
								slug={category.slug}
							/>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default FeaturedCategory;