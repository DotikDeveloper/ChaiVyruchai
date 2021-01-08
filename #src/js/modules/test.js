function test() {
    // console.log(' проверка кнопок: ');
    // let btn = document.querySelectorAll('button[data-btnMenu]');
    // btn.forEach(item => {
    //     let btnMenu = item.childNodes;
    //     btnMenu.forEach(btnMenuItem => {
    //         btnMenuItem.addEventListener('click', (e) => {
    //             console.log(e.target.parentNode.dataset.btnmenu);
                
    //         });
    //     });
    // });

    const btn = document.querySelectorAll('button.dashboard__filter-btn');
    btn.forEach(item => {
        let btnDashboardFilter = item.childNodes.parentNode.nextElementSibling;
        console.log(btnDashboardFilter);
        // btnDashboardFilter.forEach(btnItem => {
        //     btnItem.addEventListener('click', (e) => {
        //         console.log(e.target.parentNode.classList);                
        //     });
        // });
    });

}

export default test;