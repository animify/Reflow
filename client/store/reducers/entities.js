import j from '../../parser';

console.log(j.entities);
function updateObject(entities, entity, change) {
    const newEntity = {
        ...entities[`${entity.type}${entity.id}`],
        ...change
    };

    return {
        ...entities,
        [`${entity.type}${entity.id}`]: newEntity
    };
}
// function updateObjectInArray(array, en) {
//     return array.map((entity) => {
//         if (entity.id !== en.id) {
//             return entity;
//         }

//         return {
//             ...entity,
//             ...en
//         };
//     });
// }

// [{
//     id: '1',
//     x: 20,
//     y: 30,
//     w: 375,
//     h: 667,
//     type: 'screen',
//     selected: false,
//     hovering: false,
//     image: 'https://i.imgur.com/SGCMxJN.jpg'
// }]

const entities = (state = j.entities, action) => {
    switch (action.type) {
        case 'MOUSEENTER_ENTITY':
            return updateObject(state, action.entity, { hovering: true });

        case 'MOUSELEAVE_ENTITY':
            return updateObject(state, action.entity, { hovering: false });

        case 'CLICK_ENTITY':
            return updateObject(state, action.entity, { hovering: false, selected: true });

        case 'REPOSITION_ENTITY':
            return updateObject(state, action.entity, { position: action.position });

        default:
            return state;
    }
};

export default entities;

