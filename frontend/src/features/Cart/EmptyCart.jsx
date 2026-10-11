import { Link } from "react-router-dom";

const EmptyCart = () => {
	return (
		<div className="flex flex-col items-center justify-center text-center py-20 animate-float">
			<div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100">
				<span className="material-symbols-outlined text-4xl text-green-600">
					shopping_cart
				</span>
			</div>
			<h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
			<p className="mt-2 max-w-md text-on-surface-variant">
				Looks like you haven't added any rental items yet.
				Start browsing and find something you love.
			</p>

			<Link to='/products' className="mt-6 px-5 py-3 rounded-lg bg-primary text-white">
				Browse Products
			</Link>
		</div>
	)
}

export default EmptyCart;


