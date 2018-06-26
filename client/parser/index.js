import sample from '../data/sample.json';

console.log(sample);
console.log(Object.keys(sample.pages[sample.currentPage].entities));

export default {
    sample,
    initialState: {
        settings: sample.settings,
        doc: {
            currentPage: sample.currentPage,
            entitiesOrder: Object.keys(sample.pages[sample.currentPage].entities),
            entities: sample.pages[sample.currentPage].entities,
            selected: [],
            hovering: null
        },
        boards: {
            all: sample.pages,
            byId: Object.keys(sample.pages)
        }
    }
};
