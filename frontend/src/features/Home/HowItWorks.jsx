import { motion } from "motion/react";

const cardVariants = {
	hidden: (direction) => ({
		opacity: 0,
		x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
		y: direction === "center" ? 50 : 0,
	}),
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

const HowItWorks = () => {
	return (
		<section
			className="bg-surface-container py-section-padding"
			id="how-it-works"
		>
			<div className="max-w-container-max mx-auto px-margin-desktop text-center">

				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-headline-md font-headline-md text-on-surface mb-stack-lg"
				>
					How It Works
				</motion.h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">

					{/* Step 1 */}
					<motion.div
						custom="left"
						variants={cardVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						whileHover={{ y: -6 }}
						className="flex flex-col items-center"
					>
						<motion.div
							initial={{ scale: 0 }}
							whileInView={{ scale: 1 }}
							viewport={{ once: true }}
							transition={{
								type: "spring",
								stiffness: 180,
								delay: 0.2,
							}}
							className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center mb-stack-sm"
						>
							<span className="material-symbols-outlined text-primary text-3xl">
								search
							</span>
						</motion.div>

						<h3 className="text-headline-sm font-headline-sm mb-2">
							1. Browse Products
						</h3>

						<p className="text-body-md font-body-md text-on-surface-variant">
							Discover a curated collection of furniture and top-brand
							appliances.
						</p>
					</motion.div>

					{/* Step 2 */}
					<motion.div
						custom="center"
						variants={cardVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						whileHover={{ y: -6 }}
						transition={{ delay: 0.15 }}
						className="flex flex-col items-center"
					>
						<motion.div
							initial={{ scale: 0 }}
							whileInView={{ scale: 1 }}
							viewport={{ once: true }}
							transition={{
								type: "spring",
								stiffness: 180,
								delay: 0.35,
							}}
							className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center mb-stack-sm"
						>
							<span className="material-symbols-outlined text-primary text-3xl">
								calendar_today
							</span>
						</motion.div>

						<h3 className="text-headline-sm font-headline-sm mb-2">
							2. Select Duration
						</h3>

						<p className="text-body-md font-body-md text-on-surface-variant">
							Choose a flexible rental plan that fits your current lifestyle
							needs.
						</p>
					</motion.div>

					{/* Step 3 */}
					<motion.div
						custom="right"
						variants={cardVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						whileHover={{ y: -6 }}
						transition={{ delay: 0.3 }}
						className="flex flex-col items-center"
					>
						<motion.div
							initial={{ scale: 0 }}
							whileInView={{ scale: 1 }}
							viewport={{ once: true }}
							transition={{
								type: "spring",
								stiffness: 180,
								delay: 0.5,
							}}
							className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center mb-stack-sm"
						>
							<span className="material-symbols-outlined text-primary text-3xl">
								sentiment_satisfied
							</span>
						</motion.div>

						<h3 className="text-headline-sm font-headline-sm mb-2">
							3. Enjoy Your Rental
						</h3>

						<p className="text-body-md font-body-md text-on-surface-variant">
							We handle delivery, assembly, and maintenance while you relax.
						</p>
					</motion.div>

				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
