export type userType = {
  user: firebase.User | null,
  logedIn: boolean,
}

export type userDataType = {
  username: string,
  age: string | number,
  photoURL: string,
}