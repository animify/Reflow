import deepEqual from 'deep-equal';

export const filterCommonProperties = (arr, whitelist) => {
    const common = arr.reduce((props, obj) => {
        Object.entries(obj).forEach(([key, o]) => {
            if (whitelist[key]) {
                props[key] = o;
            }
        });

        return props;
    }, {});

    const different = arr.reduce((props, obj) => {
        Object.keys(common).forEach((p) => {
            if (!deepEqual(common[p], obj[p])) {
                delete common[p];
                props.push(p);
            }
        });

        return props;
    }, []);

    return {
        common,
        different,
    };
};