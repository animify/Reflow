import React from 'react';
import { get, Map } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import dcmt from '../parser';
import { rafScheduler } from '../utils/reduxMiddleware';

let enhancer = null;

if (process.env.NODE_ENV !== 'production') {
    enhancer = composeWithDevTools(
        applyMiddleware(rafScheduler)
    );
} else {
    enhancer = applyMiddleware(rafScheduler);
}

if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update');
    whyDidYouUpdate(React);
}

console.log(dcmt.get('initialState'));
const store = createStore(
    rootReducer,
    dcmt.get('initialState'),
    enhancer
);

export default store;
