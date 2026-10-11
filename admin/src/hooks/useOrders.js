import { useEffect, useState } from "react";
import { fetchAllOrders } from "../services/orderApi";

const useOrders = () => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setIsLoading(true);
				const data = await fetchAllOrders();
				setOrders(data);
			} catch (error) {
				console.error(error);
				setError(`Failed to load Orders: ${error.message}`);
			} finally {
				setIsLoading(false);
			}
		};
		fetchOrders();
	}, []);

	return {
		orders,
		isLoading,
		error
	}
}

export default useOrders;