import store from '..';
import { setEntities } from './entities';

export const switchBoard = (id, entities) => {
    store.dispatch(setEntities(entities));

    return {
        type: 'BOARD::SWITCH',
        payload: { id }
    };
};

export const duplicateBoard = (id, board) => {
    store.dispatch(setEntities(board.entities));

    return {
        type: 'BOARD::DUPLICATE',
        payload: { id, board }
    };
};
