import { configureStore } from "@reduxjs/toolkit";
import defaultReducer from "./reducers";
export default configureStore({
  reducer: { productList: defaultReducer },
  preloadedState: { productList: [] }
});
