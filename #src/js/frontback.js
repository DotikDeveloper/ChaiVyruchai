document.addEventListener('DOMContentLoaded', () => {
    const file_attach = document.getElementById('userPhoto'), // файловое поле аватар
        logo_attach = document.getElementById('orgLogo'), // файловое поле лого
        settings = document.getElementById('settings'), // форма админ настройки
        org_add = document.getElementById('org_add_with_user'), // форма добавление организации
        check_code = document.getElementById('check_code'), // форма проверки кода смс
        waiters = document.querySelector(".moderation-requests__list"), // кнопка официанты
        phone_confirm = document.getElementById("phone_confirm"), // подтверждение телефона
        logoutBtn = document.querySelector("button[data-button=close-modal]"),
        messages = document.querySelector(".messages__list"),
        money_out = document.querySelector(".many-output__number"),
        form_message = document.getElementById('form_message'), // форма отправки сообщения
        form_chai = document.getElementById('form_chai'), // форма оплаты чаевых
        pay_out = document.getElementById('pay_out');

    if(pay_out){
        pay_out.onsubmit = async (e) => {
            e.preventDefault();

            let response = await fetch('/pay', {
                method: 'POST',
                body: new FormData(pay_out)
                });

                let link = await response.json();
                console.clear;
                console.log(link);
                // debugger;

            document.location.href = link;
        }
    }

    if (money_out){
        let query_data = new FormData();
        query_data.append('get_balance', '');
        (async () => {
        let response = await fetch('/pay', { method: 'POST', body: query_data });

            let answer = await response.json();
            money_out.innerHTML = answer;

        })();

    }

    if (form_chai){
        form_chai.onsubmit = async (e) => {
            e.preventDefault();

            let response = await fetch('/pay', {
                method: 'POST',
                body: new FormData(form_chai)
                });

                let link = await response.json();
                console.clear;
                console.log(link);

            document.location.href = link;
        }
    }

    if (waiters) {
        load_moderations();
    }

    if (messages) {
        load_messages();
    }

    if(settings){
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
    }


    if (check_code) {
        check_code.onsubmit = async (e) => {
            e.preventDefault();

            let response = await fetch('/users', {
            method: 'POST',
            body: new FormData(check_code)
            });

            let result = await response.json();
            console.log(result);

            //данный код позволяет получить и загрузить страницу html
            // let result = await response.text();
            // let w = window.open('about:blank','Подтверждение телефона');
            // w.document.body.innerHTML = result;

            check_code.reset();

            if (result.answer == false) {
                document.querySelector(".modal__description--danger").style = "opacity: 1";
                setTimeout(() => document.querySelector(".modal__description--danger").style = "opacity: 0", 3000);
            }
            if (result.answer == 'ok') {
                document.querySelector('.overlay').classList.add("hide");
            }

        };
    }


    if (form_message) {
        form_message.onsubmit = async (e) => {
            e.preventDefault();
            let response = await fetch('/', {
            method: 'POST',
            body: new FormData(form_message)
            });

            let result = await response.json();
            form_message.reset();
            messages.innerHTML = '';
            load_messages();

            // if (result.answer == 'ok') {
            //     let formData = new FormData();
            //     formData.append('get_data_user', '');

            //     fetch('/', { method: 'POST', body: formData })
            //     .then(function (response) {
            //     return response.json()
            //     })
            //     .then(function (data) {
            //     console.log(data['first_name']);
            //     document.querySelector(".login__info--user-name").textContent = data['first_name'];
            //     });
            // }

        };
    }


    if (org_add) {
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
    }

        // обработчик события 'change' (происходит после выбора файла)
    if(file_attach){
        file_attach.addEventListener('change', () => {
            uploadFile(file_attach.files[0]);
            console.log('Аватар загружен')
        });
    }


        if (logo_attach) {
        logo_attach.addEventListener('change', () => {
            uploadLogo(logo_attach.files[0]);
            console.log('Логотип загружен')
        });
    }

    // btn_yes.addEventListener('click', () => {

    //     alert('Кнопка нажата');
    // });

    if (waiters){
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
    }

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

    if (messages){
        messages.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-yes')) {
                // alert(e.target);
            }
            if (e.target.getAttribute('data-req') == "yes") {
                e.target.closest('li').style.backgroundColor = 'rgba(111, 149, 145, 0.25)';
                e.target.closest('li').style.border = '5px solid rgba(111, 149, 145, 0.25)';
                e.target.closest('li').style.padding = '0';

                let formData = new FormData();
                formData.append('message_ok', e.target.closest('li').getAttribute('message_id'));
                fetch('/', { method: 'POST', body: formData })
                .then(function (response) {
                return response.json();
                })
                .then(function (data) {
                    console.log(data)
                });
                setTimeout(() => e.target.closest('li').remove(), 1000);
            }

        });
    }

    function load_messages() {
        let formData = new FormData();
        formData.append('load_messages', '');
        fetch('/', { method: 'POST', body: formData })
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {

        data.forEach(element => {
            console.log(element)
            if (element['ava'] == '') {element['ava'] = 'img/admin/ava__adm1.jpeg'}

            messages.insertAdjacentHTML('beforeend','<li class="messages__item" message_id="'+element['message_id']+'"><div class="messages__user"><div class="messages__user--avatar"><img class="messages__user--avatar-img" src="'+element['ava']+'" alt="ava"></div><div class="messages__user--first_name">'+element['first_name']+'</div><div class="messages__user--last_name">'+element['last_name']+'</div><div class="messages__user--org_name">'+element['organization']+'</div><div class="messages__user--role">Официант</div></div><div class="messages__text">'+element['message']+' '+'<span class="messages__date">'+element['date']+'</span></div><div class="messages__status"><!-- <button class="messages__btn btn-no">в работе</button> --><button class="messages__btn btn-yes" data-req="yes">выполнено</button></div></li>');


        });

        });
    }

    // Загрузка аватарки
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

    // Загрузка логотипа
    const uploadLogo = (file) => {
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
        fData.append('logo_attach', logo_attach.files[0]); // добавляем файл в объект FormData()

        // Отправка на сервер
        postData('/', fData)
            .then(fetchResponse => {
                console.log('успешная отправка');

                let formData = new FormData();
                formData.append('get_data_org', '');

                fetch('/', { method: 'POST', body: formData })
                .then(function (response) {
                return response.json()
                })
                .then(function (data) {

                console.log(data['logo']);
                document.querySelector(".login__logo--img").removeAttribute("src");
                document.querySelector(".login__logo--img").setAttribute("src", data['logo'] + "?" + Math.random());
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

    //показать модальное окно
    if (phone_confirm){
        phone_confirm.addEventListener("click", async (e) => {
            const modalPage = document.querySelector('.overlay');
            modalPage.classList.remove("hide");
            let formData = new FormData();
            formData.append('check_phone', '');

            let response = await fetch('/users', {
                method: 'POST',
                body: formData
                });

            let result = await response.json();
            // if (result.answer == 'ok'){

            // }

        });
    }


    //скрыть модальное окно
    if(logoutBtn){
        logoutBtn.addEventListener("click", () => {
            const modalPage = document.querySelector('.overlay'),
            inputModal = document.querySelectorAll("input");
            modalPage.classList.add("hide");
            inputModal.forEach((i) => {
                if (true) {
                    i.value = '';
                }
            });
        });
    }


});
