<header class="header container">
    <a href="/" class="header__logo"><img src="/img/logo/logo__full.png" alt="logo"></a>
    <div>
    </div>
</header>
<main class="main__payment payment container">
    <section class="payment__login login payment">
        <div class="login__avatar payment">
            <img src="<?php echo ($data['ava'] == "" ? "/img/admin/ava__adm1.jpeg" : $data['ava']) ?>" class="login__avatar--img payment" alt="ava">
        </div>
        <div class="login__info payment">
            <div class="login__info--item login__info--user-role payment">Официант</div>
            <div class="login__info--item login__info--user-name payment"><?php echo ($data['first_name']) ?></div>
            <div class="login__info--item login__info--user-target payment">
                <?php
                echo ($_SESSION['slogan']);
                ?>
            </div>
            <div class="login__info--item login__info--user-company payment"><?php echo ($data['organization']) ?></div>
        </div>
        <div class="login__logo payment">
            <!-- <img class="login__logo--img payment" src="img/admin/logo__company.png" alt="logo"> -->
            <img src="<?php echo ($data['logo'] == "" ? "/img/admin/org_logo.jpeg" : $data['logo']) ?>" class="login__logo--img payment" alt="org_logo">
        </div>
    </section>
    <section class="payment__terminal terminal">
        <form class="terminal__form form" action="/pay" method="post" id="form_chai">
            <div class="terminal__block terminal__block--value">
                <div class="form__block terminal__block--input-tip">
                    <label class="form__label" for="valueTips">Чаевые</label>
                    <input type="hidden" name="id-waiters" value="<?php echo $data['user_id'] ?>">
                    <input type="hidden" name="query" value="<?php echo $data['query'] ?>">
                    <input class="terminal__input" id="valueTips" type="text" name="valueTips">
                </div>
                <div class="form__block terminal__block--sum">
                    <p class="form__label">Сумма чека</p>
                    <p class="form__text">
                        <span class="form__text" id="valueCheck"><?php echo explode(',', $_GET['s'])[0]  ?></span> руб.
                    </p>
                </div>
            </div>
            <div class="terminal__block terminal__block--percent">
                <button class="btn" data-percent="7">7%</button>
                <button class="btn" data-percent="10">10%</button>
                <button class="btn" data-percent="15">15%</button>
                <button class="btn" data-percent="20">20%</button>
            </div>
            <!-- <button class="form__input form__input--submit" type="submit" id="payment" name="payment">оставить
                    чаевые</button>
            </form>
        </section>
        <section class="payment__comment comment">
            <form class="comment__form form" action="#" method="post"> -->
            <div class="comment__block comment__block--checked">
                <h3 class="comment__title">Оцените обслуживание</h3>
                <div class="comment__item">
                    <div class="comment__stars">
                        <div class="rating-area">
                            <input type="radio" id="star-5" name="rating" value="5">
                            <label for="star-5" title="Оценка «5»"></label>
                            <input type="radio" id="star-4" name="rating" value="4">
                            <label for="star-4" title="Оценка «4»"></label>
                            <input type="radio" id="star-3" name="rating" value="3">
                            <label for="star-3" title="Оценка «3»"></label>
                            <input type="radio" id="star-2" name="rating" value="2">
                            <label for="star-2" title="Оценка «2»"></label>
                            <input type="radio" id="star-1" name="rating" value="1">
                            <label for="star-1" title="Оценка «1»"></label>
                        </div>
                    </div>
                    <!-- <div class="comment__men"> -->
                    <div class="comment__men comment__men--delicious-food">
                        <img src="/img/payment/delicious-food.png" alt="вкусная еда">
                        <input class="comment__men--checkbox" type="checkbox" name="delicious-food" id="delicious-food">
                        <div class="comment__blur"></div>
                        <p class="comment__text">Вкусные блюда</p>

                    </div>
                    <div class="comment__men comment__men--enough-purely">
                        <img src="/img/payment/enough-purely.png" alt="достаточно чисто">
                        <input class="comment__men--checkbox" type="checkbox" name="enough-purely" id="enough-purely">
                        <div class="comment__blur"></div>
                        <p class="comment__text">Достаточно
                            чисто</p>
                    </div>
                    <div class="comment__men comment__men--good-service">
                        <img src="/img/payment/good-service.png" alt="хороший сервис">
                        <input class="comment__men--checkbox" type="checkbox" name="good-service" id="good-service">
                        <div class="comment__blur"></div>
                        <p class="comment__text">Хорошее
                            обслуживание</p>
                    </div>
                    <div class="comment__men comment__men--pleasant-atmosphere">
                        <img src="/img/payment/pleasant-atmosphere.png" alt="приятная атмосфера">
                        <input class="comment__men--checkbox" type="checkbox" name="pleasant-atmosphere" id="pleasant-atmosphere">
                        <div class="comment__blur"></div>
                        <p class="comment__text">Приятная
                            атмосфера</p>
                    </div>
                    <!-- </div> -->
                </div>
            </div>
            <div class="comment__block--submit">
                <div class="comment__block--wishes">
                    <input class="form__input" type="text" name="review-text" id="reviewText" placeholder="Ваши пожелания">
                    <button class="form__input form__input--submit" type="submit" id="payment" name="payment">оставить чаевые</button>
                </div>
                <div class="comment__block">
                    <input class="form__input form__input--check" required type="checkbox" id="reviewCheck" name="review__check" checked>
                    <label class="form__label--comment" for="review__check">Ознакомлен и соласен с Условиями обслуживания и Правилами обработки персональной информации</label>
                </div>
            </div>
        </form>
    </section>
</main>
<footer class="footer">
    <!-- Copyright -->
    <div class="footer__copyright copyright">
        <div class="copyright__text">
            &copy; <span class="footer__date"></span> <a href="https://chaivyruchai.ru" class="copyright__description copyright__link">ChaiVyruchai.ru</a> Все права
            защищены. Разработано <a href="https://dotdev.site" class="copyright__description copyright__link" target="_blank">dotdev.site</a>
        </div>
    </div>
    <!-- Copyright -->
</footer>
