import { initModal } from './modules/modal.js';
import { initScrollHandler } from './modules/scrollHandler.js';
import { loadMoreData } from './modules/contentLoader.js';
document.addEventListener('DOMContentLoaded', () => {
    initModal();
    initScrollHandler();
    loadMoreData();
});
