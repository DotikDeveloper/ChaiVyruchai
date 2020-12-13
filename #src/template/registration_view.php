<header class="header container">
        <div class="header__logo"><a href="/"><img class="header__logo--img" src="media/logo/logo__full.png"
                    alt="logo"></a></div>
        <div class="header__login">
            <button class="header__button" data-button="login" title="Войти в личный кабинет"><i
                    class="header__button--icon far fa-user"></i>
            </button>
        </div>
    </header>

    <!-- main -->
    <main class="main__registration container">

        <section class="registration">

            <h2 class="registration__title">Регистрация</h2>
            <div class="registration__body">
                <div class="registration__img">
                    <img class="registration__img registration__img--picture"
                        src="media/registration/registration__bg.jpg" alt="Подключайся">
                </div>
                <div class="registration__content">
                    <div id="tabsBtn" class="registration__tabs-container">
                        <button class="registration__btn" type="submit">Физическое
                            лицо</button>
                        <button class="registration__btn" type="submit">Юридическое
                            лицо</button>
                    </div>

                    <div class="registration__list-block list-block ">
                        <form class="modal__form form registration__form" data-form="user" action="/registration" method="post">
                            <input class="form__input" type="text" required name="first_name"
                                id="first_name" placeholder="Имя">
                            <input class="form__input" type="text" required name="last_name" id="last_name"
                                placeholder="Фамилия">
                            <input class="form__input" type="tel"
                                pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" required
                                placeholder="+7 000 000 00 00" name="phone" id="phone"></input>
                            <input class="form__input" type="password" required name="password" id="password"
                                placeholder="Пароль" minlength="8" maxlength="20"></input>
                            <input class="form__input" type="email" required name="mail" id="mail"
                                placeholder="email"></input>
                            <select class="form__input" required name="org">
                            <option></option>
                            <?php
                            foreach($data[2] as $row){
                                echo '<option value="'.$row['organization_id'].'">'.$row['name'].'</option>';
                            }
                            ?>
                            </select>
                            <input type="hidden" name="role" id="role" value="3"></input>
                            <button class="form__input form__input--submit" type="submit" name="user_add"
                                id="user_add">Зарегистрироваться</button>
                        </form>
                        <form class="modal__form form registration__form" data-form="business" action="/registration" method="post">
                            <input class="form__input" type="text" required name="org_name" id="org_name"
                                placeholder="Название организации">
                            <input class="form__input" type="text" required name="org_address" id="org_address"
                                placeholder="Адрес организации">
                            <input class="form__input" type="tel"
                                pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" required
                                placeholder="+7 000 000 00 00" name="org_phone" id="org_phone"></input>
                            <input class="form__input" type="email" required name="org_mail" id="org_mail"
                                placeholder="email"></input>
                            <button class="form__input form__input--submit" type="submit" id="org_add"
                                name="org_add">отправить запрос</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <div class="overlay hide">
            <div class="modal">
                <button data-button="close-modal" class="modal__close">&times;</button>
                <div class="modal__title">Войти в личный кабинет</div>
                <div class="modal__description--danger">логин или пароль введены неверно</div>
                <form class="modal__form form" action="#">
                    <input class="form__input" name="phone"
                        pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" required
                        placeholder="+7 000 000 00 00" type="tel"></input>
                    <input class="form__input" id="form__password" name="form__password" required type="password"
                        placeholder="пароль"></input>
                    <a href="#" class="password-control"><img src="media/modal/eye-close.svg" height="15"
                            alt="скрыто"></a>

                    <input class="form__input form__input--check" type="checkbox" id="modal__check" name="modal__check"
                        checked>
                    <label class="form__label" for="modal__check">запомнить логин и пароль</label>

                    <button class="form__input form__input--submit" type="submit" name="submit">войти</button>
                </form>
            </div>
        </div>
    </main>
