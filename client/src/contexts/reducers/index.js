import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
  cart: cartReducer,
});
export default myReducers;
