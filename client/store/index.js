import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import History from '../modules/History';
import rootReducer from './reducers';

const middleware = routerMiddleware(History);
const enhancer = composeWithDevTools(
    applyMiddleware(middleware)
);

const store = createStore(
    rootReducer,
    enhancer
);

export default store;
