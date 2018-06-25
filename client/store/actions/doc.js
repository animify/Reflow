export const updateEntity = (id, payload) => ({
    type: 'ENTITY::UPDATE',
    id,
    payload
});

export const toggleSelectEntity = (id, select, replace) => ({
    type: 'ENTITY::TOGGLE_SELECT',
    payload: {
        id,
        select,
        replace
    }
});

export const toggleHoverEntity = (id, hover) => ({
    type: 'ENTITY::TOGGLE_HOVER',
    payload: {
        id,
        hover
    }
});

export const switchBoard = payload => ({
    type: 'BOARD::SWITCH',
    payload
});

export const deselectAllEntities = () => ({
    type: 'DOCUMENT::DESELECT_ALL'
});

export const duplicateSelected = () => ({
    type: 'DOCUMENT::DUPLICATE_SELECTED'
});

export const setEntities = (currentPage, entities) => ({
    type: 'ENTITY::SET',
    payload: {
        currentPage,
        entities,
        entitiesOrder: Object.keys(entities)
    }
});

