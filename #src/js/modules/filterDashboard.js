function filterDashboard() {
    const filterBtn = document.querySelectorAll('.dashboard__filter-btn');

    filterBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {            
            if (e.target.parentNode.nextElementSibling.classList.contains('hide')) {
                e.target.parentNode.nextElementSibling.classList.remove('hide');
            } else {
                e.target.parentNode.nextElementSibling.classList.add('hide');
            }
        });
    });
    
}

export default filterDashboard;