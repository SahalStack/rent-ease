
const SubImage = ({ selectedProduct }) => {
	return (
		<div className="grid grid-cols-4 gap-stack-sm">
			{selectedProduct.extraImages.map((image, index) => (
				<button
					key={index}
					className="aspect-square rounded-lg overflow-hidden border border-outline-variant hover:border-primary transition-colors">
					<img
						alt={`Product Image ${index + 1}`}
						className="w-full h-full object-cover"
						src={image} />
				</button>
			))}
		</div>
	)
}

export default SubImage;
