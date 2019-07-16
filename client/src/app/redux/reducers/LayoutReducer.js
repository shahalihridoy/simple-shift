import {
  SIDENAV_FULL,
  SIDENAV_CLOSE,
  SIDENAV_COMPACT,
  SIDENAV_MOBILE
} from "../actions/Types";

const initialState = {
  sidenav: "full"
};

const LayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIDENAV_FULL:
      return {
        sidenav: "full"
      };
    case SIDENAV_CLOSE:
      return {
        sidenav: "close"
      };
    case SIDENAV_COMPACT:
      return {
        sidenav: "compact"
      };
    case SIDENAV_MOBILE:
      return {
        sidenav: "mobile"
      };
    default:
      return { ...state };
  }
};

export default LayoutReducer;
