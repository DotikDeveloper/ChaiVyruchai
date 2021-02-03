<main class="adm adm__main">
        <div class="adm__sidebar sidebar">
            <div class="sidebar__top">
            <div class="sidebar__login login">
                    <div class="login__avatar">
                        <img src="<?php echo($_SESSION['user_ava'] == "" ? "img/admin/ava__adm1.jpeg" : $_SESSION['user_ava']) ?>   " class="login__avatar--img" alt="ava">
                    </div>
                    <div class="login__info">
                        <div class="login__info--item login__info--user-role">Официант</div>
                        <div class="login__info--item login__info--user-name">
                            <?php
                                    echo($_SESSION['user']);
                            ?>
                        </div>
                        <div class="login__info--item login__info--user-target">“Хочу в отпуск”</div>
                        <div class="login__info--item login__info--user-company">
                            <?php
                                    echo($_SESSION['user_organization']);
                            ?>
                        </div>
                    </div>
                    <div class="login__logo">
                        <img src="<?php echo($_SESSION['org_logo'] == "" ? "img/admin/org_logo.jpeg" : $_SESSION['org_logo']) ?>   " class="login__logo--img" alt="org_logo">
                    </div>
            </div>
                <nav class="sidebar__menu menu menu__nav">
                    <button class="menu__item" href="admin-panel_adm.html" data-btnMenu="dashboard">
                        <img src="img/admin/icon__dashbord.svg" alt="dashboard">
                        <span class="menu__item--title">dashboard</span>
                    </button>
                    <button class="menu__item" data-btnMenu="messages">
                        <img class="menu__icon" src="img/admin/icon__messages.svg" alt="M">
                        <span class="menu__item--title">сообщения</span></button>
                    <button class="menu__item" data-btnMenu="businessCard">
                        <img class="menu__icon" src="img/admin/icon_qr-code.svg" alt="M">
                        <span class="menu__item--title">
                            Визитка
                        </span>
                    </button>
                </nav>
            </div>
            <div class="sidebar__bottom">
                <button class="sidebar__settings menu__item menu" data-btnMenu="settings">
                    <img class="menu__icon" src="img/admin/icon__settings.svg">
                    <span class="menu__item--title">настройки</span>
                </button>
                <a href="/main/logout" class="sidebar__settings menu__item menu">
                    <img class="menu__icon" src="img/admin/icon__exit.svg">
                    <span class="menu__item--title">выйти из лк</span>
                </a>
            </div>
        </div>
        <div class="adm__dashboard dashboard">
            <div class="dashboard__item dashboard__item--total-stats" data-itemDashboard="leftTop">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">Ваша статистика</h3>
                    <div class="dashboard__filter">
                        <button class="dashboard__filter-btn">
                            <img class="dashboard__filter-ico" src="img/admin/edit-filter.svg" alt="filter">
                        </button>
                        <div class="dashboard__filter-menu hide">
                            <div class="dashboard__filter-menu--item">сутки</div>
                            <div class="dashboard__filter-menu--item">неделя</div>
                            <div class="dashboard__filter-menu--item">месяц</div>
                        </div>
                    </div>
                </div>
                <div class="dashboard__content dashboard__content--body">
                    <canvas id="totalStats"></canvas>
                </div>
            </div>
            <div class="dashboard__item dashboard__item--company-statistics" data-itemDashboard="rightTop">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">Вывод средств</h3>
                </div>
                <div class="dashboard__content dashboard__content--body">
                    <div class="dashboard__content dashboard__content--body">
                        <form class="form" action="#">
                            <div class="form__many-output many-output">
                                <div class="form__colume many-output">
                                    <div class="many-output__title many-output__item">Остаток средств</div>
                                    <div class="many-output__volume many-output__item"><span
                                            class="many-output__number">26540</span> руб.</div>
                                </div>
                                <div class="form__colume many-output">
                                    <input class="form__input many-output" type="text" required name="idUser"
                                        id="sumManyOutput" placeholder="Сумма на вывод">
                                    <button class="form__input form__input--submit many-output__btn" type="submit"
                                        name="many-output__submit">Отправить запрос</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="dashboard__item dashboard__item--waiters-rating" data-itemDashboard="leftDown">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">Отзывы</h3>
                    <div class="dashboard__filter">
                        <button class="dashboard__filter-btn">
                            <img class="dashboard__filter-ico" src="img/admin/edit-filter.svg" alt="filter">
                        </button>
                        <div class="dashboard__filter-menu hide">
                            <div class="dashboard__filter-menu--item">сутки</div>
                            <div class="dashboard__filter-menu--item">неделя</div>
                            <div class="dashboard__filter-menu--item">месяц</div>
                        </div>
                    </div>
                </div>
                <div class="dashboard__content dashboard__content--body reviews">
                    <ul class="reviews__list dashboard__list">
                        <li class="messages__item reviews__item">
                            <div class="reviews__volume">5</div>
                            <div class="reviews__cash"><span class="reviews__cash--number">1200</span> руб.</div>
                            <div class="messages__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
                                voluptas aliquam libero.
                                <span class="messages__date">28/10/2020 12:22</span>
                            </div>
                        </li>
                        <li class="messages__item reviews__item">
                            <div class="reviews__volume">4</div>
                            <div class="reviews__cash"><span class="reviews__cash--number">400</span> руб.</div>
                            <div class="messages__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                                libero repudiandae maiores repellat explicabo unde sequi est magnam tempore ab.
                                Doloribus, quia.
                                <span class="messages__date">28/10/2020 22:00</span>
                            </div>
                        </li>
                        <li class="messages__item reviews__item">
                            <div class="reviews__volume">5</div>
                            <div class="reviews__cash"><span class="reviews__cash--number">100</span> руб.</div>
                            <div class="messages__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                                incidunt at debitis natus, neque esse quam aperiam numquam mollitia distinctio maiores
                                illum voluptas excepturi quisquam.
                                <span class="messages__date">28/10/2020 22:00</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="dashboard__item dashboard__item--moderation-requests moderation-requests"
                data-itemDashboard="rightDown">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">написать в службу поддержки</h3>
                </div>
                <div class="dashboard__content dashboard__content--body">
                    <form class="form form__reguest" id="form_message" action="#">
                        <div class="form__message">
                            <div class="form__colume form__colume--request">
                                <textarea class="form__input" id="req_message" name="req_message" cols="33"
                                    maxlength="150" required
                                    placeholder="Пожалуйста введите свой вопрос (максимум 150 знаков)"></textarea>
                                <button class="form__input form__input--submit" type="submit" id="request_user_add"
                                    name="request_user_add">Отправить запрос</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="hide" data-itemDashboard="restoransAdd">
            </div>

            <div class="dashboard__item dashboard__item--message dashboard__content hide" data-itemDashboard="message">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">Сообщения в службу поддержки</h3>
                </div>
                <div class="dashboard__content dashboard__content--body">
                    <ul class="messages__list dashboard__list">
                    </ul>
                </div>
            </div>
            <div class="dashboard__item dashboard__item dashboard__item--settings dashboard__content hide"
                data-itemDashboard="settings">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">Настройки</h3>
                </div>
                <div class="dashboard__content--body">
                    <div class="reg-form__colume">

                        <div class="reg-form">
                            <div class="form__colume">
                                <div class="form__input--file">
                                    <input class="input__file" type="file" required name="userPhoto" id="userPhoto"
                                        placeholder="Ваше фото">
                                    <button class="form__input form__input--file" type="button">Загрузить
                                        фото</button>
                                </div>
                                <form id="settings" class="modal__form form" name="settings" data-form="admin" action="#">
                                    <input class="form__input" type="text" required name="firstNameAdm"
                                        id="firstNameUser" placeholder="Имя">
                                    <input class="form__input" type="text" required name="lastNameAdm" id="lastNameUser"
                                        placeholder="Фамилия">
                                    <input class="form__input" type="tel"
                                        pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" required
                                        placeholder="+7 000 000 00 00" name="phone" id="phoneUser"></input>
                                    <button class="form__input form__input--submit" type="button" id="phone_confirm"
                                    name="phone_confirm">Подтвердить номер</button>
                                    <input class="form__input" type="text" name="userCardSettings"
                                        id="userCardSettings" placeholder="укажите номер карты">
                                    <input class="form__input" type="password" required name="password"
                                        id="passwordUser" placeholder="Пароль" minlength="8" maxlength="20"></input>
                                    <input class="form__input" type="email" required name="mail" id="mailUser"
                                        placeholder="email"></input>
                                    <!-- <input class="form__input" type="text" required name="role" id="roleUser"
                                        placeholder="должность"></input> -->
                                    <button class="form__input form__input--submit" type="submit" id="admUser"
                                        name="adm_add">Сохранить</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dashboard__item dashboard__item dashboard__item--settings dashboard__content hide"
                data-itemDashboard="businessCard">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">Визитка</h3>
                </div>
                <div class="dashboard__content--body business-card">
                    <div class="form__colume business-card">
                        <div class="business-card__title">
                            Перейдите по ссылке в браузере
                        </div>
                        <!-- <div class="business-card__qr-code" id="placeHolder">
                        </div> -->
                        <canvas class="business-card__qr-code" id="qr-code">
                        </canvas >
                        <div class="business-card__id-user">
                            id<span class="business-card__id-number">456-987</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="overlay hide">
    <div class="modal">
        <button data-button="close-modal" class="modal__close">&times;</button>
        <div class="modal__title">Подтвердить номер телефона</div>
        <div class="modal__description--danger">введен неверный код</div>
        <form class="modal__form form" action="#" id="check_code">
            <input class="form__input" name="sms"
                required placeholder="код из смс"
                type="text"></input>
            <button target="_blank" class="form__input form__input--submit" type="submit" name="submit">подтвердить</button>
        </form>
    </div>
</div>
    </main>
