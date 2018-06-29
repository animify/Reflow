import { Map, fromJS } from 'immutable';

const canvas = (state = Map({ scale: 1, matrix: fromJS(document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix()) }), action) => {
    switch (action.type) {
        case 'CANVAS::PAN':
            state.matrix = action.payload.matrix;
            break;
        case 'CANVAS::ZOOM':
            state.scale = action.payload.scale;
            state.matrix = action.payload.matrix;
            break;
        case 'CANVAS::SET_PRESENTING':
            state.presenting = action.payload;
            break;
        default:
            return state;
    }
};

export default canvas;
