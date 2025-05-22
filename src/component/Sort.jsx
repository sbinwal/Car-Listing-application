import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter } from "./utils/Slice/FIlterSlice";

const Sort = ({ onSortChange }) => {
  const router = useRouter();
  const dispatch = useDispatch()
  const [sortOption, setSortOption] = useState("");
  const filterData = useSelector((state) => state.filterSlice);
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    dispatch(applyFilter({ ...filterData, page: 1, sortByData: selectedOption }));
    router.push(`/?page=1&&filter=${JSON.stringify({ ...filterData.filter })}&sort=${selectedOption}&searc=${filterData?.search}`);
    // Call the parent component's handler if provided
    if (onSortChange) {
      onSortChange(selectedOption);
    }
  };

  return (
    <div>
      <select
        className="border rounded px-3 py-1 text-sm text-gray-700"
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="">Sort by</option>
        <option value="price_asc">Price, low to high</option>
        <option value="price_desc">Price, high to low</option>
        <option value="mileage_asc">Mileage, low to high</option>
        <option value="mileage_desc">Mileage, high to low</option>
        <option value="year_desc">Year, Newest to Oldest</option>
        <option value="year_asc">Year, Oldest to Newest</option>
      </select>
    </div>
  );
};

export default Sort;
