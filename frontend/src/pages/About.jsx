import usePageTitle from "../hooks/usePageTitle"
import { Link } from "react-router-dom";

const About = () => {
	usePageTitle('About');
	return (
		<main>
			<section className="py-section-padding px-margin-desktop max-w-container-max mx-auto overflow-hidden animate-fadeUp">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-section-padding items-center">
					<div className="flex flex-col gap-stack-md" data-aos="fade-right">
						<span
							className="inline-block self-start px-4 py-1.5 rounded-full bg-primary-container/10 text-primary border border-primary/10 font-label-md text-label-md uppercase tracking-wider">
							About RentEase
						</span>
						<h1
							className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
							Making Comfortable Living More Accessible
						</h1>
						<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
							RentEase helps individuals and families rent quality furniture and appliances without the burden
							of ownership. We bridge the gap between aspirational design and practical living.
						</p>
						<div className="pt-4">
							<a className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md uppercase tracking-wider hover:opacity-90 transition-all active:scale-95"
								href="#our-story">
								Learn Our Story
								<span className="material-symbols-outlined">arrow_downward</span>
							</a>
						</div>
					</div>
					<div className="relative group" data-aos="fade-left">
						<div
							className="absolute -inset-4 bg-primary-container/5 rounded-4xl -z-10 group-hover:scale-105 transition-transform duration-500">
						</div>
						<img alt=""
							className="w-full h-auto object-cover rounded-xl luxury-shadow aspect-2/3 md:max-h-175 mx-auto"
							src="/images/about1.png" />
					</div>
				</div>
			</section>
			<section className="py-section-padding bg-surface-container-low" id="our-story">
				<div className="px-margin-desktop max-w-container-max mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter md:gap-section-padding items-center">
						<div className="order-2 md:order-1">
							<img alt="" className="w-full h-auto object-cover rounded-xl luxury-shadow aspect-[1.79]"
								src="/images/about2.png" />
						</div>
						<div className="order-1 md:order-2 flex flex-col gap-stack-md">
							<h2 className="font-headline-md text-headline-md text-on-surface">Our Story</h2>
							<div
								className="flex flex-col gap-stack-sm text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
								<p>
									Founded on the belief that home should be a sanctuary, RentEase started as a response to
									the traditional hurdles of furnishing a modern space. We recognized that ownership isn't
									always the best path for everyone.
								</p>
								<p>
									By offering affordability, flexibility, and convenience, we've transformed the furniture
									rental industry into a service that adapts to your life, rather than forcing you to
									adapt to your furniture.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="py-section-padding px-margin-desktop max-w-container-max mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
					<div
						className="bg-surface-container-lowest p-stack-lg rounded-xl luxury-shadow flex flex-col gap-stack-md hover-lift">
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
							<span className="material-symbols-outlined"
								style={{ fontVariationSettings: "'FILL' 1" }}
							>flag</span>
						</div>
						<h3 className="font-headline-sm text-headline-sm text-on-surface">Mission</h3>
						<p className="font-body-md text-body-md text-on-surface-variant">
							Our mission is to democratize high-quality living by making premium furniture and essential
							appliances accessible through a seamless rental ecosystem, reducing the financial and logistical
							barriers of making a house a home.
						</p>
					</div>
					<div
						className="bg-surface-container-lowest p-stack-lg rounded-xl luxury-shadow flex flex-col gap-stack-md hover-lift">
						<div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
							<span className="material-symbols-outlined"
								style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
						</div>
						<h3 className="font-headline-sm text-headline-sm text-on-surface">Vision</h3>
						<p className="font-body-md text-body-md text-on-surface-variant">
							We envision a future where living solutions are smarter, more sustainable, and infinitely more
							flexible. RentEase aims to lead the global shift towards a circular economy in home furnishing,
							prioritizing utility and beauty over static ownership.
						</p>
					</div>
				</div>
			</section>
			<section className="py-section-padding bg-surface-container-low/50">
				<div className="px-margin-desktop max-w-container-max mx-auto">
					<div className="text-center mb-stack-lg">
						<h2 className="font-headline-md text-headline-md text-on-surface">Why Choose RentEase</h2>
						<p className="font-body-md text-body-md text-on-surface-variant mt-2">Elevating your rental experience
							through premium service.</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
						<div
							className="bg-surface p-stack-md rounded-lg luxury-shadow border border-outline-variant/20 hover-lift">
							<span className="material-symbols-outlined text-primary mb-stack-sm text-4xl">calendar_today</span>
							<h4 className="font-label-md text-label-md uppercase tracking-wide mb-2">Flexible Rental Plans</h4>
							<p className="font-caption text-on-surface-variant">Rent for a month or a year—you decide the
								duration that fits your current life stage.</p>
						</div>
						<div
							className="bg-surface p-stack-md rounded-lg luxury-shadow border border-outline-variant/20 hover-lift">
							<span className="material-symbols-outlined text-primary mb-stack-sm text-4xl">payments</span>
							<h4 className="font-label-md text-label-md uppercase tracking-wide mb-2">Affordable Pricing</h4>
							<p className="font-caption text-on-surface-variant">Transparent monthly rates with no hidden fees,
								helping you manage your budget effectively.</p>
						</div>
						<div
							className="bg-surface p-stack-md rounded-lg luxury-shadow border border-outline-variant/20 hover-lift">
							<span className="material-symbols-outlined text-primary mb-stack-sm text-4xl">handyman</span>
							<h4 className="font-label-md text-label-md uppercase tracking-wide mb-2">Free Maintenance</h4>
							<p className="font-caption text-on-surface-variant">Total peace of mind with our dedicated support
								team handling any wear and tear repairs.</p>
						</div>
						<div
							className="bg-surface p-stack-md rounded-lg luxury-shadow border border-outline-variant/20 hover-lift">
							<span className="material-symbols-outlined text-primary mb-stack-sm text-4xl">local_shipping</span>
							<h4 className="font-label-md text-label-md uppercase tracking-wide mb-2">Fast Delivery</h4>
							<p className="font-caption text-on-surface-variant">Professional white-glove installation and
								removal at your convenience.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="py-section-padding px-margin-desktop max-w-container-max mx-auto">
				<div className="text-center mb-section-padding">
					<h2 className="font-headline-md text-headline-md text-on-surface">How RentEase Works</h2>
				</div>
				<div className="relative grid grid-cols-1 md:grid-cols-4 gap-gutter text-center">
					<div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-outline-variant/30 -z-10"></div>
					<div className="flex flex-col items-center gap-stack-sm">
						<div
							className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center luxury-shadow mb-2 border-4 border-surface">
							<span className="material-symbols-outlined text-3xl">search</span>
						</div>
						<h4 className="font-label-md text-label-md uppercase tracking-wider">Browse Products</h4>
						<p className="font-caption text-on-surface-variant px-4">Explore our curated collection of high-end
							furniture.</p>
					</div>
					<div className="flex flex-col items-center gap-stack-sm">
						<div
							className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center luxury-shadow mb-2 border-4 border-surface">
							<span className="material-symbols-outlined text-3xl">schedule</span>
						</div>
						<h4 className="font-label-md text-label-md uppercase tracking-wider">Select Duration</h4>
						<p className="font-caption text-on-surface-variant px-4">Choose the rental period that works best for
							you.</p>
					</div>
					<div className="flex flex-col items-center gap-stack-sm">
						<div
							className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center luxury-shadow mb-2 border-4 border-surface">
							<span className="material-symbols-outlined text-3xl">shopping_bag</span>
						</div>
						<h4 className="font-label-md text-label-md uppercase tracking-wider">Place Your Order</h4>
						<p className="font-caption text-on-surface-variant px-4">Quick checkout process with secure payment
							options.</p>
					</div>
					<div className="flex flex-col items-center gap-stack-sm">
						<div
							className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center luxury-shadow mb-2 border-4 border-surface">
							<span className="material-symbols-outlined text-3xl">sentiment_satisfied</span>
						</div>
						<h4 className="font-label-md text-label-md uppercase tracking-wider">Enjoy Your Rental</h4>
						<p className="font-caption text-on-surface-variant px-4">Relax as we deliver and set up your new
							interior.</p>
					</div>
				</div>
			</section>
			<section className="py-section-padding bg-primary text-on-primary">
				<div className="px-margin-desktop max-w-container-max mx-auto">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
						<div className="flex flex-col gap-2">
							<span className="font-display-lg-mobile md:font-headline-md text-primary-fixed">5,000+</span>
							<span className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed/80">Happy
								Customers</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="font-display-lg-mobile md:font-headline-md text-primary-fixed">1,200+</span>
							<span
								className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed/80">Products
								Available</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="font-display-lg-mobile md:font-headline-md text-primary-fixed">50+</span>
							<span className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed/80">Cities
								Served</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="font-display-lg-mobile md:font-headline-md text-primary-fixed">98%</span>
							<span
								className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed/80">Satisfaction</span>
						</div>
					</div>
				</div>
			</section>
			<section className="py-30 px-margin-desktop max-w-container-max mx-auto text-center">
				<div className="max-w-3xl mx-auto flex flex-col gap-stack-md items-center">
					<h2 className="font-display-lg-mobile md:font-display-lg text-on-surface">Ready to Transform Your Space?
					</h2>
					<p className="font-body-lg text-body-lg text-on-surface-variant">
						Browse furniture and appliances that fit your lifestyle and budget. Start your journey toward a more
						beautiful home today.
					</p>
					<div className="flex flex-col sm:flex-row gap-stack-sm mt-stack-md">
						<Link to='/products' className="bg-primary text-on-primary px-10 py-4 rounded-lg font-label-md text-label-md uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 shadow-lg"
							href="#">
							Browse Products
						</Link>
						<Link to='/contact' className="border-2 border-primary text-primary px-10 py-4 rounded-lg font-label-md text-label-md uppercase tracking-wider hover:bg-primary/5 transition-all active:scale-95"
							href="#">
							Contact Us
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}

export default About
