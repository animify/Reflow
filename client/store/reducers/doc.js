import produce from 'immer';

const doc = produce((draft, action) => {
    switch (action.type) {
        case 'ENTITY::MOUSEENTER':
            draft.entities[action.id].hovering = true;
            break;

        case 'ENTITY::MOUSELEAVE':
            draft.entities[action.id].hovering = false;
            break;

        case 'ENTITY::MOUSEDOWN':
            draft.entities[action.id].selected = true;
            break;

        case 'ENTITY::SET':
            draft.currentPage = action.payload.currentPage;
            draft.entitiesOrder = action.payload.entitiesOrder;
            draft.entities = action.payload.entities;
            break;

        case 'DOCUMENT::DESELECT_ALL':
            draft.entitiesOrder.forEach(id => (draft.entities[id].selected = false));
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

