export const updateInverval = interval => ({
    type: 'TIMER::INTERVAL',
    payload: {
        interval
    },
});