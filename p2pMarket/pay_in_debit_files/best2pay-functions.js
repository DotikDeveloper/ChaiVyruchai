function getFloat(val) {
    if (typeof val == 'string') {
        val = parseFloat(val) || 0;
    }
    return val;
}

function trunc(n) {
    return Math[n > 0 ? "round" : "ceil"](n);
}

function strStartsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

function cardType(cardNumber) {
    switch (true) {
        case /^6/.test(cardNumber): return 'MAESTRO';
        case /^5/.test(cardNumber) || /^2[2-7]2/.test(cardNumber): return 'MASTERCARD';
        case /^4/.test(cardNumber): return 'VISA';
        case /^220[0-4]/.test(cardNumber): return 'MIR';
        case /^8/.test(cardNumber): return 'UZCARD';
        case /^35/.test(cardNumber): return 'JCB';
    }
    return '';
}

function displayBlock() {
    var f = document.getElementById('screen');
    f.style.display = "block";
}

function louna(value) {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}

/**
 * Проверка ввода номера карты
 * @param e
 * @param el
 * @returns {boolean}
 */
function checkCardNumber(e, el) {
    var value = el.value || '';
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (checkDigits(e) === false) {
        return false;
    }
    if (checkDigits(e) === undefined) {
        return true;
    }
    if (unicode === 8 || unicode === 118) {
        return true;
    }
    if (/^\d{4}$/.test(value)) {
        el.value = value + ' ';
        return true;
    }
    if (/^\d{4}\s\d{4}$/.test(value)) {
        el.value = value + ' ';
        return true;
    }
    if (/^\d{4}\s\d{4}\s\d{4}$/.test(value)) {
        el.value = value + ' ';
        return true;
    }
    return true;
}

/**
 * Проверка корректности ввода суммы
 * @param e
 * @returns {boolean}
 */
function checkAmount(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    var el = e.target;
    var valueOld = el.value || '';
    //if the key isn't the backspace key (which we should allow)
    if ((unicode === 37) || (unicode === 39) || (unicode === 8) || (unicode == 9)) {
        return true;
    }
    if ((unicode < 48 || unicode > 57) && (unicode !== 46) && (unicode !== 44)) //if not a number
        return false; //disable key press
    var ch = String.fromCharCode(unicode);
    var pos = el.selectionStart;
    var value = [valueOld.slice(0, pos), ch, valueOld.slice(pos)].join('');
    if (value === '') {
        return;
    }
    if (value > 999999.99) {
        return false;
    }
    if (/^\d+$/.test(value)) {
        return;
    }
    if (/^\d+(\.|,)$/.test(value)) {
        return;
    }
    if (/^\d+(\.|,)\d{0,2}$/.test(value)) {
        return;
    }
    return false;
}

/**
 * Проверка корректности ввода email
 * @param e
 * @returns {boolean}
 */
function checkEmail(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    var el = e.target || e.srcElement;
    var valueOld = el.value || '';
    //if the key isn't the backspace key (which we should allow)
    if ((unicode === 37) || (unicode === 39) || (unicode === 8) || (unicode == 9)) {
        return true;
    }
    var ch = String.fromCharCode(unicode);
    var pos = el.selectionStart;
    //IE8 fix
    if (pos === undefined) {
        pos = valueOld.length;
    }
    var value = [valueOld.slice(0, pos), ch, valueOld.slice(pos)].join('');
    if (value === '') {
        return;
    }
    if (/^[a-zA-Z0-9._-]+$/.test(value)) {
        return;
    }
    if (/^[a-zA-Z0-9._-]+@$/.test(value)) {
        return;
    }
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(value)) {
        return;
    }
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
        return;
    }
    return false;
}

var cardDate = [];

/**
 * Allow 0-9, '/', 'left arrow', 'right arrow', 'backspace', 'delete'
 * @param e
 * @returns {boolean}
 */
function checkCardDateOnInput(e) {
    var rawValue = e.target.value;
    var rawValueTrimmed = rawValue.replace(/[^\/0-9]/g, '');
    var value = rawValue.replace(/[^0-9]/g, '');

    var oldValue = typeof(cardDate[e.target.id]) != typeof(undefined) ? cardDate[e.target.id] : '';
    if (oldValue.length != 0 && oldValue.length > rawValue.length) {
        cardDate[e.target.id] = e.target.value;
        return false;
    }
    var formattedValue = '';

    if (rawValueTrimmed.indexOf("/") != -1) {
        var month = rawValueTrimmed.substring(0, rawValueTrimmed.indexOf("/"));
        if (parseInt(month) > 12) {
            month = '12';
        }
        formattedValue = month + '/' + normalizeYear(rawValueTrimmed.substring(rawValueTrimmed.indexOf("/") + 1, rawValueTrimmed.length));
    } else {
        if (value.length >= 2) {
            var month = value.substring(0, 2);
            if (parseInt(month) > 12) {
                formattedValue = '12' + '/';
                formattedValue += normalizeYear(value.substring(1, 1 + Math.min(value.length - 1, 4)));
            } else {
                formattedValue = month + '/';
                if (value.length > 2) {
                    formattedValue += normalizeYear(value.substring(2, 2 + Math.min(value.length - 2, 4)));
                }
            }
        } else {
            formattedValue = value;
        }
    }
    e.target.value = formattedValue.replace(/\//g, ' / ');
    cardDate[e.target.id] = e.target.value;

    setTimeout(function () {
        this.selectionStart = this.selectionEnd = 10000;
    }, 0);
    var arr = formattedValue.replace(/\s\//g, '').split("/");
    if (arr.length == 2) {
        $('#month').val(arr[0]);
        $('#year').val(arr[1]);
    }
}

function normalizeYear(value) {
    if (value == '' || typeof(value) == typeof(undefined)) {
        return '';
    }
    var yearStr = '';
    var year = parseInt(value);
    if (isNaN(year) || typeof(year) == typeof(undefined)) {
        year = 0;
    }
    var nowYear = new Date().getFullYear();
    var millenium = parseInt(nowYear / 1000);
    var remainder = nowYear - millenium * 1000;
    var decade = parseInt(remainder / 10);
    if (year > 0 && year < 100) {
        if (year < 10) {
            yearStr = year;
        } else if (year < remainder) {
            yearStr = decade;
        } else {
            yearStr = year;
        }
    } else if (year >= 100 && year < millenium * 1000) {
        var tmp = year.toFixed();
        yearStr = tmp.substring(tmp.length - 2, tmp.length);
    }
    else if (year >= nowYear && year < (millenium + 1) * 1000) {
        yearStr = (year - (millenium * 1000));
    }
    return yearStr;
}

/**
 * Allow 0-9, '/', 'left arrow', 'right arrow', 'backspace', 'delete'
 * @param e
 * @returns {boolean}
 */
function checkCardDate(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    var el = e.target;
    var valueOld = el.value.replace(/\s/g, '') || '';
    //keyCode == 46 - delete, 37 - left arrow, 39 - right arrow, 47 - '/', 8 - backspace
    //дополнительная проверка на наличие дублирующихся '/'
    if (!(unicode >= 47 && unicode <= 58 || unicode === 8 || unicode === 37 || unicode === 39 || unicode === 9 || e.keyCode == 46) || (unicode == 47 && valueOld.indexOf('/') !== -1)) {
        return false;
    }
    var slash = String.fromCharCode(47);
    var divider = [' ', slash, ' '].join('');
    var pos = el.selectionStart;
    var char = String.fromCharCode(unicode);
    // ЦИфровой симфол
    if (unicode >= 48 && unicode <= 58) {
        //Ввводимый месяц больше 12 - не даем закончить ввод
        if (/^\d$/.test(valueOld) && parseInt(valueOld + char) > 12) {
            el.value = valueOld + ' / ' + char;
            return false;
        }
        // иначе добавляем ' / ' в конец
        else if (/^\d$/.test(valueOld) && parseInt(valueOld + char) <= 12) {
            el.value = valueOld + char + divider;
            return false;
        }
        // иначе если введено 2 цифры - добавляем после него разделитель и введенный символ
        else if (/^\d\d$/.test(valueOld) && parseInt(valueOld) <= 12) {
            el.value = valueOld + divider + char;
            return false;
        }
        // иначе если введена первая группа цифр и разделитель - форматируем ввод после разделителя
        else if (/^[\d]{1,2} {0,1}\/$/.test(valueOld)) {
            el.value = valueOld.replace('/', '') + ' / ' + char;
            return false;
        }
    }
    // Если введен слеш - то проверяем, есть ли пред ним введенные цифры
    if (unicode === 47) {
        if (!/^\d{1,2} {0,1}$/.test(valueOld)) {
            return false;
        } else {
            el.value = valueOld + ' / ';
            return false;
        }
    }
    var value = [valueOld.slice(0, pos), char, valueOld.slice(pos)].join('');
    var arr = value.split(slash);
    // не даем вводить символы, если после '/' уже введены 2 символа и пытаются ввести цифру, или получившееся число меньше текущего года.
    if (arr.length > 1 && (arr[1].length > 2 && unicode >= 48 && unicode <= 57 || arr[1].length == 2 && arr[1] < (new Date().getFullYear() - 2000))) {
        return false;
    }
}

/**
 * Проверка вводимого номера счета
 * @param event
 * @param obj
 * @returns {boolean|*}
 */
function checkAccount(event, obj) {
    /*if($(obj).val() == ''){
     $(obj).val('40817810');
     }*/ // Начало счета может быть любым
    return (checkDigits(event) === undefined || checkDigits(event)) && (($(obj).val().length < 20 || event.keyCode == 8)  /*backspace*/
        && !(/^40817810$/.test($(obj).val()) && event.keyCode == 8) );
}

/**
 *
 * @param e
 * @returns {boolean}
 */
function checkDigits(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    //if the key isn't the backspace key (which we should allow)
    //118 code = Ctrl+V
    if (e.shiftKey || (unicode < 48 || unicode > 57) && (unicode !== 46) && (unicode !== 9) && (unicode !== 37) && (unicode !== 39)) {
        return false; //disable key press
    }//if not a number
    return true;
}

function checkTextEng(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        return /^[A-Za-z0-9.,\s\-]+$/i.test(String.fromCharCode(unicode));
    }
}

function checkNameEng(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        return /^[A-Za-z\s\-]+$/i.test(String.fromCharCode(unicode));
    }
}

function checkLettersUnicode(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);
        return isValidChars(ch);
    }
}

function checkLettersUnicodeEng(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);

        return /^[-A-Z a-z]+$/i.test(ch);
    }
}

function checkLettersUnicodeRus(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);

        return /^[-А-ЯЁ а-яё]+$/i.test(ch);
    }
}

function checkPhone(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if ((unicode < 48 || unicode > 57) && (unicode !== 8) && (unicode !== 46) && (unicode !== 9) && (unicode !== 37) && (unicode !== 39)) //if not a number
    {
        var ch = String.fromCharCode(unicode);
        var s = "0123456789+-() ";
        return (s.indexOf(ch.toLowerCase()) >= 0);
    }
}

/**
 * function to check valid phone
 * @param phone
 * @returns {boolean}
 */
function isValidPhone(phone) {
    var validRegExp = /^[0-9+\- \(\)]+$/;
    return validRegExp.test(phone);
}

/**
 * function to check valid email address
 * @param email
 * @returns {boolean}
 */
function isValidEmail(email) {
    var validRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return validRegExp.test(email);
}

function isValidChars(str) {
    var notValidRegExp = /^[^0-9]+$/;
    var validRegExp = /^.{1,70}$/;
    if (notValidRegExp.test(str)) {
        return validRegExp.test(str);
    } else {
        return false;
    }
}

function isValidCVC(cvc) {
    return /^[0-9]{3}$/.test(cvc);
}

function checkNumber(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        return /^[0-9]+$/i.test(String.fromCharCode(unicode));
    }
}

function checkContractNumber(e) {
    if (checkDigits(e) !== false) {
        return;
    }
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 45 && (unicode != 61) && (unicode != 47) && (unicode != 92) && (unicode != 8470) && (unicode != 35)) {
        if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
            return /^[a-zа-я]+$/i.test(String.fromCharCode(unicode));
        }
    }
}

function checkContract(event, obj) {
    return (event.charCode == 47 || checkDigits(event) === undefined || checkDigits(event)) && (($(obj).val().length < 19 || event.keyCode == 8) );
}

function bss(card1, card2) {
    var list1 = binFeeValues['LIST1'];
    var list2 = binFeeValues['LIST2'];
    if (list1 === undefined || list2 === undefined)
        return undefined;
    var pan1inList1 = false;
    var pan2inList2 = false;

    for (i = 0; i < list1.length; i++) {
        if (card1.substr(0, list1[i].length) === list1[i]) {
            pan1inList1 = true;
            break;
        }
    }

    for (i = 0; i < list2.length; i++) {
        if (card2.substr(0, list2[i].length) === list2[i]) {
            pan2inList2 = true;
            break;
        }
    }

    return pan1inList1 && pan2inList2 ? 'LIST1_LIST2'
        : pan1inList1 && !pan2inList2 ? 'LIST1_ANY'
            : !pan1inList1 && pan2inList2 ? 'ANY_LIST2' : undefined;
}

function bin_fee_calc(bss, amount) {
    if (bss !== undefined) {
        if (binFeeValues[bss].ENABLE === true) {
            try {
                var percent = binFeeValues[bss].PERCENT;
                var fix = binFeeValues[bss].FIX;
                var notLess = binFeeValues[bss].NOT_LESS;
                var pu = trunc(amount / 100.0 * percent);
                var fee = notLess ? fix > pu ? fix : pu : pu + fix;
                var maxAmountActive = binFeeValues.MAX_FEE_ACTIVE;
                var maxFeeAmount = binFeeValues.MAX_FEE_AMOUNT;
                return (maxAmountActive && fee > maxFeeAmount) ? maxFeeAmount : fee;
            } catch (e) {
                return undefined;
            }
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}

function fee_calc(pss, amount) {
    try {
        var percent = feevalues[pss].PERCENT;
        var fix = feevalues[pss].FIX;
        var notLess = feevalues[pss].NOT_LESS;
        var pu = trunc(amount / 100.0 * percent);
        var fee = notLess ? fix > pu ? fix : pu : pu + fix;
        var maxAmountActive = feevalues.MAX_FEE_ACTIVE;
        var maxFeeAmount = feevalues.MAX_FEE_AMOUNT;
        return (maxAmountActive && fee > maxFeeAmount) ? maxFeeAmount : fee;
    } catch (e) {
        return 0;
    }
}

function checkAccountCorrect(account, bic) {
    var result = false;
    ch = GetControlKey(account, bic);
    for (i = 0; i < ch.length; i++) {
        result = result || (account.substr(8, 1) == ch[i]);
    }
    return result;
}

//Расчет контрольной цифры счета
function GetControlKey(account, bic) {

    var keys = new Array();
    var bics = bic.split(",");

    for (var b_i = 0; b_i < bics.length; b_i++) {
        var temp = '';
        var wght = new Array();
        var i;
        var s = 0;

        wght[0] = 3;
        wght[1] = 7;
        wght[2] = 1;
        temp = bics[b_i].substr(bics[b_i].length - 3, 3) + account.substr(0, 8) + '0' + account.substr(account.length - 11, 11);

        for (i = 0; i < 23; i++) {
            s = s + parseInt(temp.substr(i, 1)) * wght[(i + 1) % 3];
        }
        keys[b_i] = ((s % 10) * 3) % 10;

    }

    return keys;
}

function Calculate(Luhn) {
    var sum = 0;
    for (i = 0; i < Luhn.length; i++) {
        sum += parseInt(Luhn.substring(i, i + 1));
    }
    var delta = new Array(0, 1, 2, 3, 4, -4, -3, -2, -1, 0);
    for (i = Luhn.length - 1; i >= 0; i -= 2) {
        var deltaIndex = parseInt(Luhn.substring(i, i + 1));
        var deltaValue = delta[deltaIndex];
        sum += deltaValue;
    }
    var mod10 = sum % 10;
    mod10 = 10 - mod10;
    if (mod10 == 10) {
        mod10 = 0;
    }
    return mod10;
}

function debit_fee_calc(debitFee, amount) {
    if (debitFee !== undefined) {
        try {
            var percent = debitFee.PERCENT;
            var fix = debitFee.FIX;
            var notLess = debitFee.NOT_LESS;
            var pu = trunc(amount / 100.0 * percent);
            var fee = notLess ? fix > pu ? fix : pu : pu + fix;
            var maxAmountActive = debitFee.MAX_FEE_ACTIVE;
            var maxFeeAmount = debitFee.MAX_FEE_AMOUNT;
            return (maxAmountActive && fee > maxFeeAmount) ? maxFeeAmount : fee;
        } catch (e) {
            return undefined;
        }
    } else {
        return undefined;
    }
}

function isMaestro(pan) {
    return (pan !== undefined && pan !== '' && strStartsWith(pan, "6"));
}

function simpleCheckAccount(event, obj) {
    return (checkDigits(event) === undefined || checkDigits(event)) && (($(obj).val().length < 20 || event.keyCode == 8));
}
