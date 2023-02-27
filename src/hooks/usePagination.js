import { useState } from "react";

const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(3);

    const [myData, setMyData] = useState([]);

    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentData = myData.slice(firstIndex, lastIndex);

    const disabledNext = Math.ceil(myData.length / 3) > currentPage;
    const disabledPrev = currentPage > 1;
  
    const prevPage = () => setCurrentPage(prev => prev - 1);
    const nextPage = () => setCurrentPage(prev => prev + 1);
  
    return {currentData, disabledNext, disabledPrev, prevPage, nextPage, setMyData};
}

export default usePagination;