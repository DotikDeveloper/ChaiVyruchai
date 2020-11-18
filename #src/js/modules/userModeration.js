function userModeration(selector) {

    const reqUser = document.querySelectorAll(selector);

    reqUser.forEach((user) => {
        user.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-req') == "yes") {
                user.style.backgroundColor = 'rgba(111, 149, 145, 0.25)';
                user.style.border = '5px solid rgba(111, 149, 145, 0.25)';
                user.style.padding = '0';
            }
            if (e.target.getAttribute('data-req') == "no") {
                user.style.backgroundColor = 'rgba(202, 88, 62, 0.25)';
                user.style.border = '5px solid rgba(202, 88, 62, 0.25)';
                user.style.padding = '0';
            } else {
                console.log('не нажата кнопка модерации');
            }
        });
    });


}

export default userModeration;