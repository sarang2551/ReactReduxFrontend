import { combineReducers, createStore } from "redux";
import reducer from "./reducer";
//import { sessionService, sessionReducer } from "redux-react-session";

const reducers = {
  reducer
  //session: sessionReducer
};
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer);
//sessionService.initSessionService(store);
export default store;
