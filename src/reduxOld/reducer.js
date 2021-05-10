import {
  updateListActionType,
  addProductActionType,
  displayMessageActionType
} from "./actions";
const initialState = {
  productList: [],
  messageObj: { type: "", message: "", show: false }
};
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
    case displayMessageActionType:
      return {
        ...state,
        messageObj: {
          message: payload.message,
          type: payload.type,
          show: payload.show
        }
      };

    default:
      return { ...state };
  }
};
export default reducer;
