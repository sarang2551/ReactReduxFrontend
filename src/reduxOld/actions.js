export const updateListActionType = "updateProductList";
export const addProductActionType = "addProductItem";
export const selectProductList = (state) => state.productList;
export const updateProductList = (products) => {
  return {
    type: updateListActionType,
    payload: products
  };
};
export const addProduct = (item) => ({
  type: addProductActionType,
  payload: item
});
