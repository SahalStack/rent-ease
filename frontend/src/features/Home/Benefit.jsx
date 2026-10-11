import { motion } from "motion/react";
import { benefits } from "../../../data";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const cardVariants = {
	hidden: {
		opacity: 0,
		x: -50,
		y: 20,
	},
	visible: {
		opacity: 1,
		x: 0,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

const Benefit = () => {
	return (
		<section className="max-w-container-max mx-auto px-margin-desktop py-section-padding">
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
			>
				{benefits.map((benefit) => (
					<motion.div
						key={benefit.title}
						variants={cardVariants}
						whileHover={{
							y: -8,
							transition: { duration: 0.2 },
						}}
						className="p-stack-md bg-white rounded-lg card-shadow"
					>
						<motion.span
							initial={{ scale: 0 }}
							whileInView={{ scale: 1 }}
							viewport={{ once: true }}
							transition={{
								type: "spring",
								stiffness: 200,
							}}
							className="material-symbols-outlined text-primary mb-stack-sm text-3xl"
						>
							{benefit.icon}
						</motion.span>

						<h4 className="text-label-md font-bold mb-2">
							{benefit.title}
						</h4>

						<p className="text-caption font-body-md text-on-surface-variant">
							{benefit.description}
						</p>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
};

export default Benefit;