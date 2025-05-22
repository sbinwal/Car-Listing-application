'use client'
import React, { useState } from 'react'
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilter } from './utils/Slice/FIlterSlice'
import { useRouter } from 'next/navigation'

const Header = ({showSearch}) => {
  const filterData = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch()
  const router = useRouter()
  const handleSearch = (e) => {
    const searchValue = e.target.value
    dispatch(applyFilter({ ...filterData, page: 1, search: searchValue }));
    router.push(`/?page=1&&filter=${JSON.stringify({ ...filterData.filter })}&sort=${filterData?.sortByData}&search=${searchValue}`);
  }

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 px-4 py-4 grid grid-cols-4">
      <div className="text-2xl font-bold text-blue-600 cursor-pointer inline-flex items-center w-fit" onClick={()=>router.push("/")}>
          Car Listings
        </div>
        {showSearch &&
        <div className="max-w-7xl mx-auto col-span-3 w-full">
          <Search
            search={filterData?.search}
            handleSearch={handleSearch}
          />
        </div>
        }
      </header>
    </>
  )
}

export default Header
