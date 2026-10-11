import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useFilterParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const updateParam = useCallback((key, value) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			if (!value) {
				params.delete(key);
			} else {
				params.set(key, value);
			}
			if (key !== "page") {
				params.set("page", "1");
			}
			return params;
		});
	}, [setSearchParams]);

	return {
		searchParams,
		updateParam,
	};
};

export default useFilterParams;