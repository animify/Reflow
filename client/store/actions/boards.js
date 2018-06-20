import store from '..';
import { setEntities } from './entities';

export const switchBoard = (id, entities) => {
    store.dispatch(setEntities(entities));

    return {
        type: 'BOARD::SWITCH',
        payload: { id }
    }
};
