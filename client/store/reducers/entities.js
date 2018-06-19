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

const entities = (state = j.entities, action) => {
    switch (action.type) {
        case 'ENTITY::MOUSEENTER':
            console.log('entering');
            return updateObject(state, action.entity, { hovering: true });

        case 'ENTITY::MOUSELEAVE':
            return updateObject(state, action.entity, { hovering: false });

        case 'ENTITY::CLICK':
            return updateObject(state, action.entity, { hovering: false, selected: true });

        case 'ENTITY::REPOSITION':
            return updateObject(state, action.entity, { position: action.position });

        default:
            return state;
    }
};

export default entities;

