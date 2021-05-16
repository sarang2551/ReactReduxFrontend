import {
  updateListActionType,
  addProductActionType,
  displayMessageActionType,
  editProductActionType
} from "./actions";
const initialState = {
  productList: [],
  messageObj: { type: "", message: "", show: false }
};
const reducer = (state, action) => {
  if (!state) {
    state = initialState;
  }
  var payload = action.payload;
  switch (action.type) {
    case updateListActionType:
      return {
        ...state,
        productList: [...payload]
      };
    case addProductActionType:
      const productImage = payload.image || "";
      payload = { ...payload, image: [productImage] };
      return { ...state, productList: [...state.productList, payload] };
    case editProductActionType:
      if (payload.index === undefined || payload.index === null) {
        throw new Error(
          `Unable to edit product as product index was not found!`
        );
      }
      const edittedDocument = state.productList[payload.index];
      if (payload.image) {
        edittedDocument.image.push(payload.image);
        console.log("After pushing");
        console.log(edittedDocument);
        delete payload.image;
        console.log("After image field deletion");
        console.log(payload);
      }

      state.productList[payload.index] = { ...edittedDocument, ...payload };

      return state;
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
