import { combineReducers } from "redux";
import resultReducer from "./result/result.reducer";

import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  result: resultReducer,
});
export default rootReducer;
