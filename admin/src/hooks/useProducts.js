import { useEffect, useState } from "react";
import { fetchAllProducts, updateProduct } from "../services/productApi";
import toast from "react-hot-toast";

const useProducts = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleEditProduct = (product) => {
		setSelectedProduct(product);
		setIsEditOpen(true);
	}

	const handleCloseModal = () => {
		setIsEditOpen(false);
		setSelectedProduct(null);
	}

	useEffect(() => {
		const controller = new AbortController();
		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const data = await fetchAllProducts();
				setProducts(data);
			} catch (error) {
				setError(`Failed to load products: ${error.message}`);
			} finally {
				setIsLoading(false);
			}
		}
		fetchProducts();

		return () => controller.abort();
	}, []);

	const refreshProducts = async () => {
		const data = await fetchAllProducts();
		setProducts(data);
	};

	const editProduct = async (id, formData) => {
		try {
			const updatedProduct = await updateProduct(id, formData);
			await refreshProducts();
			toast.success("Product updated successfully");
			return updatedProduct;
		} catch (error) {
			toast.error(error.message);
			throw error;
		}
	};

	return {
		products,
		isLoading,
		error,
		isEditOpen,
		selectedProduct,
		editProduct,
		handleEditProduct,
		handleCloseModal,
		refreshProducts
	};
}
export default useProducts;