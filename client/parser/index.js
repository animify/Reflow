import sample from '../data/sample.json';

console.log(sample.pages[sample.currentPage].entities);

export default {
    title: sample.currentPage,
    settings: sample.settings,
    entities: sample.pages[sample.currentPage].entities
};
