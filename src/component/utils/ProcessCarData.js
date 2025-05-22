export const processCarData = (data, filters, sort, search) => {
    let filteredData = [...data];
  
    // Search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.make.toLowerCase().includes(searchLower) ||
        item.model.toLowerCase().includes(searchLower) ||
        item.year.toString().includes(searchLower)
      );
    }
  
    // Filters
    if (filters && typeof filters === 'object') {
      const {
        brand = '',
        model = '',
        priceMin = '',
        priceMax = '',
        year = null,
      } = filters;
  
      if (brand) {
        filteredData = filteredData.filter(
          (item) => item.make.toLowerCase() === brand.toLowerCase()
        );
      }
  
      if (model) {
        filteredData = filteredData.filter(
          (item) => item.model.toLowerCase() === model.toLowerCase()
        );
      }
  
      if (priceMin) {
        filteredData = filteredData.filter((item) => item.price >= Number(priceMin));
      }
  
      if (priceMax) {
        filteredData = filteredData.filter((item) => item.price <= Number(priceMax));
      }
  
      if (year) {
        filteredData = filteredData.filter((item) => item.year === Number(year));
      }
    }
  
    // Sort
    switch (sort) {
      case 'price_asc':
        filteredData.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredData.sort((a, b) => b.price - a.price);
        break;
      case 'mileage_asc':
        filteredData.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'mileage_desc':
        filteredData.sort((a, b) => b.mileage - a.mileage);
        break;
      case 'year_asc':
        filteredData.sort((a, b) => a.year - b.year);
        break;
      case 'year_desc':
        filteredData.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }
  
    return filteredData;
  };
  