import { userDataType } from "../types/usertype";
import { userActionType, userDataActionType } from "../types/userActionType";

const initUser: firebase.User | null = null;
export const userReducer = (state:any = initUser, action: userActionType) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return null;
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