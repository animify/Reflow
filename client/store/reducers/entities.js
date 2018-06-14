function updateObjectInArray(array, en) {
    return array.map((entity) => {
        if (entity.id !== en.id) {
            return entity;
        }

        return {
            ...entity,
            ...en
        };
    });
}

const entities = (state = [{
    id: '1',
    x: 20,
    y: 30,
    w: 375,
    h: 667,
    type: 'screen',
    selected: false,
    hovering: false,
    image: 'https://i.imgur.com/SGCMxJN.jpg'
}], action) => {
    switch (action.type) {
        case 'MOUSEENTER_ENTITY':
            return updateObjectInArray(state, { ...action.entity, hovering: true });

        case 'MOUSELEAVE_ENTITY':
            return updateObjectInArray(state, { ...action.entity, hovering: false });

        case 'CLICK_ENTITY':
            return updateObjectInArray(state, { ...action.entity, hovering: false, selected: true });

        case 'REPOSITION_ENTITY':
            return updateObjectInArray(state, { ...action.entity, x: action.x, y: action.y });

        default:
            return state;
    }
};

export default entities;

