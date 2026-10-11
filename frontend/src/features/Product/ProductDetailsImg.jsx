import SubImage from "./SubImage"

const ProductDetailsImg = ({ selectedProduct }) => {

	return (
		<div className="space-y-stack-sm">
			<div className="aspect-4/3 rounded-xl overflow-hidden bg-white product-card-shadow">
				<img
					alt="Velvet Sectional Sofa"
					className="w-full h-full object-cover"
					data-alt="A luxurious forest green velvet sectional sofa positioned in a bright, minimalist living room with floor-to-ceiling windows. The morning light spills across the rich texture of the velvet fabric. The space features clean architectural lines, a light cream wall, and polished light wood floors, embodying a quiet luxury aesthetic with deep greens and warm neutrals."
					src={selectedProduct.image} />
			</div>
			<SubImage selectedProduct={selectedProduct} />

		</div>
	)
}

export default ProductDetailsImg
