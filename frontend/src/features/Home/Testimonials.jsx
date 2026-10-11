import { motion } from "motion/react";
import Rating from "../../ui/Rating";
import { testimonials } from "../../../data";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.3,
		},
	},
};

const cardVariants = {
	hidden: (direction) => ({
		opacity: 0,
		x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
		y: 40,
	}),
	visible: {
		opacity: 1,
		x: 0,
		y: 0,
		transition: {
			duration: 0.7,
			ease: "easeOut",
		},
	},
};

const Testimonials = () => {
	return (
		<section className="bg-primary/5 py-section-padding">
			<div className="max-w-container-max mx-auto px-margin-desktop">

				<motion.h2
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-headline-md font-headline-md text-on-surface text-center mb-stack-lg"
				>
					What Our Customers Say
				</motion.h2>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-3 gap-stack-md"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
				>
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.name}
							custom={
								index === 0
									? "left"
									: index === 1
										? "center"
										: "right"
							}
							variants={cardVariants}
							whileHover={{
								y: -10,
								scale: 1.02,
								transition: { duration: 0.2 },
							}}
							className="bg-white p-8 rounded-lg card-shadow"
						>
							<Rating stars={testimonial.rating} />

							<p className="text-body-md font-body-md italic text-on-surface mb-stack-md mt-3">
								{testimonial.text}
							</p>

							<div className="flex items-center gap-stack-sm">
								<div
									className={`w-10 h-10 rounded-full ${testimonial.bg}`}
								/>

								<div>
									<p className="text-label-md font-bold">{testimonial.name}</p>
									<p className="text-caption text-on-surface-variant">
										{testimonial.role}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

			</div>
		</section>
	);
};

export default Testimonials;