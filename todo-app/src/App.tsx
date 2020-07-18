import React from 'react';
// @ts-ignore
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import TodoList from "./pages/todolist";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/signup" component={ SignUp } />
          <Route exact path="/signin" component={ SignIn } />
          <Route exact path="/todo" component={ TodoList } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;