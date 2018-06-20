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
