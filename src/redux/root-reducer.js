import { combineReducers } from "redux";

import userReducer from "./user/reducer";
import cartReducer from "./cart/reducer";
import zipCodeReducer from "./zipcode/reducer";

const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  zipCodeReducer,
});

export default rootReducer;
