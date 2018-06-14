export const PageRoutes = {
    EDITOR: '/editor',
};

export const newEntity = ({ _id, summary, details, status, category, by, votes, created, comments }) => ({
    type: 'NEW_ENTITY',
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
    type: 'MOUSEENTER_ENTITY',
    entity
});

export const mouseLeave = entity => ({
    type: 'MOUSELEAVE_ENTITY',
    entity
});

export const mouseClick = entity => ({
    type: 'CLICK_ENTITY',
    entity
});

export const repositionEntity = (entity, x, y) => ({
    type: 'REPOSITION_ENTITY',
    entity,
    position: {
        x, y
    }
});
