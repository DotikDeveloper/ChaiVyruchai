function checkReviews() {
    const menCheckBox = document.querySelectorAll('input.comment__men--checkbox');
    menCheckBox.forEach(item => {
        item.addEventListener('click', (e) => {
            e.target.nextElementSibling.classList.toggle('hide');
            e.target.nextElementSibling.nextElementSibling.classList.toggle('color-secondary');  
        });
    });
}
export default checkReviews;