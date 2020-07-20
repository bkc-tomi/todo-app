import { userDataType } from "../types/usertype";
import { userActionType, userDataActionType } from "../types/userActionType";

export const login = (user: any):userActionType => {
  return { type: "LOGIN", user };
}
export const logout = ():userActionType => {
  return { type: "LOGOUT" };
}

export const dLogin = (userData: userDataType): userDataActionType => {
  return { type: "D_LOGIN", userData };
}
export const dLogout = (): userDataActionType => {
  return { type: "D_LOGOUT" };
}