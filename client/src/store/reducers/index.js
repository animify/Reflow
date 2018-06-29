import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import undoable, { includeAction } from 'redux-undo';
import doc from './docReducer';
import settingsReducer from './settingsReducer';
import canvasReducer from './canvasReducer';
import boardsReducer from './boardsReducer';

export default combineReducers({
    router: routerReducer,
    canvas: canvasReducer,
    settings: settingsReducer,
    boards: boardsReducer,
    doc: undoable(doc, { debug: false, filter: includeAction(['ENTITY::UPDATE', 'ENTITY::SET', 'DOCUMENT::DUPLICATE_SELECTED']) }),
});
