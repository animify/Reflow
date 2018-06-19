import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import undoable, { excludeAction } from 'redux-undo';
import entities from './entities';
import settings from './settings';
import title from './title';

export default combineReducers({
    router: routerReducer,
    entities: undoable(entities, { filter: excludeAction(['ENTITY::MOUSEENTER', 'ENTITY::MOUSELEAVE', 'ENTITY::CLICK']) }),
    title,
    settings,
});
