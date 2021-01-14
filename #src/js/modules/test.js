function test() {
    console.log(' проверка кнопок: ');
    let btn = document.querySelectorAll('button[data-btnMenu]');
    let key;
    btn.forEach(item => {        
        item.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-btnMenu')) {
                key = e.target.getAttribute('data-btnMenu');
                console.log('кнопка ', key);
            } else {
                key = e.target.parentNode.dataset.btnmenu;
                console.log('не кнопка ', key);
            }
        });
    });
}

export default test;