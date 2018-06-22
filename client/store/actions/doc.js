export const mouseEnter = id => ({
    type: 'ENTITY::MOUSEENTER',
    id
});

export const mouseLeave = id => ({
    type: 'ENTITY::MOUSELEAVE',
    id
});

export const mouseDown = id => ({
    type: 'ENTITY::MOUSEDOWN',
    id
});

export const updateEntity = (id, payload) => ({
    type: 'ENTITY::UPDATE',
    id,
    payload
});

export const switchBoard = payload => ({
    type: 'BOARD::SWITCH',
    payload
});

export const setEntities = (currentPage, entities) => ({
    type: 'ENTITY::SET',
    payload: {
        currentPage,
        entities,
        entitiesOrder: Object.keys(entities)
    }
});
