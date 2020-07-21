import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware } from "redux";
// @ts-ignore
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { userReducer, userDataReducer } from "./reducers/userReducer";
import { todosReducer, indexReducer } from "./reducers/todoReducer";


const reducers = combineReducers({
  user: userReducer,
  userData: userDataReducer,
  todos: todosReducer,
  index: indexReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
