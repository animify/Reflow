import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import undoable, { includeAction } from 'redux-undo';
import doc from './doc';
import settings from './settings';
import canvas from './canvas';
import boards from './boards';

export default combineReducers({
    router: routerReducer,
    canvas,
    settings,
    boards,
    doc: undoable(doc, { debug: false, filter: includeAction(['ENTITY::UPDATE', 'ENTITY::SET']) }),
});
