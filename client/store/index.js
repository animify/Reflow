import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import History from '../modules/History';
import rootReducer from './reducers';
import dcmt from '../parser';

console.log(dcmt);

const middleware = routerMiddleware(History);
let enhancer = null;

if (process.env.NODE_ENV !== 'production') {
    enhancer = composeWithDevTools(
        applyMiddleware(middleware)
    );
} else {
    enhancer = applyMiddleware(middleware);
}

if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update');
    whyDidYouUpdate(React);
}


const store = createStore(
    rootReducer,
    dcmt,
    enhancer
);

export default store;
