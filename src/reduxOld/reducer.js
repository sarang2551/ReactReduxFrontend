import { updateListActionType } from "./actions";
const initialState = { productList: [] };
const reducer = (state, action) => {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case updateListActionType:
      const payload = action.payload;
      return {
        ...state,
        productList: [...payload]
      };
    default:
      return { ...state };
  }
};
export default reducer;
