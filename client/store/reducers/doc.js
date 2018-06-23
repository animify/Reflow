import produce from 'immer';

const doc = produce((draft, action) => {
    switch (action.type) {
        case 'ENTITY::SET':
            console.log('Setting entities:', action.payload);

            draft.currentPage = action.payload.currentPage;
            draft.entitiesOrder = action.payload.entitiesOrder;
            draft.entities = action.payload.entities;
            break;

        case 'ENTITY::TOGGLE_SELECT':
            console.log('toggling select');
            if (action.payload.replace) {
                draft.selected = [action.payload.id];
            } else {
                const indexSelected = draft.selected.findIndex(s => s === action.payload.id);

                if (action.payload.select && indexSelected === -1) {
                    draft.selected.push(action.payload.id);
                }

                if (!action.payload.select && indexSelected > -1) {
                    draft.selected.splice(indexSelected, 1);
                }
            }

            break;

        case 'ENTITY::TOGGLE_HOVER':
            draft.hovering = action.payload.hover ? action.payload.id : null;
            break;

        case 'DOCUMENT::DESELECT_ALL':
            draft.selected = [];
            break;

        case 'ENTITY::UPDATE':
            console.log('Updating with payload:', action.payload);

            draft.entities[action.id] = {
                ...draft.entities[action.id],
                ...action.payload
            };
            break;
    }
});

export default doc;

