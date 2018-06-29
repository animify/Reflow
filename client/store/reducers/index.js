import { combineReducers } from 'redux-immutable';
import { Record } from 'immutable';
import undoable, { includeAction } from 'redux-undo';
import doc from './doc';
import settings from './settings';
import canvas from './canvas';
import parser from '../../parser';

const rec = Record({
    canvas: parser.get('canvas'),
    settings: parser.get('settings'),
    doc: parser.get('doc')
});
export default combineReducers({
    canvas,
    settings,
    doc: undoable(doc, { filter: includeAction(['ENTITY::UPDATE', 'ENTITY::SET']) }),
}, rec);
