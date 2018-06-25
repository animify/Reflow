import produce from 'immer';

const canvas = produce((draft, action) => {
    switch (action.type) {
        case 'CANVAS::PAN':
            draft.matrix = action.payload.matrix;
            break;
        case 'CANVAS::ZOOM':
            draft.scale = action.payload.scale;
            draft.matrix = action.payload.matrix;
            break;
        case 'CANVAS::SET_PRESENTING':
            draft.presenting = action.payload;
            break;
    }
}, {
        matrix: document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix(),
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        scale: 1,
        presenting: false,
        title: 'Untitled'
    });

export default canvas;
