import store from '..';
import { setEntities } from './entities';

export const switchBoard = (id, entities) => {
    const payload = {
        list: entities,
        order: Object.keys(entities)
    };
    store.dispatch(setEntities(payload));
    console.log('switching board');
    return {
        type: 'BOARD::SWITCH',
        payload: { id }
    };
};

export const duplicateBoard = (id, board) =>
    ({
        type: 'BOARD::DUPLICATE',
        payload: { id, board }
    })
    ;
