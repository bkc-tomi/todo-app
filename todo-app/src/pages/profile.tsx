import React, { FC, useState, useEffect } from "react";
import firebase, { db } from "../firebase";
import { Button } from "@material-ui/core";
import noImage from "../images/noimage.png";

type userDataType = {
  username: string,
  age: string | number,
  photoURL: string,
}

const Profile:FC = (props: any) => {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<userDataType>({
    username: "no data",
    age: "no data",
    photoURL: "",
  });
  const [ error, setError ] = useState(null);

  firebase.auth().onAuthStateChanged((signInUser) => {
    if (signInUser) {
      setUser(signInUser);
    }
  });

  const logout = () => {
    firebase.auth().signOut()
    .then(() => {
      props.history.push("/");
    })
    .catch( error => {
      setError(error);
    })
  }

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).get()
      .then(result => {
        setUserData(result.data() as userDataType);
      })
      .catch(error => {
        setError(error);
      });  
    }
  }, [ user, userData, error ]);

  if (!user) {
    return (
      <div>
        no one signed in. please sign in or up first.
        <Button
            href="/signin"
            color="primary"
            variant="contained"
          >サインイン</Button>
          <Button
            href="/signup"
            color="primary"
            variant="contained"
          >サインアップ</Button>
      </div>
    );
  }

  return (
    <div>
      <ul>
        <li>{ userData.username }</li>
        <li>{ userData.age }</li>
        <li><img width="200" height="200" src={ userData.photoURL || noImage } alt="profile"/></li>
      </ul>
      <p>{ error }</p>
      <Button
          href="/todo"
          color="primary"
          variant="contained"
        >todo</Button>
      <Button
          onClick={ logout }
          color="primary"
          variant="contained"
        >ログアウト</Button>
    </div>
  );
}

export default Profile;