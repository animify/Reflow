export const pan = matrix => ({
    type: 'CANVAS::PAN',
    payload: { matrix }
});

export const zoom = (matrix, scale) => ({
    type: 'CANVAS::ZOOM',
    payload: {
        matrix,
        scale
    }
});

export const setPresenting = payload => ({
    type: 'CANVAS::SET_PRESENTING',
    payload
});
