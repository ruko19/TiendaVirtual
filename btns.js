const btnCart = document.querySelector('.nav__icon--cart');

const modalBox = document.querySelector('.modal__box');
const xModal = document.querySelector('.modal__box i');


btnCart.addEventListener('click', () => {
    modalBox.classList.add('modal__box--disable')
})



xModal.addEventListener('click', () => {
    modalBox.classList.remove('modal__box--disable')
})


// view cart btn
btnViewCart = document.querySelector('.view__btn');

btnViewCart.addEventListener('click', () => {

    window.location.href = './cart.html';
    preventDefault()
})