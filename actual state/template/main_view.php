<header class="header container">
    <a href="/" class="header__logo"><img src="img/logo/logo__full.png" alt="logo"></a>
    <div class="header__login">
        <button class="header__button" data-button="login" title="Войти в личный кабинет"><i
                class="header__button--icon far fa-user"></i>
        </button>
    </div>
</header>
    <main class="main">
    <!-- section class="intro" -->
    <section class="intro">
        <div class="intro__body">
            <div class="intro__content">
                <h2 class="intro__subtitle">принимайте</h2>
                <h1 class="intro__title">чаевые с карты</h1>
                <h3 class="intro__description">все что нужно</h3>
                <a href="/registration" target="_blank" class="intro__button">Подключиться</a>
            </div>
            <div class="intro__img">
                <img src="img/homepage/intro_bg.jpeg" class="intro__img--picture"></img>
            </div>
        </div>
    </section>

    <section class="pay-tip container">
        <h2 class="pay-tip__title">Оставить чаевые</h2>
        <div class="pay-tip__body">
            <div class="pay-tip__img">
                <img class="pay-tip__img pay-tip__img--picture" src="img/homepage/pay-tip.jpg" alt="Оставить чаевые">
            </div>
            <div class="pay-tip__content">
                <div class="pay-tip__block">
                    <form class="modal__form form pay-tip__form" data-form="pay-tip" method="post" action="/pay">
                        <label class="form__label pay-tip__label" for="id-waiters">Укажите ID официанта </label>
                        <!-- <input class="form__input pay-tip__input" type="text" required pattern="[0-9]{6}" maxlength="6" name="id-waiters" id="id-waiters"> -->
                        <input class="form__input pay-tip__input" type="text" required maxlength="6" name="id-waiters" id="id-waiters">
                        <button class="form__input form__input--submit pay-tip__input--submit" type="submit" name="pay-tip__open"
                            id="pay-tip__open">Оплатить</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <section class="why-we container">
        <h2 class="why-we__title">Почему мы</h2>
        <div class="why-we__body">
            <div class="why-we__content">
                <div class="why-we__item why-we__item--list">
                    <ul class="why-we__list">
                        <li class="why-we__list--item"><i class="why-we__list--mark fas fa-circle"></i> Быстрая
                            установка</li>
                        <li class="why-we__list--item"><i class="why-we__list--mark fas fa-circle"></i> Вам не нужно
                            беспокоиться об обслуживании нашего сервиса</li>
                        <li class="why-we__list--item"><i class="why-we__list--mark fas fa-circle"></i>
                            круглосуточная поддержка</li>
                    </ul>
                </div>
                <div class="why-we__item ">
                    <img class="why-we__item--img" src="img/homepage/payment.jpg" alt="girl-in-caffe">
                </div>
            </div>
            <div class="why-we__content">
                <div class="why-we__item ">
                    <img class="why-we__item--img" src="img/homepage/barmen.jpg" alt="girl-with-cell">
                </div>
                <div class="why-we__item why-we__item--list">
                    <ul class="why-we__list">
                        <li class="why-we__list--item"><i class="why-we__list--mark fas fa-circle"></i> Моментальное
                            зачисление средств на карту официанта</li>
                        <li class="why-we__list--item"><i class="why-we__list--mark fas fa-circle"></i>
                            Комиссия всего 5 %
                        </li>
                        <li class="why-we__list--item"><i class="why-we__list--mark fas fa-circle"></i> Полное
                            отсутствие скрытых комиссий</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="for-whom">
        <div class="for-whom__body">
            <div class="for-whom__content">
                <div class="for-whom__card card">
                    <h3 class="card__title">Для гостей ресторана</h3>
                    <div class="card__body">
                        <ul class="card__list">
                            <li class="card__list-item"><i class="card__list-item--mark fas fa-circle"></i>
                                ВОЗМОЖНОСТЬ ОСТАВИТЬ ОТЗЫВ</li>
                            <li class="card__list-item"><i class="card__list-item--mark fas fa-circle"></i> НЕ НУЖНЫ
                                нАЛИЧНЫЕ</li>
                            <li class="card__list-item"><i class="card__list-item--mark fas fa-circle"></i>
                                УВЕРЕННОСТЬ В КАЧЕСТВЕ ОБСЛУЖИВАНИЯ</li>
                        </ul>
                    </div>
                </div>
                <div class="for-whom__card card">
                    <h3 class="card__title">Для ОФИЦИАНТОВ </h3>
                    <div class="card__body">
                        <ul class="card__list">
                            <li class="card__list-item"><i class="card__list-item--mark fas fa-circle"></i>
                                Увеличение ВАШЕГО дохода</li>
                            <li class="card__list-item"><i class="card__list-item--mark fas fa-circle"></i> Вывод
                                средств на любую карту</li>
                            <li class="card__list-item"><i class="card__list-item--mark fas fa-circle"></i> КОМИССИЯ
                                5%</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="for-whom__content">
                <div class="for-whom__card card">
                    <h3 class="card__title">Для рестораторов</h3>
                    <div class="card__body">
                        <ul class="card__list">
                            <li class="card__list-item"><i class="card__list-item--mark fas fa-circle"></i>
                                мОТИВИРОВАННЫЙ ПЕРСОНАЛ</li>
                            <li class="card__list-item"><i class="card__list-item--mark fas fa-circle"></i> НЕТ
                                ПРОБЛЕМ С СЕРВИСНЫМ СБОРОМ</li>
                            <li class="card__list-item"><i class="card__list-item--mark fas fa-circle"></i> КОНТРОЛЬ
                                НАД КАЧЕСТВОМ ОБСЛУЖИВАНИЯ</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="all-simple container">
        <div class="all-simple__body">
            <div class="all-simple__slider">
                <div class="all-simple__slider-wrapper">
                    <div class="all-simple__slider-inner">
                        <div class="all-simple__slide">
                            <img src="img/homepage/all-simple/payment-page.png" alt="Сканирование QR кода">
                        </div>
                        <div class="all-simple__slide">
                            <img src="img/homepage/all-simple/payment-page.png" alt="Оплата чаевых">
                        </div>
                        <div class="all-simple__slide">
                            <img src="img/homepage/all-simple/payment-page.png" alt="Личный кабинет">
                        </div>
                    </div>
                </div>
                <div class="all-simple__slider-counter">
                    <div class="all-simple__slider-prev">
                        <img src="img/homepage/all-simple/prev.png" alt="prev">
                    </div>
                    <span id="current">02</span>
                    /
                    <span id="total">04</span>
                    <div class="all-simple__slider-next">
                        <img src="img/homepage/all-simple/next.png" alt="next">
                    </div>
                </div>
            </div>
            <div class="all-simple__content">
                <h2 class="all-simple__title">
                    вСЕ ОЧЕНЬ ПРОСТО
                </h2>
                <div class="all-simple__list-block list-block">
                    <div class="list-block__item">
                        <div class="list-block__item list-block__item--mark">
                            <img src="img/homepage/all-simple/all-simple__1.png" alt="1">
                        </div>
                        <div class="list-block__item list-block__item--text">сКАНИРУЕТЕ QR КОД НА ЧЕКЕ</div>
                    </div>
                    <div class="list-block__item">
                        <div class="list-block__item list-block__item--mark">
                            <img src="img/homepage/all-simple/all-simple__2.png" alt="2">
                        </div>
                        <div class="list-block__item list-block__item--text">ПЕРЕХОДИТЕ В БРАУЗЕР ПО ССЫЛКЕ</div>
                    </div>
                    <div class="list-block__item">
                        <div class="list-block__item list-block__item--mark">
                            <img src="img/homepage/all-simple/all-simple__3.png" alt="3">
                        </div>
                        <div class="list-block__item list-block__item--text">ОТПРАВЛЯЕТЕ ДЕНЬГИ УДОБНЫМ СПОСОБОМ</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="main-call-to-action container">
        <div class="main-call-to-action__body">
            <div class="main-call-to-action__content">
                <h3 class="main-call-to-action__title">Получайте чаевые с карты</h3>
                <p class="main-call-to-action__paragraph">Откройте для себя мир новых возможностей. Подключите наш
                    сервис и получайте больше чаевых!</p>
            </div>
            <a href="/registration" target="_blank" class="main-call-to-action__button">Подключиться</a>
        </div>
    </section>

    <section class="partners container">
        <div class="partners__body">
            <h2 class="partners__title">Наши партнеры</h2>
            <div class="partners__content">
                <div class="partners__logo partners__logo--1"></div>
                <div class="partners__logo partners__logo--2"></div>
                <div class="partners__logo partners__logo--3"></div>
                <div class="partners__logo partners__logo--4"></div>
                <div class="partners__logo partners__logo--5"></div>
            </div>
        </div>
    </section>

    <div class="overlay hide">
    <div class="modal">
        <button data-button="close-modal" class="modal__close">&times;</button>
        <div class="modal__title">Войти в личный кабинет</div>
        <div class="modal__description--danger">логин или пароль введены неверно</div>
        <form class="modal__form form" action="/" method="post">
            <input class="form__input" name="phone"
                pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$" required placeholder="+7 000 000 00 00"
                type="tel"></input>
            <input class="form__input" id="form__password" name="password" required type="password"
                placeholder="пароль"></input>
            <a href="#" class="password-control">
                <img src="img/modal/eye-close.svg" alt="скрыто" height="15">
            </a>
            <input class="form__input form__input--check" type="checkbox" id="modal__check" name="modal__check" checked>
            <label class="form__label" for="modal__check">запомнить логин и пароль</label>
            <button target="_blank" class="form__input form__input--submit" type="submit" name="login">войти</button>
        </form>
    </div>
</div>

</main>
    <footer class="footer">
    <div class="footer__body container">
        <div class="footer__call-to-action">
            <div class="footer__description">
                <div class="footer__title">Получай чаевые с карты</div>
                <div class="footer__text">Отправь заявку на подключение. После подключения к сервису вы сможете
                    в
                    этот же день получить чаевые на карту.</div>
                <div class="footer__link">
                    <div class="footer__link--item">
                        <a href="contacts.html" target="_blank" class="footer__link">Адрес и реквизиты</a>
                    </div>
                    <div class="footer__link--item">
                        <a href="doc/offer-agreement.pdf" target="_blank" class="footer__link">Договор-оферта</a>
                    </div>
                    <div class="footer__link--item">
                        <a href="doc/privacy-policy.pdf" target="_blank" class="footer__link">Политика
                            конфиденциальности</a>
                    </div>
                    <div class="footer__link--item">
                        <a href="doc/security-policy.pdf" target="_blank" class="footer__link">Политика
                            безопастности</a>
                    </div>
                </div>

            </div>
            <a href="/registration" target="_blank" class="footer__button">Подключиться</a>
        </div>
    </div>
                    <!-- Copyright -->
                <div class="footer__copyright copyright">
                    <div class="copyright__text">
                        &copy; <span class="footer__date"></span> <a href="https://chaivyruchai.ru"
                            class="copyright__description copyright__link">ChaiVyruchai.ru</a> Все права
                        защищены. Разработано <a href="https://dotdev.site"
                            class="copyright__description copyright__link" target="_blank">dotdev.site</a>
                    </div>
                </div>
                <!-- Copyright -->
</footer>
    <div class="overlay overlay__status hide">
    <div class="modal modal__status">
        <button data-button="close-modal-status" class="modal__close">&times;</button>
        <div>
            <div class="modal__picture"></div>
            <div class="modal__title modal__title--status">что-то пошло не так как вы планировали</div>
        </div>


    </div>
</div>
