export const updateListActionType = "updateProductList";
export const selectProductList = (state) => state.productList;
export const updateProductList = (products) => ({
  type: updateListActionType,
  payload: products
});
