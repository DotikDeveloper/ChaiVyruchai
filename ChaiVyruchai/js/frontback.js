document.addEventListener('DOMContentLoaded', () => {
    const file_attach = document.getElementById('userPhoto'); // файл
    const settings = document.getElementById('settings'); // форма админ настройки
    const org_add = document.getElementById('org_add_with_user'); // форма добавление организации
    // const waiters = document.querySelector("button[data-btnmenu=waiters]");
    const waiters = document.querySelector(".moderation-requests__list"); // кнопка официанты
    const btn_yes = document.querySelector(".moderation-requests__item--yes"); // модерация, кнопка да
    const btn_no = document.querySelector(".moderation-requests__item--no"); // модерация, кнопка нет

    if (waiters) {
        load_moderations();
    }

    settings.onsubmit = async (e) => {
        e.preventDefault();

        let response = await fetch('/', {
          method: 'POST',
          body: new FormData(settings)
        });

        let result = await response.json();
        settings.reset();
        if (result.answer == 'ok') {
            let formData = new FormData();
            formData.append('get_data_user', '');

            fetch('/', { method: 'POST', body: formData })
            .then(function (response) {
            return response.json()
            })
            .then(function (data) {
            console.log(data['first_name']);
            document.querySelector(".login__info--user-name").textContent = data['first_name'];
            });
        }

    };

    org_add.onsubmit = async (e) => {
        e.preventDefault();
        let response = await fetch('/organizations', {
          method: 'POST',
          body: new FormData(org_add)
        });
        console.log(response);

        let result = await response.json();
            console.log(result);

        if (result.answer == 'ok') {
            org_add.reset();
        }

    };

        // обработчик события 'change' (происходит после выбора файла)
    file_attach.addEventListener('change', () => {
        uploadFile(file_attach.files[0]);
    });


    // btn_yes.addEventListener('click', () => {

    //     alert('Кнопка нажата');
    // });

    waiters.addEventListener('click', (e) => {
        if (e.target.classList.contains('moderation-requests__item--yes')) {
            // alert(e.target);
        }
        if (e.target.getAttribute('data-req') == "yes") {
            e.target.closest('li').style.backgroundColor = 'rgba(111, 149, 145, 0.25)';
            e.target.closest('li').style.border = '5px solid rgba(111, 149, 145, 0.25)';
            e.target.closest('li').style.padding = '0';

            let formData = new FormData();
            formData.append('moderate_ok', e.target.closest('li').getAttribute('user_id'));
            fetch('/users', { method: 'POST', body: formData })
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                console.log(data)
            });
            setTimeout(() => e.target.closest('li').remove(), 1000);
        }
        if (e.target.getAttribute('data-req') == "no") {
            e.target.closest('li').style.backgroundColor = 'rgba(202, 88, 62, 0.25)';
            e.target.closest('li').style.border = '5px solid rgba(202, 88, 62, 0.25)';
            e.target.closest('li').style.padding = '0';

            let formData = new FormData();
            formData.append('moderate_failure', e.target.closest('li').getAttribute('user_id'));
            fetch('/users', { method: 'POST', body: formData })
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                console.log(data)
            });
            setTimeout(() => e.target.closest('li').remove(), 1000);
        }
    });


    function load_moderations() {
        let formData = new FormData();
        formData.append('load_moderations', '');
        fetch('/users', { method: 'POST', body: formData })
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        // console.log(data);

        data.forEach(element => {
            console.log(element)
            if (element['ava'] == '') {element['ava'] = 'img/admin/ava__adm1.jpeg'}
            waiters.insertAdjacentHTML('beforeend','<li class="moderation-requests__item" user_id="'+element['user_id']+'"><div class="moderation-requests__item--avatar"><img class="moderation-requests__item--avatar-img" src="'+element['ava']+'" alt="ava"></div><div class="moderation-requests__item-block-name"><div class="moderation-requests__item--first_name">'+element['first_name']+'</div><div class="moderation-requests__item--last_name">'+element['last_name']+'</div><div class="moderation-requests__item--org_name">'+element['organization']+'</div></div><div class="moderation-requests__item--role">Официант</div><div class="moderation-requests__item-block-btn"><button class="moderation-requests__item--yes" data-req="yes">да</button><button class="moderation-requests__item--no" data-req="no">нет</button></div></li>');

            // waiters.innerHTML += '<li class="moderation-requests__item"><div class="moderation-requests__item--avatar"><img class="moderation-requests__item--avatar-img" src="'+element['ava']+'" alt="ava"></div><div class="moderation-requests__item-block-name"><div class="moderation-requests__item--first_name">'+element['first_name']+'</div><div class="moderation-requests__item--last_name">'+element['last_name']+'</div><div class="moderation-requests__item--org_name">'+element['organization']+'</div></div><div class="moderation-requests__item--role">Официант</div><div class="moderation-requests__item-block-btn"><button class="moderation-requests__item--yes" data-req="yes">да</button><button class="moderation-requests__item--no" data-req="no">нет</button></div></li>';
        });

        });
    }

    // Загрузка файла
    const uploadFile = (file) => {
        console.log(file.name);

        // проверка типа файла
        if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type)) {
            alert('Допустимы изображения png, gif, jpeg, svg');
            return;
        }

        // проверка размера изображения
        if (file.size > 2 * 1024 * 1024) {
            alert('Размер файла не должен превышать 2 мб');
            return;
        }

        const fData = new FormData();
        fData.append('file_attach', file_attach.files[0]); // добавляем файл в объект FormData()

        // Отправка на сервер
        postData('/', fData)
            .then(fetchResponse => {
                console.log('успешная отправка');

                // var url = '/';
                let formData = new FormData();
                formData.append('get_data_user', '');

                fetch('/', { method: 'POST', body: formData })
                .then(function (response) {
                return response.json()
                })
                .then(function (data) {

                console.log(data['ava']);
                document.querySelector(".login__avatar--img").removeAttribute("src");
                document.querySelector(".login__avatar--img").setAttribute("src", data['ava'] + "?" + Math.random());
                // document.querySelector(".login__avatar--img").src = data['ava'];


                });


            })
            .catch(() =>  console.log('отправка не удалась'));


    };

    // отправляем `POST` запрос
    const postData = async (url, fData) => { // имеет асинхронные операции
        console.log('в процессе'); // в процессе

        // ждём ответ, только тогда наш код пойдёт дальше
        let fetchResponse = await fetch(url, {
            method: 'POST',
            body: fData
        });

        // ждём окончания операции
        return await fetchResponse.text();
    };

});
