/**
 * Internationalization core
 * (C) Best2Pay LTD. 2018
 */
function lang() {
    if (language != undefined && typeof (language) != typeof (undefined)) {
        if (language === 'ENG') {
            return 'ENGLISH'
        }
        return language;
    } else {
        return 'RUSSIAN';
    }
}

function i18nMessage(key) {
    return messages[lang()][key];
}

function i18nMessage(key, defaultString) {
    var msg = messages[lang()][key];
    return msg != undefined && typeof (msg) != typeof (undefined) ? msg : defaultString;
}

var messages = [];
messages['RUSSIAN'] = [];
messages['ENGLISH'] = [];

messages['RUSSIAN']['requiredField'] = 'Поле обязательно';
messages['RUSSIAN']['missingNumber'] = 'Неверное число';
messages['RUSSIAN']['amountMustBeFrom'] = 'Сумма должна быть от ';
messages['RUSSIAN']['to'] = ' до ';
messages['RUSSIAN']['incorrectAmount'] = 'Сумма введена неверно';
messages['RUSSIAN']['incorrectEmail'] = 'Неверный email';
messages['RUSSIAN']['incorrectSecurityCode'] = 'Неверный код безопасности';
messages['RUSSIAN']['incorrectPan'] = 'Неверный номер карты';
messages['RUSSIAN']['cardProhibited'] = 'Операция с использованием указанных карточных реквизитов запрещена';
messages['RUSSIAN']['cardDoesntMatchSelected'] = 'Указанная карта не соответствует категории карты, выбранной на первой странице';
messages['RUSSIAN']['requestErrorTryLater'] = 'При выполнении запроса возникла ошибка. Пожалуйста, повторите операцию позже.';
messages['RUSSIAN']['phoneFormatXXX'] = 'Телефон должен быть в формате XXX0000000';
messages['RUSSIAN']['phoneFormat8XXX'] = 'Телефон должен быть в формате 8XXX0000000';
messages['RUSSIAN']['email'] = 'Email';
messages['RUSSIAN']['feedbackForm'] = 'Форма обратной связи';
messages['RUSSIAN']['yourMessage'] = 'Текст сообщения';
messages['RUSSIAN']['cancel'] = 'Отменить';
messages['RUSSIAN']['send'] = 'Отправить';
messages['RUSSIAN']['sendingInProgress'] = 'Сообщение отправляется';
messages['RUSSIAN']['messageSent'] = 'Сообщение отправлено';
messages['RUSSIAN']['weWillContactYou'] = 'Наша техническая поддержка свяжется с вами в ближайшее время';
messages['RUSSIAN']['errorOccurred'] = 'Произошла ошибка';
messages['RUSSIAN']['pleaseRepeatSending'] = 'Пожалуйста, повторите попытку отправки сообщения позже';
messages['RUSSIAN']['noInternet'] = 'Отсутствует подключение к интернету';
messages['RUSSIAN']['errorCalculatingFeeTryAgain'] = 'При расчете комиссии возникла ошибка. Пожалуйста, повторите попытку позже.';
messages['RUSSIAN']['errorCalculatingFeeCheckAmount'] = 'При расчете комиссии возникла ошибка. Пожалуйста, проверьте введенную сумму';
messages['RUSSIAN']['serviceError'] = 'Ошибка сервиса. Пожалуйста, повторите попытку позже.';
messages['RUSSIAN']['pay'] = 'Оплатить';
messages['RUSSIAN']['invalidEmail'] = 'Email указан неверно';
messages['RUSSIAN']['codeResent'] = 'Код переотправлен на Ваш телефон';
messages['RUSSIAN']['requestError'] = 'Ошибка выполнения запроса';
messages['RUSSIAN']['incorrectCode'] = 'Код введен неверно. Пожалуйста, проверьте правильность ввода';
messages['RUSSIAN']['enterNoMoreThan'] = 'Введите не более {0} символов';
messages['RUSSIAN']['enterNoLessThan'] = 'Введите не менее {0} символов';
messages['RUSSIAN']['enterName'] = 'Укажите фамилию, имя и отчество полностью';
messages['RUSSIAN']['invalidPhoneNumber'] = 'Номер телефона указан неверно';
messages['RUSSIAN']['cardNumbersMatch'] = 'Номер карты получателя совпадает с номером карты отправителя';
messages['RUSSIAN']['expirationFormat'] = 'Дата действия карты должна быть в формате MM/YY';
messages['RUSSIAN']['accountNumberLength'] = 'Номер счета должен состоять из 20 цифр';
messages['RUSSIAN']['calculate'] = 'Рассчитать';
messages['RUSSIAN']['transferToAccount'] = 'Перевод денежных средств на счет №';
messages['RUSSIAN']['transferByContract'] = 'Перевод денежных средств по договору №';
messages['RUSSIAN']['transferReceiver'] = '. Получатель ';
messages['RUSSIAN']['receiptEmailSent'] = 'Письмо с квитанцией отправлено';
messages['RUSSIAN']['sendingReceiptByEmail'] = 'Отправка квитанции на email';
messages['RUSSIAN']['wrongAccNumber'] = 'Указан неправильный номер счета';
messages['RUSSIAN']['creditAccNumberShouldStartWith'] = 'Номер счета для погашения кредита должен начинаться с 42301810';
messages['RUSSIAN']['refillAccNumberShouldStartWith'] = 'Номер счета для пополнения карты должен начинаться с 40817810';
messages['RUSSIAN']['inAmount'] = ' в сумме ';
messages['RUSSIAN']['withFee'] = ' с комиссией ';
messages['RUSSIAN']['valueTooLong'] = 'Длина поля больше допустимой';
messages['RUSSIAN']['incorrectPassportId'] = 'Некорректные номер и серия паспорта (####YYYYYY)';
messages['RUSSIAN']['incorrectInn'] = 'Некорректное значение ИНН';
messages['RUSSIAN']['incorrectSnils'] = 'Некорректное значение СНИЛС';
messages['RUSSIAN']['incorrectDateOrFormat'] = 'Некорректная дата или формат (ДД.ММ.ГГГГ)';
messages['RUSSIAN']['onlyCyrillicAllowed'] = 'Допускаются только кириллические символы и знаки препинания';
messages['RUSSIAN']['onlyLettersDashesSpacesAllowed'] = 'Допускаются только литеры, тире и пробелы';
messages['RUSSIAN']['incorrectSecretPhrase'] = 'Секретная фраза не задана, либо не совпадает с повторным вводом';
messages['RUSSIAN'][''] = '';

messages['ENGLISH']['requiredField'] = 'Required field';
messages['ENGLISH']['missingNumber'] = 'Incorrect number';
messages['ENGLISH']['amountMustBeFrom'] = 'Amount must be from ';
messages['ENGLISH']['to'] = ' to ';
messages['ENGLISH']['incorrectAmount'] = 'Incorrect amount';
messages['ENGLISH']['incorrectEmail'] = 'Incorrect email';
messages['ENGLISH']['incorrectSecurityCode'] = 'Incorrect security code';
messages['ENGLISH']['incorrectPan'] = 'Incorrect card number';
messages['ENGLISH']['cardProhibited'] = 'Operation with given card is not permitted';
messages['ENGLISH']['cardDoesntMatchSelected'] = 'Given card does not match category selected at first page';
messages['ENGLISH']['requestErrorTryLater'] = 'There was an error during request. Please, try again later.';
messages['ENGLISH']['phoneFormatXXX'] = 'Phone must be in XXX0000000 format';
messages['ENGLISH']['phoneFormat8XXX'] = 'Phone must be in 8XXX0000000 format';
messages['ENGLISH']['email'] = 'Email';
messages['ENGLISH']['feedbackForm'] = 'Feedback Form';
messages['ENGLISH']['yourMessage'] = 'Your Message';
messages['ENGLISH']['cancel'] = 'Cancel';
messages['ENGLISH']['send'] = 'Send';
messages['ENGLISH']['sendingInProgress'] = 'Sending in Progress';
messages['ENGLISH']['messageSent'] = 'Your message was sent successfully';
messages['ENGLISH']['weWillContactYou'] = 'Our technical support will contact you shortly';
messages['ENGLISH']['errorOccurred'] = 'An error occurred';
messages['ENGLISH']['pleaseRepeatSending'] = 'Please, try to send your message again later';
messages['ENGLISH']['noInternet'] = 'No internet connection';
messages['ENGLISH']['errorCalculatingFeeTryAgain'] = 'Error occurred while calculating fee. Please try again later.';
messages['ENGLISH']['errorCalculatingFeeCheckAmount'] = 'Error occurred while calculating fee. Please check the amount entered';
messages['ENGLISH']['serviceError'] = 'Service error. Please try again later.';
messages['ENGLISH']['pay'] = 'Pay Now';
messages['ENGLISH']['invalidEmail'] = 'Specified email is invalid';
messages['ENGLISH']['codeResent'] = 'Code resent to your phone number';
messages['ENGLISH']['requestError'] = 'There was an error during request';
messages['ENGLISH']['incorrectCode'] = 'Incorrect code entered. Please check the correctness of the entered code';
messages['ENGLISH']['enterNoMoreThan'] = 'Enter up to {0} symbols';
messages['ENGLISH']['enterNoLessThan'] = 'Enter at least {0} symbols';
messages['ENGLISH']['enterName'] = 'Enter your last name, first name, and patronymic';
messages['ENGLISH']['invalidPhoneNumber'] = 'Specified phone number is invalid';
messages['ENGLISH']['cardNumbersMatch'] = 'Receiver card number is the same as the sender card number';
messages['ENGLISH']['expirationFormat'] = 'Card expiration date must have the MM/YY format';
messages['ENGLISH']['accountNumberLength'] = 'Account number should consist of 20 digits';
messages['ENGLISH']['calculate'] = 'Calculate';
messages['ENGLISH']['transferToAccount'] = 'Money transfer to the account #';
messages['ENGLISH']['transferByContract'] = 'Money transfer by the contract #';
messages['ENGLISH']['transferReceiver'] = '. Receiver ';
messages['ENGLISH']['receiptEmailSent'] = 'Receipt email was sent successfully';
messages['ENGLISH']['sendingReceiptByEmail'] = 'Sending the receipt by email';
messages['ENGLISH']['wrongAccNumber'] = 'The specified account number is invalid';
messages['ENGLISH']['creditAccNumberShouldStartWith'] = 'The account number for loan repayment should start with 42301810';
messages['ENGLISH']['refillAccNumberShouldStartWith'] = 'The account number for card refill should start with 40817810';
messages['ENGLISH']['inAmount'] = ' total of ';
messages['ENGLISH']['withFee'] = ' with tax of ';
messages['ENGLISH']['valueTooLong'] = 'Value too long';
messages['ENGLISH']['incorrectPassportId'] = 'Incorrect passport serial number and ID (####YYYYYY)';
messages['ENGLISH']['incorrectInn'] = 'Incorrect INN value';
messages['ENGLISH']['incorrectSnils'] = 'Incorrect SNILS value';
messages['ENGLISH']['incorrectDateOrFormat'] = 'Incorrect date or date format (DD.MM.YYYY)';
messages['ENGLISH']['onlyCyrillicAllowed'] = 'Only cyrillic symbols allowed';
messages['ENGLISH']['onlyLettersDashesSpacesAllowed'] = 'Only letters, dashes, and space symbols allowed';
messages['ENGLISH']['incorrectSecretPhrase'] = 'Secret phrase not set or does not match the repeated input';
messages['ENGLISH'][''] = '';

var translit = [];
translit['RU'] = [];
translit['RU']['EN'] = [];

translit['RU']['EN']['А'] = 'A';
translit['RU']['EN']['Б'] = 'B';
translit['RU']['EN']['В'] = 'V';
translit['RU']['EN']['Г'] = 'G';
translit['RU']['EN']['Д'] = 'D';
translit['RU']['EN']['Е'] = 'E';
translit['RU']['EN']['Ё'] = 'Yo';
translit['RU']['EN']['Ж'] = 'Zh';
translit['RU']['EN']['З'] = 'Z';
translit['RU']['EN']['И'] = 'I';
translit['RU']['EN']['Й'] = 'J';
translit['RU']['EN']['К'] = 'K';
translit['RU']['EN']['Л'] = 'L';
translit['RU']['EN']['М'] = 'M';
translit['RU']['EN']['Н'] = 'N';
translit['RU']['EN']['О'] = 'O';
translit['RU']['EN']['П'] = 'P';
translit['RU']['EN']['Р'] = 'R';
translit['RU']['EN']['С'] = 'S';
translit['RU']['EN']['Т'] = 'T';
translit['RU']['EN']['У'] = 'u';
translit['RU']['EN']['Ф'] = 'F';
translit['RU']['EN']['Х'] = 'H';
translit['RU']['EN']['Ц'] = 'Ts';
translit['RU']['EN']['Ч'] = 'Ch';
translit['RU']['EN']['Ш'] = 'Sh';
translit['RU']['EN']['Щ'] = 'Sch';
translit['RU']['EN']['Ь'] = '';
translit['RU']['EN']['Ъ'] = '';
translit['RU']['EN']['Ы'] = 'Y';
translit['RU']['EN']['Э'] = 'E';
translit['RU']['EN']['Ю'] = 'Yu';
translit['RU']['EN']['Я'] = 'Ya';