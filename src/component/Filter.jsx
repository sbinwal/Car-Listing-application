"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactSlider from "react-slider";
import { useRouter } from "next/navigation";
import { applyFilter } from "./utils/Slice/FIlterSlice";
import { addCarList } from "./utils/Slice/CarListSlice";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_CARS } from "./utils/routes";

const Filter = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.filterSlice);
  const carData = useSelector((state)=> state.carSlice);
  console.log("cardata",carData)
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    priceMin: "",
    priceMax: "",
    year: null,
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandedFilters, setExpandedFilters] = useState({
    price: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Check if carData already exists in Redux
        if (carData && carData.length > 0) {
          // Use existing data from Redux
          const uniqueBrands = [...new Set(carData.map((item) => item.make))];
          setBrands(uniqueBrands);
          setLoading(false);
        } else {
          // Fetch from API only if no data exists
          const response = await fetch(GET_ALL_CARS);
          const data = await response.json();
          dispatch(addCarList(data));
          const uniqueBrands = [...new Set(data.map((item) => item.make))];
          setBrands(uniqueBrands);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [carData, dispatch]);

  useEffect(() => {
    const fetchModels = async () => {
      if (!filters.brand) {
        setModels([]);
        return;
      }

      try {
        setLoading(true);
        
        if (carData && carData.length > 0) {
          const filteredData = carData.filter(
            (item) => item?.make === filters?.brand
          );
          const uniqueModels = [
            ...new Set(filteredData.map((item) => item.model)),
          ];
          setModels(uniqueModels);
          setLoading(false);
        } else {
          const response = await fetch(GET_ALL_CARS);
          const data = await response.json();
          dispatch(addCarList(data));
          const filteredData = data.filter(
            (item) => item?.make === filters?.brand
          );
          const uniqueModels = [
            ...new Set(filteredData.map((item) => item.model)),
          ];
          setModels(uniqueModels);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
        setLoading(false);
      }
    };
    fetchModels();
  }, [filters.brand, carData, dispatch]);

  const updateFilter = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
  
    const serializableFilters = Object.fromEntries(
      Object.entries(updatedFilters).map(([k, v]) => [
        k,
        v instanceof Date ? v.getFullYear() : v,
      ])
    );
  
    setFilters(updatedFilters);
  
    dispatch(
      applyFilter({
        ...filterData,
        page: 1,
        filter: serializableFilters,
      })
    );
  
    router.push(
      `/?page=1&&filter=${JSON.stringify(serializableFilters)}&sort=${filterData?.sortByData}&search=${filterData?.search}`
    );
  
    if (key === "brand") {
      setFilters((prev) => ({ ...prev, model: "" }));
    }
  };
  

  const clearAll = () => {
    const clearedFilters = {
      brand: "",
      model: "",
      priceMin: "",
      priceMax: "",
      year: null,
    };
    
    setFilters(clearedFilters);
    
    dispatch(applyFilter({ 
      ...filterData, 
      page: 1, 
      filter: clearedFilters 
    }));
    
    router.push(
      `/?page=1&&filter=${JSON.stringify(clearedFilters)}&sort=${filterData?.sortByData}&search=${filterData?.search}`
    );
  };

  const clearFilter = (key) => {
    updateFilter(key, key.includes("year") ? null : "");
  };

  const formatYear = (date) => (date ? date.getFullYear() : "");

  const toggleFilter = (filter) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const activeTags = [
    filters.brand && { key: "brand", label: filters.brand },
    filters.model && { key: "model", label: filters.model },
    (filters.priceMin || filters.priceMax) && {
      key: "priceRange",
      label: `Rs. ${filters.priceMin || "0"} - Rs. ${
        filters.priceMax || "Any"
      }`,
    },
    filters.year && {
      key: "yearRange",
      label: `${formatYear(filters.year) || "Any"}`,
    },
  ].filter(Boolean);

  const priceFilterCount = filters.priceMin || filters.priceMax ? 1 : 0;

  // Get slider values - ensure they're numbers and within range
  const getSliderValues = () => {
    const minVal = Number(filters.priceMin) || 0;
    const maxVal = Number(filters.priceMax) || 100000;
    return [Math.max(0, minVal), Math.min(100000, maxVal)];
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <select
          className="border rounded px-3 py-1 text-sm text-gray-700"
          value={filters.brand}
          onChange={(e) => updateFilter("brand", e.target.value)}
          disabled={loading}
        >
          <option value="">Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-1 text-sm text-gray-700"
          value={filters.model}
          onChange={(e) => updateFilter("model", e.target.value)}
          disabled={loading || !filters.brand}
        >
          <option value="">Model</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        {/* Price filter button */}
        <div className="relative inline-block">
          <button
            onClick={() => toggleFilter("price")}
            className="border rounded px-4 py-1 text-blue-700 font-medium flex items-center gap-2"
          >
            Price {priceFilterCount > 0 && `(${priceFilterCount})`}
            <span
              className={`transition-transform ${
                expandedFilters.price ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {/* Price filter dropdown */}
          {expandedFilters.price && (
            <div className="absolute z-10 top-full left-0 mt-1 bg-white p-4 rounded-md shadow border w-80">
              <div className="text-sm mb-2 font-medium flex justify-between items-center">
                <span className="text-gray-700">Price Range</span>
                <button
                  onClick={() => {
                    updateFilter("priceMin", "");
                    updateFilter("priceMax", "");
                  }}
                  className="text-blue-700 text-sm"
                >
                  Clear
                </button>
              </div>
              <div className="flex justify-between gap-2 items-center mb-3">
                <div className="relative flex-1">
                  <div className="border rounded-lg flex items-center h-10 overflow-hidden">
                    <span className="text-gray-500 px-2 flex-shrink-0">₹</span>
                    <input
                      type="number"
                      min={0}
                      max={100000}
                      className="w-full outline-none text-sm py-2 pr-2"
                      value={filters.priceMin}
                      onChange={(e) => {
                        const value = e.target.value === "" ? "" : Number(e.target.value);
                        updateFilter("priceMin", value);
                      }}
                      placeholder="Min"
                    />
                  </div>
                </div>
                <span className="mx-2 text-gray-500 flex-shrink-0">–</span>
                <div className="relative flex-1">
                  <div className="border rounded-lg flex items-center h-10 overflow-hidden">
                    <span className="text-gray-500 px-2 flex-shrink-0">₹</span>
                    <input
                      type="number"
                      min={0}
                      max={100000}
                      className="w-full outline-none text-sm py-2 pr-2"
                      value={filters.priceMax}
                      onChange={(e) => {
                        const value = e.target.value === "" ? "" : Number(e.target.value);
                        updateFilter("priceMax", value);
                      }}
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
              <ReactSlider
                className="horizontal-slider text-blue-700"
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                min={0}
                max={100000}
                value={getSliderValues()}
                onChange={([min, max]) => {
                  // Update both values simultaneously to prevent conflicts
                  setFilters(prev => ({
                    ...prev,
                    priceMin: min,
                    priceMax: max
                  }));
                }}
                onAfterChange={([min, max]) => {
                  // Dispatch to Redux after sliding is complete
                  const updatedFilters = { ...filters, priceMin: min, priceMax: max };
                  dispatch(applyFilter({ 
                    ...filterData, 
                    page: 1, 
                    filter: updatedFilters 
                  }));
                  
                  router.push(
                    `/?page=1&&filter=${JSON.stringify(updatedFilters)}&sort=${filterData?.sortByData}&search=${filterData?.search}`
                  );
                }}
                pearling
                minDistance={1000}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹1,00,000</span>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => toggleFilter("price")}
                  className="border border-blue-700 rounded py-2 px-4 text-blue-700 w-24 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => toggleFilter("price")}
                  className="bg-blue-600 rounded py-2 px-4 text-white w-24 text-sm"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Year calendar year picker */}
        <div>
          <DatePicker
            selected={filters.year}
            onChange={(date) => updateFilter("year", date)}
            showYearPicker
            dateFormat="yyyy"
            placeholderText="Year"
            className="border rounded px-2 py-1 w-24 text-sm"
          />
        </div>
      </div>

      {/* Active filter tags */}
      {activeTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          <button
            onClick={clearAll}
            className="px-2 py-1 bg-blue-100 rounded text-sm text-blue-700 font-medium hover:bg-blue-200"
          >
            Clear all
          </button>

          {activeTags.map((tag) => (
            <span
              key={tag.key}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium flex items-center gap-1"
            >
              {tag.label}
              <button
              className="cursor-pointer"
                onClick={() => {
                  if (tag.key === "priceRange") {
                    updateFilter("priceMin", "");
                    updateFilter("priceMax", "");
                  } else if (tag.key === "yearRange") {
                    updateFilter("year", null);
                  } else {
                    clearFilter(tag.key);
                  }
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}


      <style jsx global>{`
        .horizontal-slider {
          width: 100%;
          height: 24px;
          margin: 16px 0;
        }

        .slider-track {
          top: 8px;
          height: 4px;
          background: #e2e8f0;
          border-radius: 999px;
        }

        .slider-track.slider-track-0,
        .slider-track.slider-track-1 {
          background: #9f7aea;
        }

        .slider-thumb {
          cursor: pointer;
          background: white;
          border: 2px solid #9f7aea;
          border-radius: 50%;
          height: 20px;
          width: 20px;
          outline: none;
          top: 0;
        }

        .slider-thumb:hover {
          box-shadow: 0 0 0 3px rgba(159, 122, 234, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Filter;