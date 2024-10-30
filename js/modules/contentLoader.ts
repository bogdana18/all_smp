import { Post } from '../types/types';

let page = 1;
let isLoading = false;

export const loadMoreData = async (): Promise<void> => {
  try {
    if (isLoading) return;
    isLoading = true;

    const response: Response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
    const data: Post[] = await response.json();

    const contentSection: HTMLElement = document.getElementById('content')!;
    data.forEach((post) => {
      const postElement: HTMLDivElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
      contentSection.appendChild(postElement);
    });

    page += 1;
    isLoading = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    isLoading = false;
  }
};
