import sample from './sample.json';

export default {
    sample,
    initialState: {
        settings: sample.settings,
        doc: {
            currentPage: sample.currentPage,
            entitiesOrder: Object.keys(sample.pages[sample.currentPage].entities),
            entities: sample.pages[sample.currentPage].entities,
            selected: [],
            hovering: null,
            currentTest: 0
        },
        boards: {
            all: sample.pages,
            byId: Object.keys(sample.pages)
        }
    }
};
