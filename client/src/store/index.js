import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import dcmt from '../../parser';
import { rafScheduler } from '../../utils/reduxMiddleware';

let enhancer = null;

if (process.env.NODE_ENV !== 'production') {
    enhancer = require('redux-devtools-extension').composeWithDevTools(
        applyMiddleware(rafScheduler)
    );
} else {
    enhancer = applyMiddleware(rafScheduler);
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
