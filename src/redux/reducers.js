import { createSlice } from "@reduxjs/toolkit";

export const defaultReducer = createSlice({
  name: "default",
  initialState: { productList: Array([]) },
  reducers: {
    addProduct: (state, action) => {
      return;
    },
    removeProduct: (state, action) => {
      return {
        productList: state.productList.filter(
          (product, index) => index !== action.payload
        )
      };
    },
    updateProductlist: (state, action) => {
      state = { productList: [...action.payload] };
      console.log(action, state);
    }
  }
});
const selectProductList = (state) => state.productList;
export { selectProductList };
export const {
  addProduct,
  removeProduct,
  updateProductlist
} = defaultReducer.actions;
export default defaultReducer.reducer;
