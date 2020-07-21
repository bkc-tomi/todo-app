import React, { FC, useEffect } from "react";
import firebase, { db } from "../firebase";
import { Button, makeStyles, createStyles } from "@material-ui/core";
import { userType, userDataType } from "../types/usertype";

// @ts-ignore
import { connect } from "react-redux";
import { login, logout, dLogin, dLogout } from "../actions/userAction";


const useStyles = makeStyles(() => createStyles({
  container: {
    width: "100vw",
    background: "gray",
    position: "fixed",
    top: "0",
    left: "0",
  },
  title: {
    fontSize: "1.5rem",
    margin: "5px",
    padding: "5px",
    color: "#fff",
    width: "50%",
  },
  btnBox: {
    position: "absolute",
    top: "0",
    right: "0",
  },
  btn: {
    margin: "5px",
    padding: "5",
    float: "left",
  },
  userPhoto: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    margin: "5px",
    float: "left",
  },
  uname: {
    display: "inline-box",
    float: "left",
    color: "#fff",
    marginRight: "10px",
  },
  titlelink: {
    textDecoration: "none",
  }
}));

const ToolBar:FC<{
  user: userType,
  userData: userDataType,
  login: Function,
  logout: Function,
  dLogin: Function,
  dLogout: Function,
}> = ({
  user, userData, login, logout, dLogin, dLogout,
}) => {
  const classes = useStyles();
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        login(user);
      }
    });
  }, [ login ]);
  
  useEffect(() => {
    if (user.user) {
      db.collection("users").doc(user.user.uid).get()
      .then(result => {
        if (result.data()) {
          dLogin(result.data());
        } else {
          if (user.user) {
            const tempUserData:userDataType = {...userData};
            tempUserData.username = user.user.displayName || "no name";
            tempUserData.photoURL = user.user.photoURL || "";
            dLogin(tempUserData);
            db.collection("users").doc(user.user.uid).set(tempUserData);
          }
        }
      })
    }
  }, [ user, dLogin ])

  const doLogout = () => {
    firebase.auth().signOut()
    .then(() => {
      logout();
      dLogout();
      window.location.href = "/";
    })
    .catch( error => {
      alert(error);
    })
  }

  if (!user.logedIn) {
    return (
      <div className={ classes.container }>
        <a className={ classes.titlelink } href="/">
          <h1 className={ classes.title }>
            ToDo App
          </h1>
        </a>
        <div className={ classes.btnBox }>
          <Button
            className={ classes.btn }
            href="/signin"
            color="primary"
            variant="contained"
          >サインイン</Button>
          <Button
            className={ classes.btn }
            href="/signup"
            color="primary"
            variant="contained"
          >サインアップ</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={ classes.container }>
      <a className={ classes.titlelink } href="/">
        <h1 className={ classes.title }>
          ToDo App
        </h1>
      </a>
      <div className={ classes.btnBox }>
        <img className={ classes.userPhoto } src={ userData.photoURL } alt="user"/>
        <p className={ classes.uname }>{ userData.username }</p> 
        <Button
          className={ classes.btn }
          onClick={ doLogout }
          color="primary"
          variant="contained"
        >サインアウト</Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    userData: state.userData,
  };
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (user: firebase.User) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    dLogin: (userData: userDataType) => dispatch(dLogin(userData)),
    dLogout: () => dispatch(dLogout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);