import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers } from "redux";
// @ts-ignore
import { Provider } from "react-redux";
import { userReducer, userDataReducer } from "./reducers/userReducer";
import { todosReducer, indexReducer } from "./reducers/todoReducer";

const reducers = combineReducers({
  user: userReducer,
  userData: userDataReducer,
  todos: todosReducer,
  index: indexReducer,
});

const store = createStore(reducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
