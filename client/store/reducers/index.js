import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import undoable, { excludeAction } from 'redux-undo';
import entities from './entities';
import globalSettings from './globalSettings';

export default combineReducers({
    router: routerReducer,
    entities: undoable(entities, { filter: excludeAction(['ENTITY::MOUSEENTER', 'ENTITY::MOUSELEAVE', 'ENTITY::CLICK']) }),
    globalSettings,
});
