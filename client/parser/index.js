import sample from './sample.json';

export default {
    sample,
    initialState: {
        settings: sample.settings,
        timer: 0,
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
            boardsOrder: Object.keys(sample.pages)
        }
    }
};
