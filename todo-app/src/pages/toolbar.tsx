import React, { FC, useEffect } from "react";
import firebase, { db } from "../firebase";
import { Button, makeStyles, createStyles } from "@material-ui/core";
import { userDataType } from "../types/usertype";

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
  }
}));

const ToolBar:FC<{
  user: firebase.User | null,
  userData: userDataType,
  login: Function,
  logout: Function,
  dLogin: Function,
  dLogout: Function,
}> = ({
  user, userData, login, logout, dLogin, dLogout
}) => {
  const classes = useStyles();
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(SignInUser => {
      login(SignInUser);
    });
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).get()
      .then(result => {
        dLogin(result.data() as userDataType);
      })
      .catch(error => {
        alert(error);
      });  
    }
  }, [ user ]);

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

  if (user) {
    return (
      <div className={ classes.container }>
        <a href="/">
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

  return (
    <div className={ classes.container }>
      <a href="/">
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

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    userData: state.userData,
  };
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (user: any) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    dLogin: (userData: userDataType) => dispatch(dLogin(userData)),
    dLogout: () => dispatch(dLogout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);