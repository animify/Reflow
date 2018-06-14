import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entities from './entities';
import globalSettings from './globalSettings';

export default combineReducers({
    router: routerReducer,
    entities,
    globalSettings,
});
