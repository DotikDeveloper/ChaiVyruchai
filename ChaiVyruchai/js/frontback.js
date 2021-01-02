document.addEventListener('DOMContentLoaded', () => {
    const file_attach = document.getElementById('userPhoto'); // файл
    const settings = document.getElementById('settings'); // форма

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

    // обработчик события 'change' (происходит после выбора файла)
    file_attach.addEventListener('change', () => {
        uploadFile(file_attach.files[0]);
    });

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
