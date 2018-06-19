export const PageRoutes = {
    EDITOR: '/editor',
};

export const newEntity = ({ _id, summary, details, status, category, by, votes, created, comments }) => ({
    type: 'ENTITY::NEW',
    _id,
    summary,
    status,
    category,
    details,
    by,
    votes,
    created,
    comments,
});

export const mouseEnter = entity => ({
    type: 'ENTITY::MOUSEENTER',
    entity
});

export const mouseLeave = entity => ({
    type: 'ENTITY::MOUSELEAVE',
    entity
});

export const mouseClick = entity => ({
    type: 'ENTITY::CLICK',
    entity
});

export const repositionEntity = (entity, x, y) => ({
    type: 'ENTITY::REPOSITION',
    entity,
    position: {
        x, y
    }
});
