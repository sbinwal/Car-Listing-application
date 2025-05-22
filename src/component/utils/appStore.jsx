import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from './Slice/FIlterSlice'
import CarListSlice from './Slice/CarListSlice'
const appStore = configureStore({
    reducer : {
        "filterSlice" : FilterSlice,
        "carSlice" : CarListSlice
    }
})

export default appStore

