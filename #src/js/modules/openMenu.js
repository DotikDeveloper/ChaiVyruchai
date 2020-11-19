
function openMenu() {
    const btnMenuAdmin = document.querySelector('[data-button=menu-admin]'),
        sidebar = document.querySelector('.adm__sidebar');
        console.log(sidebar, btnMenuAdmin);
        

    btnMenuAdmin.addEventListener('click', () => {
        console.log('message');
        if (sidebar.style.width == '0' || sidebar.style.left == '-450px') {
            sidebar.style.left = '0'; 
            sidebar.style.width = '370px'; 
            sidebar.style.display = 'flex'; 
        } else {
            sidebar.style.left = '-450px'; 
            sidebar.style.width = '0';  
            sidebar.style.display = 'none';
        } 
    });
}

export default openMenu;