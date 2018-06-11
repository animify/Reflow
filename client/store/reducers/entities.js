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
    image: '//overflow.io/share_url/201803/b4b2a680-2bfc-11e8-b492-05a67ee800b1/assets/F0215A62-C66E-4E35-81B4-604B4CE66F1F_1521470970147.png?Expires=1528799005&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9vdmVyZmxvdy5pby9zaGFyZV91cmwvMjAxODAzL2I0YjJhNjgwLTJiZmMtMTFlOC1iNDkyLTA1YTY3ZWU4MDBiMS9hc3NldHMvRjAyMTVBNjItQzY2RS00RTM1LTgxQjQtNjA0QjRDRTY2RjFGXzE1MjE0NzA5NzAxNDcucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNTI4Nzk5MDA1fX19XX0_&Signature=CN5OXfYIoe6CUYwTcYiZlpHKxmL6ZiyXn6iQc3iGtiqXM2NJXCGfXh6offRDyR4xS94BpDC8ZUOGKNrgP~-DJFvoGAKcpxx8gJ7mMXbMwmLtJObqHWV5Fu7zLlsgPrvXR2x-wUUxSHzxP7HmAhFo-hob5WCUbMCYmJB1Ci0l5cB4fqLy8YGFDk2K8erMZMVe8Rw9Vl4arBkPdScvC0FNL8pynLTfcuU1-72rxzHGf8JFEQRh7V67-krOGOnrsDwmWr5k4kZXGn0-wK6TQ4eTYa6~ba8Y7Bqyye7K3HEUB6cCNezwvl2hfBUPwHQP-pzQ-7thyeMkyo8ezL5EOfwkjw__&Key-Pair-Id=APKAJ2ZIKR33IGSBYGFA'
}], action) => {
    switch (action.type) {
        case 'MOUSEENTER_ENTITY':
            return updateObjectInArray(state, { ...action.entity, hovering: true });

        case 'MOUSELEAVE_ENTITY':
            return updateObjectInArray(state, { ...action.entity, hovering: false });

        case 'CLICK_ENTITY':
            return updateObjectInArray(state, { ...action.entity, hovering: false, selected: true });

        default:
            return state;
    }
};

export default entities;

