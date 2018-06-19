import produce from 'immer';

const title = produce((draft, action) => {
    switch (action.type) {
        case 'TITLE::RENAME':
            draft = action.payload;
            break;
    }
}, null);

export default title;

