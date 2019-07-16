import { SET_USER } from "./Types";

export const setUser = (data) => dispatch => {
    console.log(data);

    dispatch({
        type: SET_USER,
        data: data
    });
};
