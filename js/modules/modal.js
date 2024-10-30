const modal = document.getElementById('modal');
const modalButton = document.getElementById('modalButton');
const closeModal = document.getElementById('closeModal');
export const initModal = () => {
    modalButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};
