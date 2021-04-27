document.addEventListener("DOMContentLoaded", () => {
    const file_attach = document.getElementById("userPhoto"), // файловое поле аватар
        logo_attach = document.getElementById("orgLogo"), // файловое поле лого
        settings = document.getElementById("settings"), // форма админ настройки
        org_add = document.getElementById("org_add_with_user"), // форма добавление организации
        check_code = document.getElementById("check_code"), // форма проверки кода смс
        waiters = document.querySelector(".moderation-requests__list"), // кнопка официанты
        phone_confirm = document.getElementById("phone_confirm"), // подтверждение телефона
        logoutBtn = document.querySelector("button[data-button=close-modal]"),
        messages = document.querySelector(".messages__list"),
        money_out = document.querySelector(".many-output__number"),
        reviews__list = document.querySelector(".reviews__list"), //место вывода комментариев
        chart_waiter = document.getElementById("chart-waiter"), //место вывода чарта
        filter_rating = document.getElementById("filter_rating"),
        filter_stat = document.getElementById("filter_stat"),
        form_message = document.getElementById("form_message"), // форма отправки сообщения
        form_chai = document.getElementById("form_chai"), // форма оплаты чаевых
        pay_out = document.getElementById("pay_out"), // вывод средств
        card_enroll = document.getElementById("card_enroll"); // привязка карты
    Date.prototype.daysInMonth = function () {
        return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
    };
    function charts(data_in) {
        labels = [];
        data = [];
        for (const key in data_in) {
            labels.push(key.slice(5, 10));
            data.push(data_in[key]);
        }
        console.log("WWWWWWWWWWW", labels, data);
        // Общая статистика
        var ctx = document.getElementById("totalStats2").getContext("2d");
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: "line",

            // The data for our dataset
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Сборы за месяц",
                        backgroundColor: "rgba(111, 149, 145, 0.25)",
                        borderColor: " #ca583e",
                        data: data,
                    },
                ],
            },

            // Configuration options go here
            options: {},
        });
    }
    function back_date(ad) {
        return new Date(
            new Date(Date.now() + -ad * 24 * 3600 * 1000)
                .toUTCString()
                .toString()
                .split("GMT")[0] + " UTC"
        )
            .toISOString()
            .split(".")[0]
            .replace(/-/g, ".");
    }
    function curr_date(ad) {
        return new Date(
            new Date().toUTCString().toString().split("GMT")[0] + " UTC"
        )
            .toISOString()
            .split(".")[0]
            .replace(/-/g, ".");
    }

    const get_statement = (p = 30) => {
        let query_data = new FormData();
        query_data.append("get_statement", "");
        query_data.append("get_statement_start", back_date(p));
        query_data.append("get_statement_end", curr_date());
        (async () => {
            let response = await fetch("/pay", {
                method: "POST",
                body: query_data,
            });
            let answer = await response.json();
            let period = [];
            console.log(
                "%c answer xml%o",
                "background: #333; font-size: x-large; color: #f00",
                typeof answer.StatementRow
            );
            Array.isArray(answer.StatementRow) &&
                answer.StatementRow.map((v) => {
                    period.push({
                        date: v.date.slice(0, 10).replace(/-/g, "."),
                        amount: v.amount / 100,
                    });
                });

            period =
                typeof answer.StatementRow == "object" &&
                !Array.isArray(answer.StatementRow)
                    ? {
                        [answer.StatementRow.date
                            .slice(0, 10)
                            .replace(/-/g, ".")]:
                            answer.StatementRow.amount / 100,
                    }
                    : period;

            period =
                period.length > 1
                    ? period.reduce((acc, record) => {
                        const { date, amount } = record;
                        if (!acc[date]) acc[date] = 0;
                        acc[date] += amount;
                        return acc;
                    }, {})
                    : period;

            let inner = "";
            // chart_waiter.innerHTML = period

            let chart = [];
            for (let index = 0; index < p; index++) {
                chart[back_date(index).slice(0, 10)] = period[
                    back_date(index).slice(0, 10)
                ]
                    ? period[back_date(index).slice(0, 10)]
                    : 0;
                // chart[index] = back_date(index).slice(0,10)
            }

            console.log(
                "%c answer xml%o",
                "background: #333; font-size: x-large; color: #f00",
                answer.StatementRow,
                period,
                chart
            );

            charts(chart);
        })();
    };

    if (pay_out) {
        pay_out.onsubmit = async (e) => {
            e.preventDefault();

            let response = await fetch("/pay", {
                method: "POST",
                body: new FormData(pay_out),
            });

            let link = await response.json();
            console.clear;
            console.log("%cLINK%s", link, "color: pink");
            debugger;

            document.location.href = link;
        };
    }

    if (card_enroll) {
        card_enroll.onclick = async (e) => {
            e.preventDefault();

            let query_data = new FormData();
            query_data.append("card_enroll", "");
            let response = await fetch("/pay", {
                method: "POST",
                body: query_data,
            });

            let link = await response.json();
            // console.clear;
            // debugger;

            document.location.href = link;
        };
    }

    if (money_out) {
        let query_data = new FormData();
        query_data.append("get_balance", "");
        (async () => {
            let response = await fetch("/pay", {
                method: "POST",
                body: query_data,
            });
            let answer = await response.json();
            money_out.innerHTML = answer;
        })();
    }

    if (chart_waiter) {
        get_statement();
    }

    if (reviews__list) {
        let query_data = new FormData();
        query_data.append("get_reviews", "");
        (async () => {
            let response = await fetch("/pay", {
                method: "POST",
                body: query_data,
            });
            let answer = await response.json();
            let inner = "";
            answer.map((v) => {
                inner += '<li class="messages__item reviews__item">';
                inner += `<div class="reviews__volume">${v.rating}</div>`;
                inner += `<div class="reviews__cash"><span class="reviews__cash--number">${v.amount}</span> руб.</div>`;
                inner += '<div class="messages__text">';
                inner += `${v.comment}`;
                inner += '<span class="messages__date"> ';
                inner += `${v.date}`;
                inner += "</span>";
                inner += "</div>";
                inner += "</li>";
            });
            reviews__list.innerHTML = inner;
            // console.log(
            //     "%c reviews list%o",
            //     "background: #333; font-size: x-large; color: #f00",
            //     answer
            // );
            // console.log(
            //     "%c inner%s",
            //     "background: #333; font-size: x-large; color: #ff0",
            //     inner
            // );
        })();
    }

    if (filter_rating) {
        filter_rating.addEventListener("click", (e) => {
            if (
                e.target.getAttribute("target") === "1" ||
                e.target.getAttribute("target") === "2" ||
                e.target.getAttribute("target") === "3"
            ) {
                let query_data = new FormData();
                query_data.append(
                    "get_reviews",
                    e.target.getAttribute("target")
                );
                (async () => {
                    let response = await fetch("/pay", {
                        method: "POST",
                        body: query_data,
                    });
                    let answer = await response.json();
                    let inner = "";
                    answer.map((v) => {
                        inner += '<li class="messages__item reviews__item">';
                        inner += `<div class="reviews__volume">${v.rating}</div>`;
                        inner += `<div class="reviews__cash"><span class="reviews__cash--number">${v.amount}</span> руб.</div>`;
                        inner += '<div class="messages__text">';
                        inner += `${v.comment}`;
                        inner += '<span class="messages__date"> ';
                        inner += ` ${v.date}`;
                        inner += "</span>";
                        inner += "</div>";
                        inner += "</li>";
                    });
                    reviews__list.innerHTML = inner;
                    filter_rating.classList.add("hide");
                })();
            }
        });
    }

    if (filter_stat) {
        filter_stat.addEventListener("click", (e) => {
            switch (e.target.getAttribute("target")) {
                case "1":
                    get_statement(1);
                    filter_stat.classList.add("hide");
                    break;
                case "2":
                    get_statement(7);
                    filter_stat.classList.add("hide");
                    break;

                default:
                    get_statement();
                    filter_stat.classList.add("hide");
                    break;
            }
        });
    }

    if (form_chai) {
        form_chai.onsubmit = async (e) => {
            e.preventDefault();

            let response = await fetch("/pay", {
                method: "POST",
                body: new FormData(form_chai),
            });
            let link = await response.json();
            console.log(link);

            document.location.href = link;
        };
    }

    if (waiters) {
        load_moderations();
    }

    if (messages) {
        load_messages();
    }

    if (settings) {
        settings.onsubmit = async (e) => {
            e.preventDefault();

            let response = await fetch("/", {
                method: "POST",
                body: new FormData(settings),
            });

            let result = await response.json();
            settings.reset();
            if (result.answer == "ok") {
                let formData = new FormData();
                formData.append("get_data_user", "");

                fetch("/", { method: "POST", body: formData })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data["first_name"]);
                        document.querySelector(
                            ".login__info--user-name"
                        ).textContent = data["first_name"];
                    });
            }
        };
    }

    if (check_code) {
        check_code.onsubmit = async (e) => {
            e.preventDefault();

            let response = await fetch("/users", {
                method: "POST",
                body: new FormData(check_code),
            });

            let result = await response.json();
            console.log(result);

            //данный код позволяет получить и загрузить страницу html
            // let result = await response.text();
            // let w = window.open('about:blank','Подтверждение телефона');
            // w.document.body.innerHTML = result;

            check_code.reset();

            if (result.answer == false) {
                document.querySelector(".modal__description--danger").style =
                    "opacity: 1";
                setTimeout(
                    () =>
                        (document.querySelector(
                            ".modal__description--danger"
                        ).style = "opacity: 0"),
                    3000
                );
            }
            if (result.answer == "ok") {
                document.querySelector(".overlay").classList.add("hide");
            }
        };
    }

    if (form_message) {
        form_message.onsubmit = async (e) => {
            e.preventDefault();
            let response = await fetch("/", {
                method: "POST",
                body: new FormData(form_message),
            });

            let result = await response.json();
            form_message.reset();
            messages.innerHTML = "";
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
            let response = await fetch("/organizations", {
                method: "POST",
                body: new FormData(org_add),
            });
            console.log(response);

            let result = await response.json();
            console.log(result);

            if (result.answer == "ok") {
                org_add.reset();
            }
        };
    }

    // обработчик события 'change' (происходит после выбора файла)
    if (file_attach) {
        file_attach.addEventListener("change", () => {
            uploadFile(file_attach.files[0]);
            console.log("Аватар загружен");
        });
    }

    if (logo_attach) {
        logo_attach.addEventListener("change", () => {
            uploadLogo(logo_attach.files[0]);
            console.log("Логотип загружен");
        });
    }

    // btn_yes.addEventListener('click', () => {

    //     alert('Кнопка нажата');
    // });

    if (waiters) {
        waiters.addEventListener("click", (e) => {
            if (e.target.classList.contains("moderation-requests__item--yes")) {
                // alert(e.target);
            }
            if (e.target.getAttribute("data-req") == "yes") {
                e.target.closest("li").style.backgroundColor =
                    "rgba(111, 149, 145, 0.25)";
                e.target.closest("li").style.border =
                    "5px solid rgba(111, 149, 145, 0.25)";
                e.target.closest("li").style.padding = "0";

                let formData = new FormData();
                formData.append(
                    "moderate_ok",
                    e.target.closest("li").getAttribute("user_id")
                );
                fetch("/users", { method: "POST", body: formData })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                    });
                setTimeout(() => e.target.closest("li").remove(), 1000);
            }
            if (e.target.getAttribute("data-req") == "no") {
                e.target.closest("li").style.backgroundColor =
                    "rgba(202, 88, 62, 0.25)";
                e.target.closest("li").style.border =
                    "5px solid rgba(202, 88, 62, 0.25)";
                e.target.closest("li").style.padding = "0";

                let formData = new FormData();
                formData.append(
                    "moderate_failure",
                    e.target.closest("li").getAttribute("user_id")
                );
                fetch("/users", { method: "POST", body: formData })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                    });
                setTimeout(() => e.target.closest("li").remove(), 1000);
            }
        });
    }

    function load_moderations() {
        let formData = new FormData();
        formData.append("load_moderations", "");
        fetch("/users", { method: "POST", body: formData })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);

                data.forEach((element) => {
                    console.log(element);
                    if (element["ava"] == "") {
                        element["ava"] = "img/admin/ava__adm1.jpeg";
                    }
                    waiters.insertAdjacentHTML(
                        "beforeend",
                        '<li class="moderation-requests__item" user_id="' +
                            element["user_id"] +
                            '"><div class="moderation-requests__item--avatar"><img class="moderation-requests__item--avatar-img" src="' +
                            element["ava"] +
                            '" alt="ava"></div><div class="moderation-requests__item-block-name"><div class="moderation-requests__item--first_name">' +
                            element["first_name"] +
                            '</div><div class="moderation-requests__item--last_name">' +
                            element["last_name"] +
                            '</div><div class="moderation-requests__item--org_name">' +
                            element["organization"] +
                            '</div></div><div class="moderation-requests__item--role">Официант</div><div class="moderation-requests__item-block-btn"><button class="moderation-requests__item--yes" data-req="yes">да</button><button class="moderation-requests__item--no" data-req="no">нет</button></div></li>'
                    );

                    // waiters.innerHTML += '<li class="moderation-requests__item"><div class="moderation-requests__item--avatar"><img class="moderation-requests__item--avatar-img" src="'+element['ava']+'" alt="ava"></div><div class="moderation-requests__item-block-name"><div class="moderation-requests__item--first_name">'+element['first_name']+'</div><div class="moderation-requests__item--last_name">'+element['last_name']+'</div><div class="moderation-requests__item--org_name">'+element['organization']+'</div></div><div class="moderation-requests__item--role">Официант</div><div class="moderation-requests__item-block-btn"><button class="moderation-requests__item--yes" data-req="yes">да</button><button class="moderation-requests__item--no" data-req="no">нет</button></div></li>';
                });
            });
    }

    if (messages) {
        messages.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-yes")) {
                // alert(e.target);
            }
            if (e.target.getAttribute("data-req") == "yes") {
                e.target.closest("li").style.backgroundColor =
                    "rgba(111, 149, 145, 0.25)";
                e.target.closest("li").style.border =
                    "5px solid rgba(111, 149, 145, 0.25)";
                e.target.closest("li").style.padding = "0";

                let formData = new FormData();
                formData.append(
                    "message_ok",
                    e.target.closest("li").getAttribute("message_id")
                );
                fetch("/", { method: "POST", body: formData })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                    });
                setTimeout(() => e.target.closest("li").remove(), 1000);
            }
        });
    }

    function load_messages() {
        let formData = new FormData();
        formData.append("load_messages", "");
        fetch("/", { method: "POST", body: formData })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                data.forEach((element) => {
                    console.log(element);
                    if (element["ava"] == "") {
                        element["ava"] = "img/admin/ava__adm1.jpeg";
                    }

                    messages.insertAdjacentHTML(
                        "beforeend",
                        '<li class="messages__item" message_id="' +
                            element["message_id"] +
                            '"><div class="messages__user"><div class="messages__user--avatar"><img class="messages__user--avatar-img" src="' +
                            element["ava"] +
                            '" alt="ava"></div><div class="messages__user--first_name">' +
                            element["first_name"] +
                            '</div><div class="messages__user--last_name">' +
                            element["last_name"] +
                            '</div><div class="messages__user--org_name">' +
                            element["organization"] +
                            '</div><div class="messages__user--role">Официант</div></div><div class="messages__text">' +
                            element["message"] +
                            " " +
                            '<span class="messages__date">' +
                            element["date"] +
                            '</span></div><div class="messages__status"><!-- <button class="messages__btn btn-no">в работе</button> --><button class="messages__btn btn-yes" data-req="yes">выполнено</button></div></li>'
                    );
                });
            });
    }

    // Загрузка аватарки
    const uploadFile = (file) => {
        console.log(file.name);

        // проверка типа файла
        if (
            !["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(
                file.type
            )
        ) {
            alert("Допустимы изображения png, gif, jpeg, svg");
            return;
        }

        // проверка размера изображения
        if (file.size > 10 * 1024 * 1024) {
            alert("Размер файла не должен превышать 10 мб");
            return;
        }

        const fData = new FormData();
        fData.append("file_attach", file_attach.files[0]); // добавляем файл в объект FormData()

        // Отправка на сервер
        postData("/", fData)
            .then((fetchResponse) => {
                console.log("успешная отправка");

                // var url = '/';
                let formData = new FormData();
                formData.append("get_data_user", "");

                fetch("/", { method: "POST", body: formData })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data["ava"]);
                        document
                            .querySelector(".login__avatar--img")
                            .removeAttribute("src");
                        document
                            .querySelector(".login__avatar--img")
                            .setAttribute(
                                "src",
                                data["ava"] + "?" + Math.random()
                            );
                        // document.querySelector(".login__avatar--img").src = data['ava'];
                    });
            })
            .catch(() => console.log("отправка не удалась"));
    };

    // Загрузка логотипа
    const uploadLogo = (file) => {
        console.log(file.name);

        // проверка типа файла
        if (
            !["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(
                file.type
            )
        ) {
            alert("Допустимы изображения png, gif, jpeg, svg");
            return;
        }

        // проверка размера изображения
        if (file.size > 2 * 1024 * 1024) {
            alert("Размер файла не должен превышать 2 мб");
            return;
        }

        const fData = new FormData();
        fData.append("logo_attach", logo_attach.files[0]); // добавляем файл в объект FormData()

        // Отправка на сервер
        postData("/", fData)
            .then((fetchResponse) => {
                console.log("успешная отправка");

                let formData = new FormData();
                formData.append("get_data_org", "");

                fetch("/", { method: "POST", body: formData })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data["logo"]);
                        document
                            .querySelector(".login__logo--img")
                            .removeAttribute("src");
                        document
                            .querySelector(".login__logo--img")
                            .setAttribute(
                                "src",
                                data["logo"] + "?" + Math.random()
                            );
                    });
            })
            .catch(() => console.log("отправка не удалась"));
    };

    // отправляем `POST` запрос
    const postData = async (url, fData) => {
        // имеет асинхронные операции
        console.log("в процессе"); // в процессе

        // ждём ответ, только тогда наш код пойдёт дальше
        let fetchResponse = await fetch(url, {
            method: "POST",
            body: fData,
        });

        // ждём окончания операции
        return await fetchResponse.text();
    };

    //показать модальное окно
    if (phone_confirm) {
        phone_confirm.addEventListener("click", async (e) => {
            const modalPage = document.querySelector(".overlay");
            modalPage.classList.remove("hide");
            let formData = new FormData();
            formData.append("check_phone", "");

            let response = await fetch("/users", {
                method: "POST",
                body: formData,
            });

            let result = await response.json();
            // if (result.answer == 'ok'){

            // }
        });
    }

    //скрыть модальное окно
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            const modalPage = document.querySelector(".overlay"),
                inputModal = document.querySelectorAll("input");
            modalPage.classList.add("hide");
            inputModal.forEach((i) => {
                if (true) {
                    i.value = "";
                }
            });
        });
    }
});
