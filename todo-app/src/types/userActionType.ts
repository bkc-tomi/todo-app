import { userDataType } from "./usertype";

export type userActionType = {
  type: "LOGIN",
  user: firebase.User,
} | {
  type: "LOGOUT"
}

export type userDataActionType = {
  type: "D_LOGIN",
  userData: userDataType
} | {
  type: "D_LOGOUT",
}