import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Search = ({ search, handleSearch }) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center bg-white border rounded-full px-4 py-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by make, model, year..."
          className="w-full focus:outline-none"
        />
      </div>

      
    </div>
  )
}

export default Search
