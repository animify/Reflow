const globalSettings = (state = {
    grid: null
}, action) => {
    switch (action.type) {
        case 'GRID_TOGGLE':
            return state;

        default:
            return state;
    }
};

export default globalSettings;
