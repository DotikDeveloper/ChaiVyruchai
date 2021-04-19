<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>ЧайВыручай. Личный кабинет. Администратор.</title>
    <meta name="description" content="ЧайВыручай. Принимайте чаевые картой">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <link rel="shortcut icon" href="img/logo/favicon.ico" type="image/x-icon">
    <!-- Normalize.css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="css/style.min.css">
</head>

<body>
    <header class="header container">
    <a href="/" class="header__logo"><img src="img/logo/logo__full.png" alt="logo"></a>
    <a href="#" class="header__menu-toggle"></a>

    <div class="header__menu">
        <button class="header__button" data-button="menu-admin" title="Меню"><i class="fas fa-bars"></i>
        </button>
    </div>
</header>

	<?php include 'template/'.$content_view; ?>

    <footer class="footer">
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
    <script src="js/bundle.min.js"></script>
    <script src="js/frontback.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    <!-- <script type="text/javascript" src="js/charts.js"></script> -->
</body>

</html>
