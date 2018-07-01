export const getEntitiesOrder = state => state.doc.present.entitiesOrder;
export const getEntities = state => state.doc.present.entities;
export const getEntity = (state, props) => getEntities(state)[props.entityId];

export const getBoardsOrder = state => state.boards.boardsOrder;
export const getBoards = state => state.boards.all;
export const getBoard = (state, props) => getBoards(state)[props.boardId];

export const getCurrentTest = state => state.doc.present.currentTest;
export const getCurrentPage = state => state.doc.present.currentPage;
export const getHovering = state => state.doc.present.hovering;
export const getSelected = state => state.doc.present.selected;

export const getIsPresenting = state => state.canvas.presenting;
export const getScale = state => state.canvas.scale;
export const getTitle = state => state.canvas.title;
export const getMatrix = state => state.canvas.matrix;
