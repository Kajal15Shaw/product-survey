import React from 'react';
/*  // 1) Import ReactDOM library
import ReactDOM from "react-dom/client";

import App from './components/App';
 
// 2) Import App component as usual
import App from './components/App';
 
// 3) Get a reference to the div with ID root
const el = document.getElementById("root");
 
// 4) Tell React to take control of that element
const root = ReactDOM.createRoot(el);
 
// 5) Show the component on the screen
root.render(<App />, document.querySelector('#root'));
*/

import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// development only axios helpers
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
<Provider store={store}><App /></Provider>, 
document.querySelector('#root')
);

console.log('stripe key:', process.env.REACT_APP_STRIPE_KEY);
console.log('environment:', process.env.NODE_ENV);