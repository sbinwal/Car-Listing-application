const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  filter: null,
  search: "",
  sortByData: "",
  page: 1,
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    applyFilter: (state, action) => {
      return action.payload;
    },
  },
  
});

export const { applyFilter } = FilterSlice.actions;
export default FilterSlice.reducer;
