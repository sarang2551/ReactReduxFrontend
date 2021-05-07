import { combineReducers, createStore } from "redux";
import reducer from "./reducer";
/* import { sessionReducer, sessionService } from "redux-react-session"; */
const reducers = {
  reducer
  //session: sessionReducer
};
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer);
//sessionService.initSessionService(store);
export default store;
