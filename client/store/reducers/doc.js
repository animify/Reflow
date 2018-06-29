import produce from 'immer';
import cuid from 'cuid';
import parser from '../../parser';

const doc = (state, action) => {
    switch (action.type) {
        // case 'ENTITY::SET':
        //     draft.hovering = null;
        //     draft.selected.length = 0;
        //     draft.currentPage = action.payload.currentPage;
        //     draft.entities = action.payload.entities;
        //     draft.entitiesOrder.length = 0;
        //     draft.entitiesOrder = Object.keys(action.payload.entities);
        //     break;

        // case 'ENTITY::TOGGLE_SELECT':
        //     const indexSelected = draft.selected.findIndex(s => s === action.payload.id);

        //     if (action.payload.replace && indexSelected === -1) {
        //         draft.selected.length = 0;
        //         draft.selected.push(action.payload.id);
        //     } else {
        //         if (action.payload.select && indexSelected === -1) {
        //             draft.selected.push(action.payload.id);
        //         }

        //         if (!action.payload.select && indexSelected > -1) {
        //             draft.selected.splice(indexSelected, 1);
        //         }
        //     }

        //     break;

        case 'DOCUMENT::SELECT_ALL':
            state.selected.length = 0;
            state.selected = state.selected.concat(state.entitiesOrder);
            break;

        // case 'DOCUMENT::DESELECT_ALL':
        //     draft.selected.length = 0;
        //     break;

        // case 'DOCUMENT::DUPLICATE_SELECTED':
        //     const selIds = [...draft.selected];
        //     draft.selected.length = 0;
        //     selIds.forEach((entityId, i) => {
        //         const en = draft.entities[entityId];
        //         const shortId = `${en.id}${i}`;
        //         const newId = `${en.type}${shortId}`;
        //         draft.entities[newId] = {
        //             ...en,
        //             id: shortId,
        //             position: {
        //                 x: en.position.x + 75,
        //                 y: en.position.y + 75,
        //             }
        //         };
        //         draft.selected.push(newId);
        //         draft.entitiesOrder.push(newId);
        //     });
        //     break;

        // case 'ENTITY::UPDATE':
        //     // console.log('Updating with payload:', action.payload);

        //     draft.entities[action.id] = {
        //         ...draft.entities[action.id],
        //         ...action.payload
        //     };
        //     break;

        default:
            return state;
    }
};

export default doc;

