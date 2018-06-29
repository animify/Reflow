import store from "..";
import parser from "../../../parser";

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

export const selectAllEntities = () => ({
    type: 'DOCUMENT::SELECT_ALL'
});

export const duplicateSelected = () => ({
    type: 'DOCUMENT::DUPLICATE_SELECTED'
});

export const setEntities = (boardId, entities) => ({
    type: 'ENTITY::SET',
    payload: {
        boardId,
        entities
    },
});

export const nextBoard = () => {
    const boards = store.getState().boards;
    const { entities: currentEntities, currentPage } = store.getState().doc.present;
    const nextIndex = boards.byId.findIndex(b => b === currentPage) + 1;
    const nextBoardId = nextIndex >= boards.byId.length ? boards.byId[0] : boards.byId[nextIndex];
    const nb = boards.all[nextBoardId];

    parser.sample.pages[currentPage].entities = currentEntities;

    return {
        type: 'ENTITY::SET',
        payload: {
            boardId: nextBoardId,
            entities: nb.entities
        },
    };
};

