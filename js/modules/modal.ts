const modal: HTMLElement = document.getElementById('modal')!;
const modalButton: HTMLButtonElement = document.getElementById('modalButton') as HTMLButtonElement;
const closeModal: HTMLElement = document.getElementById('closeModal')!;

export const initModal = (): void => {
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
};


