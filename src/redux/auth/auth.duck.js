export const LOGIN = "@@/TTT/LOGIN";
export const LOGOUT = "@@/TTT/LOGOUT";

export const AuthReducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN:
      return state.concat([action.text]);
    case LOGOUT:
      return state.concat([action.text]);
    default:
      return state;
  }
};
