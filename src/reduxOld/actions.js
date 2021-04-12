export const updateListActionType = "updateProductList";
export const selectProductList = (state) => state.productList;
export const updateProductList = (products) => {
  return {
    type: updateListActionType,
    payload: products
  };
};
