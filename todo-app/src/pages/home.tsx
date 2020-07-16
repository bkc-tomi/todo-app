import React, { FC, useState } from "react";
import firebase, { db } from "../firebase";
import { Button } from "@material-ui/core";

const Home: FC = (props: any) => {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const logout = () => {
    firebase.auth().signOut()
    .then(() => {
      setUser(null);
      props.history.push("/");
    })
    .catch( error => {
      console.log(error);
    })
  }

  const setUserdata = () => {
    if (user) {
      let docRef = db.collection("users").doc(user.uid);
      docRef.set({
        username: "tomiGoogle",
        age: 39,
        photoURL: user.photoURL || "",
      });
    } else {
      alert("no one signed in. please sign in or up first.");
    }
  }

  const HomeComponent = () => {
    if (user) {
      const userData = db.collection("users").doc(user.uid).get()
      .then(result => {
        console.log(result.data());
        const getData = result.data();
        return getData;
      })
      .catch(error => {
        return error;
      });
      console.log(userData);
      return (
        <div>
          <ul>
          </ul>
          <Button
            onClick={ logout }
            color="primary"
            variant="contained"
          >ログアウト</Button>
        </div>
      );
    } else {
      return (
        <div>
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
  }

  return (
    <div>
      <h3>Home</h3>
      <HomeComponent />
    </div>
  );
}

export default Home;