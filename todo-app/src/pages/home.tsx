import React, { FC } from "react";
import Profile from "./profile";

const Home: FC = (props: any) => {
  // const [user, setUser] = useState(firebase.auth().currentUser);

  // const setUserdata = () => {
  //   if (user) {
  //     let docRef = db.collection("users").doc(user.uid);
  //     docRef.set({
  //       username: "tomiGoogle",
  //       age: 39,
  //       photoURL: user.photoURL || "",
  //     });
  //   } else {
  //     alert("no one signed in. please sign in or up first.");
  //   }
  // }
  return (
    <div>
      <h3>Home</h3>
      <Profile />
    </div>
  );
}

export default Home;