import produce from 'immer';

const entities = produce((draft, action) => {
    switch (action.type) {
        case 'ENTITY::MOUSEENTER':
            draft[action.id].hovering = true;
            break;

        case 'ENTITY::MOUSELEAVE':
            draft[action.id].hovering = false;
            break;

        case 'ENTITY::CLICK':
            draft[action.id].hovering = false;
            draft[action.id].selected = true;
            break;

        case 'ENTITY::UPDATE':
            draft[action.id] = {
                ...draft[action.id],
                ...action.payload
            };
            break;
    }
});

export default entities;

