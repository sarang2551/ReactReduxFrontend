import { updateListActionType, addProductActionType } from "./actions";
const initialState = { productList: [] };
const reducer = (state, action) => {
  if (!state) {
    state = initialState;
  }
  const payload = action.payload;
  switch (action.type) {
    case updateListActionType:
      return {
        ...state,
        productList: [...payload]
      };
    case addProductActionType:
      return { ...state, productList: [...state.productList, payload] };
    default:
      return { ...state };
  }
};
export default reducer;
