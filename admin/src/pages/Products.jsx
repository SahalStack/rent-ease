import ProductsTable from "../components/Products/ProductsTable"
import AddProductButton from "../components/Products/AddProductButton"
import EditProductModal from "../components/Products/EditProductModal"
import useProducts from "../hooks/useProducts";

const Products = () => {

	const {
		products,
		error,
		isLoading,
		selectedProduct,
		isEditOpen,
		editProduct,
		refreshProducts,
		handleEditProduct,
		handleCloseModal,
	} = useProducts();

	return (
		<div>
			<AddProductButton />
			<ProductsTable
				onEdit={handleEditProduct}
				products={products}
				isLoading={isLoading}
				error={error}
			/>

			{isEditOpen && (
				<EditProductModal
					isOpen={isEditOpen}
					editProduct={editProduct}
					onClose={handleCloseModal}
					product={selectedProduct}
					refreshProducts={refreshProducts}
				/>
			)}
		</div>
	)
}

export default Products
