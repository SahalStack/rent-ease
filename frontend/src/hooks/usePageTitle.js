import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `RentEase | ${title}`;
  }, [title]);
};

export default usePageTitle;