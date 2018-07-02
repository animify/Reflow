import { combineReducers } from 'redux';
import undoable, { includeAction, groupByActionTypes } from 'redux-undo';
import docReducer from './docReducer';
import settingsReducer from './settingsReducer';
import canvasReducer from './canvasReducer';
import boardsReducer from './boardsReducer';
import timerReducer from './timerReducer';

export default combineReducers({
    canvas: canvasReducer,
    settings: settingsReducer,
    boards: boardsReducer,
    timer: timerReducer,
    doc: undoable(docReducer, { groupBy: groupByActionTypes('ENTITY::UPDATE'), filter: includeAction(['ENTITY::UPDATE', 'ENTITY::SET', 'DOCUMENT::DUPLICATE_SELECTED']) }),
});
