import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

const reducer = combineReducers({
    todo: todoSlice,
});

const store = configureStore({
    reducer,
});

export default store;
