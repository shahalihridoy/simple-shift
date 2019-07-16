import { combineReducers } from "redux";
import AuthReducer from './AuthReducer';
import LayoutReducer from './LayoutReducer';

const RootReducer = combineReducers({
  layout: LayoutReducer,
  auth: AuthReducer
});

export default RootReducer;
