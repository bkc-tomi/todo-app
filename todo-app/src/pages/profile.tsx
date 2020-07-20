import React, { FC } from "react";
import { Button, makeStyles, createStyles } from "@material-ui/core";
import noImage from "../images/noimage.png";
import { userDataType } from "../types/usertype";

// @ts-ignore
import { connect } from "react-redux";

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
  user: any,
  userData: userDataType,
}> = ({
  user, userData
}) => {
  const classes = useStyles();

  if (!user) {
    return (
      <div className={ classes.container }>
        no one signed in. please sign in or up first.
      </div>
    );
  }

  return (
    <div className={ classes.container }>
      <ul className={ classes.list }>
        <li>{ userData.username }</li>
        <li>{ userData.age }</li>
        <li><img width="220" height="220" src={ userData.photoURL || noImage } alt="profile"/></li>
      </ul>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);