import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import History from '../modules/History';
import rootReducer from './reducers';
import dcmt from '../parser';
import { rafScheduler } from '../utils/reduxMiddleware';

const middleware = routerMiddleware(History);
let enhancer = null;

if (process.env.NODE_ENV !== 'production') {
    enhancer = composeWithDevTools(
        applyMiddleware(middleware, rafScheduler)
    );
} else {
    enhancer = applyMiddleware(middleware, rafScheduler);
}

if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update');
    whyDidYouUpdate(React);
}


const store = createStore(
    rootReducer,
    dcmt.initialState,
    enhancer
);

export default store;
