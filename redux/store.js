import { createStore } from "redux";
import counterReducer from "./actions/counterReducer";

const store = createStore(counterReducer);

export default store;