import { userType, userDataType } from "../types/usertype";
import { userActionType, userDataActionType } from "../types/userActionType";

const initUser:userType = {
  user: null,
  logedIn: false,
};
export const userReducer = (state:userType = initUser, action: userActionType) => {
  switch (action.type) {
    case "LOGIN":
      const loginTempUser = {...state};
      loginTempUser.user = action.user;
      loginTempUser.logedIn = true
      return loginTempUser;
    case "LOGOUT":
      const logoutTempUser: userType = {
        user: null,
        logedIn: false,
      }
      return logoutTempUser;
    default:
      return state;
  }
}

const initUserData: userDataType = {
  username: "no data",
  age: "no data",
  photoURL: "",
}
export const userDataReducer = (state:userDataType = initUserData, action: userDataActionType) => {
  switch (action.type) {
    case "D_LOGIN":
      return action.userData;
    case "D_LOGOUT":
      return initUserData;
    default:
      return state;
  }
}