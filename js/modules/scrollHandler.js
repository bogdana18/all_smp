import { loadMoreData } from './contentLoader.js';
export const initScrollHandler = () => {
    window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
            loadMoreData();
        }
    });
    window.addEventListener('scroll', () => {
        const contentSection = document.getElementById('content');
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
            const newContent = document.createElement('p');
            newContent.textContent = 'More content loaded...';
            contentSection.appendChild(newContent);
        }
    });
};
