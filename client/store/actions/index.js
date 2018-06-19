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

export const mouseEnter = id => ({
    type: 'ENTITY::MOUSEENTER',
    id
});

export const mouseLeave = id => ({
    type: 'ENTITY::MOUSELEAVE',
    id
});

export const mouseClick = id => ({
    type: 'ENTITY::CLICK',
    id
});

export const updateEntity = (id, payload) => ({
    type: 'ENTITY::UPDATE',
    id,
    payload
});
