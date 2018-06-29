import produce from 'immer';

const settings = produce((draft, action) => {
    switch (action.type) {
        case 'SETTINGS::GRID_TOGGLE':
            draft.grid = [25, 25];
    }
}, {});

export default settings;
