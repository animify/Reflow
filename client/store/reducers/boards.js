import produce from 'immer';

const boards = produce((draft, action) => {
    switch (action.type) {
        case 'BOARD::SWITCH':
            draft.currentPage = action.payload.id;
            break;
    }
});

export default boards;

