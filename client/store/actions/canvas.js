export const pan = (x, y) => ({
    type: 'CANVAS::PAN',
    payload: { x, y }
});

export const zoom = (x, y, scale) => ({
    type: 'CANVAS::ZOOM',
    payload: { x, y, scale }
});
