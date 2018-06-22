import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import History from '../modules/History';
import rootReducer from './reducers';
import dcmt from '../parser';

console.log(dcmt);

const middleware = routerMiddleware(History);
const enhancer = composeWithDevTools(
    applyMiddleware(middleware)
);

const store = createStore(
    enableBatching(rootReducer),
    dcmt,
    enhancer
);

export default store;
