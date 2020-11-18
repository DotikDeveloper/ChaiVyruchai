
function openMenu() {
    const btnMenuAdmin = document.querySelector('[data-input=login]'),
        sidebar = document.querySelector('.adm__sidebar');

    btnMenuAdmin.addEventListener('click', () => {
        if (sidebar.style.width == '0' || sidebar.style.left == '-450px') {
            sidebar.style.left = '0'; 
            sidebar.style.width = '370px';  
        } else {
            sidebar.style.left = '-450px'; 
            sidebar.style.width = '0';  
        } 
    });
}

export default openMenu;