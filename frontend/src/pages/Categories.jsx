import { categories, quickLinks } from "../../data"
import CategoryCard from "../features/Categories/CategoryCard"
import QuickLinkCard from "../features/Categories/QuickLinkCard"
import usePageTitle from "../hooks/usePageTitle"

const Categories = () => {
	usePageTitle('Categories');
	return (
		<>
			<header className="pt-12 pb-16 px-margin-desktop max-w-container-max mx-auto text-center md:text-left animate-fadeUp">
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
					<div className="max-w-2xl">
						<h1 className="font-display-lg text-display-lg text-primary mb-4">Browse Categories</h1>
						<p className="font-body-lg text-body-lg text-on-surface-variant">Explore furniture and appliances by
							category and find the perfect rental solution for your home or workspace.</p>
					</div>
					<div className="relative w-full md:w-96 group">
						<input
							className="w-full bg-surface-container-lowest border-outline-variant rounded-full py-4 pl-12 pr-4 focus:ring-primary focus:border-primary transition-all duration-300 shadow-sm"
							placeholder="Search categories..." type="text" />
						<span
							className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary"
							data-icon="search">search</span>
					</div>
				</div>
			</header>

			<section className="mb-section-padding animate-fadeUp">
				<div className="max-w-container-max mx-auto px-margin-desktop">
					<h2 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md">Quick Access</h2>
					<div
						className="flex overflow-x-auto gap-4 hide-scrollbar pb-4 -mx-margin-desktop px-margin-desktop md:mx-0 md:px-0">
						{quickLinks.map((link) => (
							<QuickLinkCard
								key={link.id}
								name={link.name}
								icon={link.icon}
							/>
						))}
					</div>
				</div>
			</section>
			
			<main className="max-w-container-max mx-auto px-margin-desktop mb-section-padding animate-fadeUp">
				<h2 className="font-headline-md text-headline-md text-on-surface mb-stack-lg">Featured Categories</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
					{categories.slice(1).map((category) => (
						<CategoryCard
							key={category.id}
							image={category.image}
							name={category.name}
							slug={category.slug}
							quantity={category.quantity}
							description={category.description}
						/>
					))}
				</div>
			</main>
		</>
	)
}

export default Categories
