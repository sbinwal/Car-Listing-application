const { createSlice } = require("@reduxjs/toolkit");

const initialState = []

const CarListSlice = createSlice({
  name: "carList",
  initialState,
  reducers: {
    addCarList: (state, action) => {
      return action.payload;
    },
  },
});

export const { addCarList } = CarListSlice.actions;
export default CarListSlice.reducer;
