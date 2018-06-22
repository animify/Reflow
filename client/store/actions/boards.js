export const duplicateBoard = (id, board) =>
    ({
        type: 'BOARD::DUPLICATE',
        payload: { id, board }
    })
    ;
