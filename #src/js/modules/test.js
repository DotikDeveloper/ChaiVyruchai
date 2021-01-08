function test() {
    console.log(' проверка кнопок: ');
    let btn = document.querySelectorAll('button[data-btnMenu]');
    btn.forEach(item => {
        let btnMenu = item.childNodes;
        btnMenu.forEach(btnMenuItem => {
            btnMenuItem.addEventListener('click', (e) => {
                console.log(e.target.parentNode.dataset.btnmenu);
                
            });
        });
    });

    // console.log(item);

}

export default test;