import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import undoable, { excludeAction } from 'redux-undo';
import entities from './entities';
import settings from './settings';
import canvas from './canvas';
import boards from './boards';

export default combineReducers({
    router: routerReducer,
    canvas,
    boards: undoable(boards),
    settings,
    entities: undoable(entities, { filter: excludeAction(['ENTITY::MOUSEENTER', 'ENTITY::MOUSELEAVE', 'ENTITY::CLICK']) }),
});
