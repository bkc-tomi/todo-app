import React, { FC } from "react";
import { Button, makeStyles, createStyles } from "@material-ui/core";
import noImage from "../images/noimage.png";
import { userType, userDataType } from "../types/usertype";


// @ts-ignore
import { connect } from "react-redux";
import { dLogin } from "../actions/userAction";

const useStyles = makeStyles(() => createStyles({
  container: {
    position: "relative",
    top: "50px",
    width: "300px",
    margin: "5px auto",
  },
  list: {
    listStyle: "none",
  },
  btn: {
    width: "100%",
  }
}));

const Profile:FC<{
  user: userType,
  userData: userDataType,
  dLogin: Function,
}> = ({
  user, userData
}) => {
  const classes = useStyles();

  if (!user.logedIn) {
    return (
      <div className={ classes.container }>
        no one signed in. please sign in or up first.
      </div>
    );
  }

  return (
    <div className={ classes.container }>
      <p>{ userData.username }</p>
      <p>{ userData.age }</p>
      <img width="220" height="220" src={ userData.photoURL || noImage } alt="profile"/>
      <Button
        className={ classes.btn }
        href="/todo"
        color="primary"
        variant="contained"
      >todo</Button>
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
    dLogin: (userData: userDataType) => dispatch(dLogin(userData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);