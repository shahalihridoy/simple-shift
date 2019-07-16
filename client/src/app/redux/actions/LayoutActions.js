import {
  SIDENAV_FULL,
  SIDENAV_CLOSE,
  SIDENAV_COMPACT,
  SIDENAV_MOBILE
} from "./Types";

export const fullSidenav = () => dispatch => {
  dispatch({
    type: SIDENAV_FULL
  });
};
export const closeSidenav = () => dispatch => {
  dispatch({
    type: SIDENAV_CLOSE
  });
};
export const compactSidenav = () => dispatch => {
  dispatch({
    type: SIDENAV_COMPACT
  });
};
export const mobileSidenav = () => dispatch => {
  dispatch({
    type: SIDENAV_MOBILE
  });
};
