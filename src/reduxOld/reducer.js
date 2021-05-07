import {
  updateListActionType,
  addProductActionType,
  addLoginSessionInfoActionType,
  deleteLoginSessionActionType
} from "./actions";
const initialState = {
  productList: [],
  userSession: { username: "", auth: false, userType: "default" }
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
    case addLoginSessionInfoActionType:
      return {
        ...state,
        userSession: {
          ...state.userSession,
          username: payload.username,
          auth: payload.auth
        }
      };
    case deleteLoginSessionActionType:
      return {
        ...state,
        userSession: {
          ...state.userSession,
          username: payload.username,
          auth: payload.auth
        }
      };
    default:
      return { ...state };
  }
};
export default reducer;
