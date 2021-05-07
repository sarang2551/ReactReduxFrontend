export const updateListActionType = "updateProductList";
export const addProductActionType = "addProductItem";
export const addLoginSessionInfoActionType = "addLoginSession";
export const selectProductList = (state) => state.productList;
export const selectUserSessionDetails = (state) => state.userSession;
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
export const addLoginSession = (item) => ({
  type: addLoginSessionInfoActionType,
  payload: item
});
