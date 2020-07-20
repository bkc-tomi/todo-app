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
  list: {
    listStyle: "none",
  },
  btn: {
    width: "100%",
    margin: "10px auto",
  }
}));

const SignUp: FC = (props: any) => {
  const classes = useStyles();
  const [loading, setLoad] = useState(false);

  const handleSignUp = (value: value) => {
    setLoad(true);
    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
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
      <h3>新規登録</h3>
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
                新規登録
              </Button>
            </Form>
          )
        }
      </Formik>
      <p>他のプロバイダでサインインする</p>
      <Button
        className={ classes.btn }
        color="primary"
        variant="contained"
        onClick={ signInWithGoogle }
      >log in with Google</Button>
      <br />
      <Button 
        className={ classes.btn }
        color="primary"
        variant="contained"
        onClick={ signInWithTwitter }
      >log in with Twitter</Button>
    </div>
  );
}

export default SignUp;