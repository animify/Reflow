export const mouseEnter = id => ({
    type: 'ENTITY::MOUSEENTER',
    id
});

export const mouseLeave = id => ({
    type: 'ENTITY::MOUSELEAVE',
    id
});

export const mouseClick = id => ({
    type: 'ENTITY::CLICK',
    id
});

export const updateEntity = (id, payload) => ({
    type: 'ENTITY::UPDATE',
    id,
    payload
});

export const setEntities = payload => ({
    type: 'ENTITY::SET',
    payload
});
