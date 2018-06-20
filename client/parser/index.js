import sample from '../data/sample.json';

console.log(sample);

export default {
    settings: sample.settings,
    entities: sample.pages[sample.currentPage].entities,
    boards: {
        currentPage: sample.currentPage,
        list: sample.pages
    }
};
