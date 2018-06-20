import produce from 'immer';

const canvas = produce((draft, action) => {
    switch (action.type) {
        case 'CANVAS::PAN':
            draft.matrix = draft.matrix.translate(action.payload.x, action.payload.y);
            break;
        case 'CANVAS::ZOOM':
            draft.scale *= action.payload.scale;
            draft.matrix = draft.matrix.translate((1 - action.payload.scale) * action.payload.x, (1 - action.payload.scale) * action.payload.y).scale(action.payload.scale);
            break;
    }
}, {
        matrix: document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix(),
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        scale: 1
    });

export default canvas;
