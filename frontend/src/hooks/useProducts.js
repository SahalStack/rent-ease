import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFilterParams from "./useFilterParams";
import { fetchProducts } from "../features/Product/productThunk";
import {
	selectProducts,
	selectProductsLoading,
	selectProductsError,
} from "../features/Product/productSelectors";

const useProducts = () => {
	const dispatch = useDispatch();

	const products = useSelector(selectProducts);
	const isLoading = useSelector(selectProductsLoading);
	const error = useSelector(selectProductsError);

	const { searchParams, updateParam } = useFilterParams();

	const query = searchParams.toString();

	const selectedCategory = searchParams.get("category") || "";
	const selectedPrice = Number(searchParams.get("maxPrice")) || 250;
	const selectedAvailability = searchParams.get("availability") || "";
	const search = searchParams.get("search") || "";
	const sort = searchParams.get("sort") || "";
	const currentPage = Number(searchParams.get("page")) || 1;

	useEffect(() => {
		dispatch(fetchProducts(query));
	}, [dispatch, query]);

	return {
		products,
		isLoading,
		error,

		currentPage,

		selectedCategory,
		selectedPrice,
		selectedAvailability,
		search,
		sort,

		updateParam,
	};
};

export default useProducts;