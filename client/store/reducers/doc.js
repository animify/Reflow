import produce from 'immer';
import cuid from 'cuid';

const doc = produce((draft, action) => {
    switch (action.type) {
        case 'ENTITY::SET':
            console.log('Setting entities:', action.payload);

            draft.hovering = null;
            draft.selected.length = 0;
            draft.currentPage = action.payload.currentPage;
            draft.entitiesOrder = action.payload.entitiesOrder;
            draft.entities = action.payload.entities;
            break;

        case 'ENTITY::TOGGLE_SELECT':
            const indexSelected = draft.selected.findIndex(s => s === action.payload.id);

            if (action.payload.replace && indexSelected === -1) {
                draft.selected.length = 0;
                draft.selected.push(action.payload.id);
            } else {
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

        case 'DOCUMENT::SELECT_ALL':
            draft.selected.length = 0;
            draft.selected = draft.selected.concat(draft.entitiesOrder);
            break;

        case 'DOCUMENT::DESELECT_ALL':
            draft.selected.length = 0;
            break;

        case 'DOCUMENT::DUPLICATE_SELECTED':
            const newIds = draft.selected.map((entityId) => {
                const shortId = cuid();
                const newId = `${draft.entities[entityId].type}${shortId}`;
                draft.entities[newId] = {
                    ...draft.entities[entityId],
                    id: shortId,
                    position: {
                        x: draft.entities[entityId].position.x + 50,
                        y: draft.entities[entityId].position.y + 50,
                    }
                };

                return newId;
            });

            draft.hovering = null;
            draft.selected = newIds;
            draft.entitiesOrder = [...draft.entitiesOrder, ...newIds];
            break;

        case 'ENTITY::UPDATE':
            // console.log('Updating with payload:', action.payload);

            draft.entities[action.id] = {
                ...draft.entities[action.id],
                ...action.payload
            };
            break;
    }
});

export default doc;

