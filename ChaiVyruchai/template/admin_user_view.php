<main class="adm adm__main">
    <div class="adm__sidebar sidebar">
        <div class="sidebar__top">
            <div class="sidebar__login login">
                <div class="login__avatar">
                    <picture><source srcset="img/admin/user.webp" type="image/webp"><img src="img/admin/user.jpg" class="login__avatar--img" alt="ava"></picture>
                </div>
                <div class="login__info">
                    <div class="login__info--item login__info--user-role">Официант</div>
                    <div class="login__info--item login__info--user-name">Марина</div>
                    <div class="login__info--item login__info--user-target">Хочу на дайвинг</div>
                    <div class="login__info--item login__info--user-company">Демидофф</div>
                </div>
                <div class="login__logo">
                    <picture><source srcset="img/admin/logo__company.webp" type="image/webp"><img class="login__logo--img" src="img/admin/logo__company.png" alt="logo"></picture>
                </div>
            </div>
            <nav class="sidebar__menu menu menu__nav">
                <button class="menu__item" href="admin-panel_adm.html" data-btnMenu="dashboard">
                    <picture><source srcset="img/admin/icon__dashbord.svg" type="image/webp"><img src="img/admin/icon__dashbord.svg" alt="dashboard"></picture>
                    <span class="menu__item--title">dashboard</span>
                </button>
                <button class="menu__item" data-btnMenu="messages">
                    <picture><source srcset="img/admin/icon__messages.svg" type="image/webp"><img class="menu__icon" src="img/admin/icon__messages.svg" alt="M"></picture>
                    <span class="menu__item--title">сообщения</span></button>
                <button class="menu__item" data-btnMenu="businessCard">
                    <picture><source srcset="img/admin/icon_qr-code.svg" type="image/webp"><img class="menu__icon" src="img/admin/icon_qr-code.svg" alt="M"></picture>
                    <span class="menu__item--title">
                        Визитка
                    </span>
                </button>
            </nav>
        </div>
        <div class="sidebar__bottom">
            <button class="sidebar__settings menu__item menu" data-btnMenu="settings">
                <picture><source srcset="img/admin/icon__settings.svg" type="image/webp"><img class="menu__icon" src="img/admin/icon__settings.svg"></picture>
                <span class="menu__item--title">настройки</span>
            </button>
            <button class="sidebar__settings menu__item menu">
                <picture><source srcset="img/admin/icon__exit.svg" type="image/webp"><img class="menu__icon" src="img/admin/icon__exit.svg"></picture>
                <span class="menu__item--title">выйти из лк</span>
            </button>
        </div>
    </div>
    <div class="adm__dashboard dashboard">
        <div class="dashboard__item dashboard__item--total-stats" data-itemDashboard="leftTop">
            <div class="dashboard__content--header">
                <h3 class="dashboard__content-title">Ваша статистика</h3>
                <div class="dashboard__filter">
                    <button class="dashboard__filter-btn">
                        <picture><source srcset="img/admin/edit-filter.svg" type="image/webp"><img class="dashboard__filter-ico" src="img/admin/edit-filter.svg" alt="filter"></picture>
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
                        <picture><source srcset="img/admin/edit-filter.svg" type="image/webp"><img class="dashboard__filter-ico" src="img/admin/edit-filter.svg" alt="filter"></picture>
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
                <form class="form form__reguest" action="#">
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
                    <li class="messages__item">
                        <div class="messages__user">
                            <div class="messages__user--avatar">
                                <picture><source srcset="img/admin/user.webp" type="image/webp"><img class="messages__user--avatar-img" src="img/admin/user.jpg" alt="ava"></picture>
                            </div>
                            <div class="messages__user--first_name">Мария</div>
                            <div class="messages__user--last_name">Николаева</div>
                            <div class="messages__user--org_name">Демидофф</div>
                            <div class="messages__user--role">Официант</div>
                        </div>
                        <div class="messages__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
                            aliquid. Atque ducimus minus voluptate ad optio deserunt autem. Possimus quidem, quam
                            libero voluptatem itaque impedit voluptates maxime vel natus exercitationem sint quos
                            harum architecto nesciunt provident eius illo unde quasi dignissimos cum minus veniam.
                            Consectetur quam dignissimos nobis consequatur velit iste harum voluptatibus at fuga
                            quae explicabo, ab modi quasi natus inventore. Repudiandae vero a quam ut eveniet quis!
                            Facilis repellendus maiores laboriosam ducimus quia, ipsum asperiores vero assumenda
                            obcaecati hic voluptatem distinctio rerum est voluptatibus modi nihil ipsam
                            necessitatibus dignissimos, ex, commodi id quos vel magnam. Harum cupiditate totam, eos
                            ipsam, et animi, fugit nesciunt eum praesentium vitae ratione eveniet numquam non culpa
                            modi est voluptatem unde asperiores earum quisquam corrupti! Adipisci non beatae nihil
                            fugiat maiores voluptates cum vitae inventore quidem? Praesentium sequi aspernatur ea
                            quos sed magni! Dolores inventore, expedita maxime ad cum saepe veniam ea earum?
                            <span class="messages__date">28/10/2020 22:22</span>
                        </div>
                        <div class="messages__status">
                            <button class="messages__btn btn-no">в работе</button>
                            <button class="messages__btn btn-yes">выполнено</button>
                        </div>
                    </li>
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
                            <form class="modal__form form" data-form="admin" action="#">
                                <div class="form__input--file">
                                    <input class="input__file" type="file" required name="userPhoto" id="userPhoto"
                                        placeholder="Ваше фото">
                                    <button class="form__input form__input--file" type="button">Загрузить
                                        фото</button>
                                </div>
                                <input class="form__input" type="text" required pattern="\w" name="firstNameAdm"
                                    id="firstNameUser" placeholder="Имя">
                                <input class="form__input" type="text" required name="lastNameAdm" id="lastNameUser"
                                    placeholder="Фамилия">
                                <input class="form__input" type="tel"
                                    pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" required
                                    placeholder="+7 000 000 00 00" name="phone" id="phoneUser"></input>
                                <input class="form__input" type="text" required name="userCardSettings"
                                    id="userCardSettings" placeholder="укажите номер карты">
                                <input class="form__input" type="password" required name="password"
                                    id="passwordUser" placeholder="Пароль" minlength="8" maxlength="20"></input>
                                <input class="form__input" type="email" required name="mail" id="mailUser"
                                    placeholder="email"></input>
                                <input class="form__input" type="text" required name="role" id="roleUser"
                                    placeholder="должность"></input>
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
    <div class="modal__title">Войти в личный кабинет</div>
    <div class="modal__description--danger">логин или пароль введены неверно</div>
    <form class="modal__form form" action="#">
        <input class="form__input" name="phone"
            pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" required placeholder="+7 000 000 00 00"
            type="tel"></input>
        <input class="form__input" id="form__password" name="form__password" required type="password"
            placeholder="пароль"></input>
        <a href="#" class="password-control">
            <picture><source srcset="img/modal/eye-close.svg" type="image/webp"><img src="img/modal/eye-close.svg" alt="скрыто" height="15"></picture>
        </a>
        <input class="form__input form__input--check" type="checkbox" id="modal__check" name="modal__check" checked>
        <label class="form__label" for="modal__check">запомнить логин и пароль</label>
        <button target="_blank" class="form__input form__input--submit" type="submit" name="submit">войти</button>
    </form>
</div>
</div>
</main>
