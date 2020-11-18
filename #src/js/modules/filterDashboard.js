function filterDashboard() {
    const filterBtn = document.querySelectorAll('.dashboard__filter-btn');

    filterBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            
            if (e.target.parentElement.parentElement.nextElementSibling.classList.contains('hide')) {
                e.target.parentElement.parentElement.nextElementSibling.classList.remove('hide');
            } else {
                e.target.parentElement.parentElement.nextElementSibling.classList.add('hide');
            }
        });
    });
    
}

export default filterDashboard;