function ProductTitle() {
	return (
		<>
			<nav className="mb-4 flex items-center text-label-md font-label-md text-outline">
				<a className="hover:text-primary" href="#">Home</a>
				<span className="mx-2"> {">"} </span>
				<span className="text-on-surface">Products</span>
			</nav>
			<h1 className="text-display-lg font-display-lg text-primary mb-8">Rental Products</h1>
		</>
	)
}

export default ProductTitle;

