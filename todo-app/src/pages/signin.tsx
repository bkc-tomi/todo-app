import React, { FC, useState } from "react";
import firebase, { twitterProvider, googleProvider } from "../firebase";

import { Formik, Form, Field } from "formik";
import { Button, makeStyles, createStyles } from "@material-ui/core";
import { TextField } from "formik-material-ui";
// @ts-ignore
import * as Yup from "yup";

type value = {
  email: string,
  password: string,
}

const useStyles = makeStyles(() => createStyles({
  container: {
    position: "relative",
    top: "50px",
    width: "300px",
    margin: "5px auto",
  },
  text: {
    width: "100%",
  },
  btn: {
    width: "100%",
    margin: "10px auto",
  }
}));

const SignIn: FC = (props: any) => {
  const classes = useStyles();
  const [loading, setLoad] = useState(false);

  const handleSignUp = (value: value) => {
    setLoad(true);
    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    .then(response => {
      console.log(response);
      setLoad(false);
      props.history.push("/");
    })
    .catch(error => {
      alert(error);
      setLoad(false);
    });
  }

  const signInWithGoogle = () => {
    setLoad(true);
    firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
      console.log(result);
      setLoad(false);
      props.history.push("/");
    })
    .catch(error => {
      alert(error);
      setLoad(false);
    });
  }

  const signInWithTwitter = () => {
    setLoad(true);
    firebase.auth().signInWithPopup(twitterProvider)
    .then(result => {
      console.log(result);
      setLoad(false);
      props.history.push("/");
    })
    .catch(error => {
      alert(error);
      setLoad(false);
    });
  }

  return (
    <div className={ classes.container }>
      <h3>サインイン</h3>
      <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={ (values: value) => handleSignUp(values) }
        validationSchema={ Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        }) }
      >
        {
          ({handleSubmit, handleChange, handleBlur, values, errors, touched}) => (
            <Form
              onSubmit={ handleSubmit }
            >
              <Field 
                component={ TextField }
                name="email"
                type="email"
                label="email"
                value={ values.email }
                onChange={ handleChange }
                onBlur={ handleBlur }
                invalid={ touched.email && errors.email ? true : false }
              />
              <br />
              <Field 
                component={ TextField }
                name="password"
                type="password"
                label="password"
                value={ values.password }
                onChange={ handleChange }
                onBlur={ handleBlur }
                invalid={ touched.password && errors.password ? true : false }
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={ loading }
                className={ classes.btn }
              >
                サインイン
              </Button>
            </Form>
          )
        }
      </Formik>
      <p>他のプロバイダでサインインする</p>
      <Button 
        color="primary"
        variant="contained"
        onClick={ signInWithGoogle }
        className={ classes.btn }
      >log in with Google</Button>
      <br />
      <Button 
        color="primary"
        variant="contained"
        onClick={ signInWithTwitter }
        className={ classes.btn }
      >log in with Twitter</Button>
    </div>
  );
}

export default SignIn;