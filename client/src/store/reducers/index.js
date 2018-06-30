import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import doc from './docReducer';
import settingsReducer from './settingsReducer';
import canvasReducer from './canvasReducer';
import boardsReducer from './boardsReducer';

export default combineReducers({
    canvas: canvasReducer,
    settings: settingsReducer,
    boards: boardsReducer,
    doc: undoable(doc, { filter: includeAction(['ENTITY::UPDATE', 'ENTITY::SET', 'DOCUMENT::DUPLICATE_SELECTED']) }),
});
