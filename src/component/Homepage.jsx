"use client";
import React, { useState, useMemo, useEffect } from "react";
import CarList from "./CarList";
import PaginationComponent from "./Pagination";
import { countPerPage } from "./utils/Constants";
import { useRouter } from "next/navigation";
import Filter from "./Filter";
import Sort from "./Sort";
import { applyFilter } from "../component/utils/Slice/FIlterSlice";
import { useDispatch, useSelector } from "react-redux";
import { processCarData } from "./utils/ProcessCarData";

const Homepage = ({ data, currentPage, filter, sort, search }) => {

  const filterData = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasQueryParams = window.location.search.length > 0;
      if (hasQueryParams) {
        router.replace("/", { scroll: false });
      }
    }
  }, []);
  const processedData = useMemo(
    () => processCarData(data, filter, sort, search),
    [data, filter, sort, search]
  );

  const totalPageCount = useMemo(
    () => Math.ceil(processedData.length / countPerPage),
    [processedData.length]
  );

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * countPerPage;
    const endIndex = startIndex + countPerPage;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, currentPage]);

  const onPageChange = (page) => {
    dispatch(applyFilter({ ...filterData, page: page }));
    router.push(
      `/?page=${page}&filter=${JSON.stringify({ ...filterData.filter })}&sort=${
        filterData?.sortByData
      }&search=${filterData?.search}`
    );
  };


  return (
    <>
      
        <div>
          <div className="flex flex-wrap items-center justify-between px-4 py-2 gap-4">
            <Filter />
            <Sort />
          </div>
         {processedData.length === 0 ? 
          <div className="text-center py-20 text-blue-500 text-lg font-medium">
          No cars match the selected filters.
        </div> :
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-4">
            {currentItems.map((item) => (
              <div key={item?.id} onClick={()=>router.push(`/car/${item?.id}`)}>
              <CarList item={item}/>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <PaginationComponent
              totalPageCount={totalPageCount}
              onPageChange={onPageChange}
              currentPage={currentPage} // in case needed for styling active page
            />
          </div>
          </div>
}
        </div>
    </>
  );
};

export default Homepage;
