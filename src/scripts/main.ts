const modal: HTMLElement = document.getElementById('modal')!;
const modalButton: HTMLButtonElement = document.getElementById('modalButton') as HTMLButtonElement;
const closeModal: HTMLElement = document.getElementById('closeModal')!;
let page = 1
let isLoading = false;

modalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event: MouseEvent) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

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

const loadMoreData = async (): Promise<void> => {
  try {
      if (isLoading) return;
      isLoading = true; 

      const response: Response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
      const data: { id: number, title: string, body: string }[] = await response.json();

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

document.addEventListener('DOMContentLoaded', () => {
  loadMoreData();
});
