<main class="adm adm__main">
        <div class="adm__sidebar sidebar">
            <div class="sidebar__top">
                <div class="sidebar__login login">
                    <div class="login__avatar">
                        <img src="<?php echo($_SESSION['user_ava'] == "" ? "img/admin/ava__adm1.jpeg" : $_SESSION['user_ava']) ?>   " class="login__avatar--img" alt="ava">
                    </div>
                    <div class="login__info">
                        <div class="login__info--item login__info--user-role">Администратор</div>
                        <div class="login__info--item login__info--user-name">
                            <?php
                                    echo($_SESSION['user']);
                            ?>
                        </div>
                        <!-- <div class="login__info--item login__info--user-target">“Хочу в отпуск”</div> -->
                        <div class="login__info--item login__info--user-company">чай выучай</div>
                    </div>
                    <div class="login__logo">
                        <img class="login__logo--img" src="img/admin/logo__company.png" alt="logo">
                    </div>
                </div>

                <nav class="sidebar__menu menu menu__nav">
                    <button class="menu__item" href="admin-panel_adm.html" data-btnMenu="dashboard">
                        <img src="img/admin/icon__dashbord.svg" alt="dashboard">
                        <span class="menu__item--title">dashboard</span>
                    </button>
                    <button class="menu__item" data-btnMenu="restorans">
                        <img class="menu__icon" src="img/admin/icon__restaurants.svg" alt="R">
                        <!-- <span class="menu__item--title">рестораны</span> -->
                        <span class="menu__item--title">рестораны</span>
                    </button>
                    <button class="menu__item" data-btnMenu="waiters">
                        <img class="menu__icon" src="img/admin/icon__waiters.svg" alt="W">
                        <span class="menu__item--title" data-btnMenu="waiters">официанты</span></button>
                    <button class="menu__item" data-btnMenu="messages">
                        <img class="menu__icon" src="img/admin/icon__messages.svg" alt="M">
                        <span class="menu__item--title">сообщения</span></button>
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
                    <h3 class="dashboard__content-title">Общая статистика</h3>
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
                    <h3 class="dashboard__content-title">статистика по по компаниям</h3>
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
                    <canvas id="companyStatistics"></canvas>
                </div>
            </div>
            <div class="dashboard__item dashboard__item--moderation-requests moderation-requests"
                data-itemDashboard="leftDown">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">запросы на модерацию</h3>
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
                    <ul class="moderation-requests__list dashboard__list">
                        <!-- <li class="moderation-requests__item">
                            <div class="moderation-requests__item--avatar">
                                <img class="moderation-requests__item--avatar-img" src="img/admin/user.jpg" alt="ava">
                            </div>
                            <div class="moderation-requests__item-block-name">
                                <div class="moderation-requests__item--first_name">Виктория</div>
                                <div class="moderation-requests__item--last_name">Ланина</div>
                                <div class="moderation-requests__item--org_name">Finnegan's</div>
                            </div>

                            <div class="moderation-requests__item--role">Официант</div>
                            <div class="moderation-requests__item-block-btn">
                                <button class="moderation-requests__item--yes" data-req='yes'>да</button>
                                <button class="moderation-requests__item--no" data-req='no'>нет</button>
                            </div>

                        </li>
                        <li class="moderation-requests__item">
                            <div class="moderation-requests__item--avatar">
                                <img class="moderation-requests__item--avatar-img" src="img/admin/user.jpg" alt="ava">
                            </div>
                            <div class="moderation-requests__item-block-name">
                                <div class="moderation-requests__item--first_name">Виктория</div>
                                <div class="moderation-requests__item--last_name">Ланина</div>
                                <div class="moderation-requests__item--org_name">Finnegan's</div>
                            </div>

                            <div class="moderation-requests__item--role">Официант</div>
                            <div class="moderation-requests__item-block-btn">
                                <button class="moderation-requests__item--yes" data-req='yes'>да</button>
                                <button class="moderation-requests__item--no" data-req='no'>нет</button>
                            </div>

                        </li>
                        <li class="moderation-requests__item">
                            <div class="moderation-requests__item--avatar">
                                <img class="moderation-requests__item--avatar-img" src="img/admin/user.jpg" alt="ava">
                            </div>
                            <div class="moderation-requests__item-block-name">
                                <div class="moderation-requests__item--first_name">Виктория</div>
                                <div class="moderation-requests__item--last_name">Ланина</div>
                                <div class="moderation-requests__item--org_name">Finnegan's</div>
                            </div>
                            <div class="moderation-requests__item--role">Официант</div>
                            <div class="moderation-requests__item-block-btn">
                                <button class="moderation-requests__item--yes" data-req='yes'>да</button>
                                <button class="moderation-requests__item--no" data-req='no'>нет</button>
                            </div>
                        </li> -->
                    </ul>
                </div>
            </div>
            <div class="dashboard__item dashboard__item--waiters-rating" data-itemDashboard="rightDown">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">рейтинг официантов</h3>
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
                    <ul class="waiters-rating__list dashboard__list">
                        <li class="waiters-rating__item">
                            <div class="waiters-rating__item--avatar">
                                <img class="waiters-rating__item--avatar-img" src="img/admin/user.jpg" alt="ava">
                            </div>
                            <div class="moderation-requests__item-block-name">
                                <div class="waiters-rating__item--first_name">Мария</div>
                                <div class="waiters-rating__item--last_name">Николаева</div>
                                <div class="waiters-rating__item--org_name">Finnegan's</div>
                            </div>
                            <div class="waiters-rating__item--role">Официант</div>
                            <div class="waiters-rating__item--level">4.96</div>
                        </li>
                        <li class="waiters-rating__item">
                            <div class="waiters-rating__item--avatar">
                                <img class="waiters-rating__item--avatar-img" src="img/admin/user.jpg" alt="ava">
                            </div>
                            <div class="moderation-requests__item-block-name">
                                <div class="waiters-rating__item--first_name">Мария</div>
                                <div class="waiters-rating__item--last_name">Николаева</div>
                                <div class="waiters-rating__item--org_name">Finnegan's</div>
                            </div>
                            <div class="waiters-rating__item--role">Официант</div>
                            <div class="waiters-rating__item--level">4.96</div>
                        </li>
                        <li class="waiters-rating__item">
                            <div class="waiters-rating__item--avatar">
                                <img class="waiters-rating__item--avatar-img" src="img/admin/user.jpg" alt="ava">
                            </div>
                            <div class="moderation-requests__item-block-name">
                                <div class="waiters-rating__item--first_name">Мария</div>
                                <div class="waiters-rating__item--last_name">Николаева</div>
                                <div class="waiters-rating__item--org_name">Finnegan's</div>
                            </div>
                            <div class="waiters-rating__item--role">Официант</div>
                            <div class="waiters-rating__item--level">4.96</div>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="dashboard__item dashboard__item--restorans-add dashboard__content hide"
                data-itemDashboard="restoransAdd">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">регистрация ресторана</h3>
                </div>
                <div class="dashboard__content--body">
                    <div class="reg-form__colume">
                        <form class="modal__form form" data-form="user" action="/organizations" method="post" name="ororg_add_with_userg_add" id="org_add_with_user">
                            <div class="reg-form">
                                <div class="form__colume">
                                    <input class="form__input" type="text" required pattern="^[a-zA-Zа-яёА-ЯЁ]+$" name="first_name"
                                        id="first_name" placeholder="Имя">
                                    <input class="form__input" type="text" required name="last_name" id="last_name"
                                        placeholder="Фамилия">
                                    <input class="form__input" type="tel"
                                        pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" required
                                        placeholder="+7 000 000 00 00" name="phone" id="phone">
                                    <input class="form__input" type="password" required name="password" id="password"
                                        placeholder="Пароль" minlength="8" maxlength="20">
                                    <input class="form__input" type="email" required name="mail" id="mail"
                                        placeholder="email">
                                    <!-- <input class="form__input" type="text" required name="role" id="role"
                                        placeholder="должность"> -->
                                    <input type="hidden" name="role" id="role" value="2"></input>
                                    <input type="hidden" name="org_add_with_user_form"></input>
                                </div>
                                <div class="form__colume">
                                    <input class="form__input" type="text" required name="org_name" id="org_name"
                                        placeholder="Название организации">
                                    <input class="form__input" type="text" required name="org_address" id="org_address"
                                        placeholder="Адрес организации">
                                    <input class="form__input" type="tel"
                                        pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" required
                                        placeholder="+7 000 000 00 00" name="org_phone" id="org_phone">
                                    <input class="form__input" type="email" required name="org_mail" id="org_mail"
                                        placeholder="email">
                                </div>
                            </div>
                            <button class="form__input form__input--submit" type="submit" id="org_add"
                                name="org_add_with_user">добавить в базу данных</button>
                        </form>
                        <!-- <form class="modal__form form" data-form="user" action="/organizations" method="post" name="org_add_with_user_send" id="org_add_with_user">
                            <div class="reg-form">
                                <div class="form__colume">
                                    <input class="form__input" type="text" name="first_name"
                                        id="first_name" placeholder="Имя" value="Тестовое имя">
                                    <input class="form__input" type="text" name="last_name" id="last_name"
                                        placeholder="Фамилия" value="Тестовая фамилия">
                                    <input class="form__input" type="tel"
                                        placeholder="+7 000 000 00 00" name="phone" id="phone" value="+71231231212">
                                    <input class="form__input" type="password" name="password" id="password"
                                        placeholder="Пароль" minlength="8" maxlength="20" value="123456789">
                                    <input class="form__input" type="email" name="mail" id="mail"
                                        placeholder="email" value="test@test.te">
                                    <input type="hidden" name="role" id="role" value="2"></input>
                                    <input type="hidden" name="org_add_with_user_form"></input>
                                </div>
                                <div class="form__colume">
                                    <input class="form__input" type="text" name="org_name" id="org_name"
                                        placeholder="Название организации" value="Тестовое название организации">
                                    <input class="form__input" type="text" name="org_address" id="org_address"
                                        placeholder="Адрес организации" value="Тестовый адрес">
                                    <input class="form__input" type="tel"
                                        placeholder="+7 000 000 00 00" name="org_phone" id="org_phone" value="+73213212121">
                                    <input class="form__input" type="email" name="org_mail" id="org_mail"
                                        placeholder="email" value="test@test.te">
                                </div>
                            </div>
                            <button class="form__input form__input--submit" type="submit" id="org_add"
                                name="org_add_with_user">добавить в базу данных</button>
                        </form> -->
                    </div>
                </div>
            </div>
            <div class="dashboard__item dashboard__item--message dashboard__content hide" data-itemDashboard="message">
                <div class="dashboard__content--header">
                    <h3 class="dashboard__content-title">Сообщения в службу поддержки</h3>
                </div>
                <div class="dashboard__content dashboard__content--body">
                    <ul class="messages__list dashboard__list">
                        <!-- <li class="messages__item">
                            <div class="messages__user">
                                <div class="messages__user--avatar">
                                    <img class="messages__user--avatar-img" src="img/admin/user.jpg" alt="ava">
                                </div>
                                <div class="messages__user--first_name">Виктория</div>
                                <div class="messages__user--last_name">Ланина</div>
                                <div class="messages__user--org_name">Finnegan's</div>
                                <div class="messages__user--role">Официант</div>
                            </div>
                            <div class="messages__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
                                corrupti aut ipsum dolore sed officiis, cupiditate odit alias aperiam impedit?
                                <span class="messages__date">28/10/2020 22:22</span>
                            </div>
                            <div class="messages__status">
                                <bottom class="messages__btn btn-yes" data-req="no">ожидание</bottom>
                                <bottom class="messages__btn btn-no" data-req="yes">сделано</bottom>
                            </div>
                        </li> -->
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
                                    <!-- <div class="form__input--file">
                                        <input class="input__file" type="file" required name="userPhoto" id="userPhoto"
                                            placeholder="Ваше фото">
                                        <button class="form__input form__input--file" type="button">Загрузить
                                            фото</button>
                                    </div> -->
                                    <!-- <input class="form__input" type="text" required pattern="\w" name="firstNameAdm" -->
                                    <input class="form__input" type="text" required name="firstNameAdm"
                                        id="firstNameAdm" placeholder="Имя">
                                    <input class="form__input" type="text" required name="lastNameAdm" id="lastNameAdm"
                                        placeholder="Фамилия">
                                    <input class="form__input" type="tel"
                                        pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" required
                                        placeholder="+7 000 000 00 00" name="phone" id="phoneAdm"></input>
                                    <input class="form__input" type="password" required name="password" id="passwordAdm"
                                        placeholder="Пароль" minlength="8" maxlength="20"></input>
                                    <input class="form__input" type="email" required name="mail" id="mailAdm"
                                        placeholder="email"></input>
                                    <!-- <input class="form__input" type="text" required name="role" id="roleAdm"
                                        placeholder="должность"></input> -->
                                    <button class="form__input form__input--submit" type="submit" id="adm_add"
                                        name="adm_add">добавить в базу данных</button>
                                </form>
                            </div>

                            <div class="form__colume form__db">
                                <form class="modal__form form" data-form="data-base" action="#">
                                    <input class="form__input" type="text" required name="data-base_name"
                                        id="dataBaseName" placeholder="Название базы данных">
                                    <input class="form__input" type="password" required name="data-base_password"
                                        id="dataBasePassword" placeholder="Пароль базы данных">
                                    <button class="form__input form__input--submit" type="submit" id="dataBaseAdd"
                                        name="data-base_add">загрузить базу данных</button>
                                </form>
                            </div>
                        </div>
                        </form>
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
                <img src="img/modal/eye-close.svg" alt="скрыто" height="15">
            </a>
            <input class="form__input form__input--check" type="checkbox" id="modal__check" name="modal__check" checked>
            <label class="form__label" for="modal__check">запомнить логин и пароль</label>
            <button target="_blank" class="form__input form__input--submit" type="submit" name="submit">войти</button>
        </form>
    </div>
</div>
    </main>
