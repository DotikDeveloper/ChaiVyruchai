function toggleMenu() {
    const btnMenu = document.querySelectorAll('[data-btnMenu]');
    const sidebar = document.querySelector('.adm__sidebar'); 

    btnMenu.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("нажали кнопку меню")
            if (sidebar.style.width == '0' || sidebar.style.left == '-450px') {
                sidebar.style.left = '0'; 
                sidebar.style.width = '370px'; 
                sidebar.style.display = 'flex'; 
            } else {
                sidebar.style.left = '-450px'; 
                sidebar.style.width = '0';  
                sidebar.style.display = 'none';
            }
        })  
    });
    
}

toggleMenu()


