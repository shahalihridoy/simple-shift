import { SET_USER } from "../actions/Types";

const initialState = {};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.data };
    default:
      return { ...state };
  }
};

export default AuthReducer;
