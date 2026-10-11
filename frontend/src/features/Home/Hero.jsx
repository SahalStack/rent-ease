import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Hero = () => {
	return (
		<section className="max-w-container-max mx-auto px-margin-desktop py-section-padding animate-fadeUp">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

				<motion.div
					className="order-2 lg:order-1"
					initial={{ opacity: 0, x: -60 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="text-display-lg font-display-lg text-on-surface mb-stack-md">
						Rent Furniture &amp; Appliances <span className="text-primary">Without the Commitment</span>
					</h1>
					<p className="text-body-lg font-body-lg text-on-surface-variant mb-stack-lg max-w-xl">
						Elevate your living space with high-quality furniture and appliances on flexible monthly plans.
						Delivery and maintenance included.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link
							to='/products'
							className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-body-md shadow-sm hover:opacity-90 transition-all">Browse
							Products</Link>
						<a
							href="#how-it-works"
							className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-body-md hover:bg-primary/5 transition-all">How
							It Works</a>
					</div>
				</motion.div>
				<motion.div className="order-2 lg:order-2"
					initial={{ opacity: 0, x: 60 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						duration: 0.3,
						delay: 0.3,
					}}
				>
					<div className="rounded-xl overflow-hidden shadow-xl aspect-4/3 relative">
						<img
							alt="Premium minimalist living room"
							className="w-full h-full object-cover"
							src="/images/hero.jpg"
							loading="eager"
							fetchPriority="high"
							decoding="async"
						/>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

export default Hero
