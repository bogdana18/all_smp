import { loadMoreData } from './contentLoader';

export const initScrollHandler = (): void => {
  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      loadMoreData();
    }
  });

  window.addEventListener('scroll', () => {
    const contentSection: HTMLElement = document.getElementById('content')!;
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      const newContent: HTMLParagraphElement = document.createElement('p');
      newContent.textContent = 'More content loaded...';
      contentSection.appendChild(newContent);
    }
  });
};
