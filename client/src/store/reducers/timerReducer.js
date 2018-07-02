const timer = (state = 0, action) => {
    switch (action.type) {
        case 'TIMER::INTERVAL':
            state = action.payload.interval;
            return state;
        default:
            return state;
    }
};

export default timer;
