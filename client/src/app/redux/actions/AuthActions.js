import { SET_USER } from "./Types";

export const setUser = data => dispatch => {
  dispatch({
    type: SET_USER,
    data: data
  });
};
