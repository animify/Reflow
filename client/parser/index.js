import sample from '../data/sample.json';

console.log(Object.keys(sample.pages[sample.currentPage].entities));

export default {
    settings: sample.settings,
    entities: {
        order: Object.keys(sample.pages[sample.currentPage].entities),
        list: sample.pages[sample.currentPage].entities,
    },
    boards: {
        currentPage: sample.currentPage,
        list: sample.pages
    }
};
