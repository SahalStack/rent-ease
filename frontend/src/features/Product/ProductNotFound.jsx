import { Link } from 'react-router-dom'

const ProductNotFound = () => {
	return (
		<main className="grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-section-padding text-center">
			<div className="max-w-md w-full flex flex-col items-center animate-fade-in">
				<div className="mb-stack-md">
					<span className="material-symbols-outlined text-[64px] text-primary-container"
						style={{ fontVariationSettings: "'wght' 200" }}
					>
						inventory_2
					</span>
				</div>
				<h1 className="font-headline-md text-headline-md text-tertiary mb-stack-sm">
					Product Not Found
				</h1>
				<p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg leading-relaxed">
					The product you are looking for does not exist or may have been removed.
				</p>

				<Link className="bg-primary-container text-white px-8 py-3 rounded-lg font-label-md text-label-md tracking-wide hover:opacity-90 active:scale-95 transition-all shadow-md" to='/products'>
					Browse Products
				</Link>
			</div>
		</main>
	)
}

export default ProductNotFound
