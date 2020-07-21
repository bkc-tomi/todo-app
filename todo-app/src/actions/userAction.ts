import { userDataType } from "../types/usertype";
import { userActionType, userDataActionType } from "../types/userActionType";
import firebase, { db } from "../firebase";

export const login = (user: any):userActionType => {
  return { type: "LOGIN", user };
}

export const logout = ():userActionType => {
  return { type: "LOGOUT" };
}

export const dLogin = (userData: userDataType): userDataActionType => {
  return { type: "D_LOGIN", userData };
}
export const dLoginFB = (user: firebase.User) => (dispatch: any) => {
  db.collection("users").doc(user.uid).get()
  .then(result => {
    const data = result.data() as userDataType;
    dispatch({type: "D_LOGIN", data});
  })
}
export const dLogout = (): userDataActionType => {
  return { type: "D_LOGOUT" };
}