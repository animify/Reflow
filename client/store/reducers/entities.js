import produce from 'immer';

const entities = produce((draft, action) => {
    switch (action.type) {
        case 'ENTITY::MOUSEENTER':
            draft.list[action.id].hovering = true;
            break;

        case 'ENTITY::MOUSELEAVE':
            draft.list[action.id].hovering = false;
            break;

        case 'ENTITY::CLICK':
            draft.list[action.id].hovering = false;
            draft.list[action.id].selected = true;
            break;

        case 'ENTITY::UPDATE':
            console.log('Updating with payload:', action.payload);

            draft.list[action.id] = {
                ...draft.list[action.id],
                ...action.payload
            };
            break;

        case 'ENTITY::SET':
            draft.order = action.payload.order;
            draft.list = action.payload.list;
            break;
    }
});

export default entities;

