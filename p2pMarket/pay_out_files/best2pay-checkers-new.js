function displayInline() {
	var f = document.getElementById('screen');
	f.style.display = "inline";
}
// function
function checkDigits(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    //if the key isn't the backspace key (which we should allow)
    if (e.shiftKey || (unicode < 48 || unicode > 57) && (unicode !== 8) && (unicode !== 46) &&  (unicode !== 9) && (unicode !== 37) && (unicode !== 39)) //if not a number
        return false; //disable key press
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

function checkLetters(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode !== 8 && (unicode !== 9) && (unicode !== 37) && (unicode !== 39)) { //if the key isn't the backspace key (which we should allow)
        var ch = String.fromCharCode(unicode);
        var s = "abcdefjhigklmnopqrstuvwyxyz-. ";
        return (s.indexOf(ch.toLowerCase()) >= 0);
    }
}

function checkCardNumber(e, el) {
    var value = el.value || '';
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (checkDigits(e) === false){
        return false;
    }
    if (unicode === 8){
        return;
    }
    if (/^\d{4}$/.test(value)){
        el.value = value + ' ';
        return;
    }
    if (/^\d{4}\s\d{4}$/.test(value)){
        el.value = value + ' ';
        return;
    }
    if (/^\d{4}\s\d{4}\s\d{4}$/.test(value)){
        el.value = value + ' ';
        return;
    }
}

function CardNumberFormat(e) {
    var el = e.target || e.srcElement;
    var match = /^(\d{4})[^\d]*(\d{4})[^\d]*(\d{4})[^\d]*(\d{4,7})$/.exec(el.value);
    if (match) {
        var groups = match.slice(1);
        el.value = groups.join(' ');
    }
}

function checkPrice(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    var el = e.target || e.srcElement;
    var valueOld = el.value || '';
    //if the key isn't the backspace key (which we should allow)
    if ((unicode === 37) || (unicode === 39) || (unicode === 8) || (unicode == 9)) {
        return true;
    }
    if ((unicode < 48 || unicode > 57) && (unicode !== 46) && (unicode !== 44)) //if not a number
        return false; //disable key press
    var ch = String.fromCharCode(unicode);
    var pos = el.selectionStart;
    //IE8 fix
    if(pos === undefined){
    	pos = valueOld.length;
    }
    var value = [valueOld.slice(0, pos), ch, valueOld.slice(pos)].join('');
    if (value === '') {
        return;
    }
    if (/^\d+$/.test(value)) {
        return;
    }
    if (/^\d+(\.|,)$/.test(value)) {
        return;
    }
    if (/^(\d{0,8})+(\.|,)\d{0,2}$/.test(value)) {
        return;
    }
    return false;
}

function isValidMonth(month) {
    if (checkDigits(e) === false) {
        return false;
    } else {
        return true;
    }
}

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
    if(pos === undefined){
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

function checkLettersUnicode(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);
        return isValidChars(ch);
    }
}

function checkLettersUnicodeRus(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);

        return /^[-АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ абвгдеёжзийклмнопрстуфхцчшщъыьэюя]+$/i.test(ch);
    }
}

function checkTextEng(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);

        return /^[A-Za-z0-9.,\s\-]+$/i.test(ch);
    }
}
function checkNameEng(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);

        return /^[A-Za-z\s\-]+$/i.test(ch);
    }
}

function checkNumber(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
        var ch = String.fromCharCode(unicode);
        return /^[0-9]+$/i.test(ch);
    }
}

function checkContractNumber(e) {
    if (checkDigits(e) !== false) {
        return;
    }
    var unicode = e.charCode ? e.charCode : e.keyCode;
    if (unicode != 45 && (unicode != 61) && (unicode != 47) && (unicode != 92) && (unicode != 8470) && (unicode != 35)) {
        if (unicode != 8 && (unicode != 9) && (unicode != 37) && (unicode != 39)) {
            var ch = String.fromCharCode(unicode);
            return /^[a-zа-я]+$/i.test(ch);
        }
    }
}

function checkContract(event, obj){
	return (event.charCode == 47 || checkDigits(event) === undefined || checkDigits(event)) && (($(obj).val().length < 19 || event.keyCode == 8) );
}

//function to check valid email address
function isValidEmail(email) {
    var validRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return validRegExp.test(email);
}

//function to check valid phone address
function isValidPhone(phone) {
    var validRegExp = /^[0-9+\- \(\)]+$/;
    return validRegExp.test(phone);
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
    var validRegExp = /^[0-9]{3}$/;
    return validRegExp.test(cvc);
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

function trunc(n) {
	return Math[n > 0 ? "round" : "ceil"](n);
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

function roundPlus(x, n) { //x - число, n - количество знаков
	if (isNaN(x) || isNaN(n))
		return false;
	var m = Math.pow(10, n);
	return Math.round(x * m) / m;
}

function doCancel() {
	document.data.action.value = "cancel";
	document.data.submit();
}

function doBack() {
	document.data.action.value = "back";
	document.data.submit();
}


function changeCountry(country) {
	document.data.country.value = country;
}

function del_spaces(str) {
	str = str.replace(/\s/g, '');
	return str;
}

function strStartsWith(str, prefix) {
	return str.indexOf(prefix) === 0;
}

function isMaestro(pan) {
	return (pan !== undefined && pan !== '' && strStartsWith(pan, "6"));
}

function isWM() {
	document.data.wm.value = "1";
	document.data.ym.value = "0";
	document.data.qiwi.value = "0";
	document.data.gorod.value="0";
}

function isYM() {
	document.data.wm.value = "0";
	document.data.ym.value = "1";
	document.data.qiwi.value = "0";
	document.data.gorod.value="0";

}

function isQIWI() {
	document.data.wm.value = "0";
	document.data.ym.value = "0";
	document.data.qiwi.value = "1";
	document.data.gorod.value="0";

}

function isGorod() {
	document.data.wm.value = "0";
	document.data.ym.value = "0";
	document.data.qiwi.value = "0";
	document.data.gorod.value="1";
}

function checkAccount(event, obj){
	if($(obj).val() == ''){
		$(obj).val('40817810');
	}
	return (checkDigits(event) === undefined || checkDigits(event)) && (($(obj).val().length < 20 || event.keyCode == 8)  /*backspace*/
			&& !(/^40817810$/.test($(obj).val()) && event.keyCode == 8) );
}

function simpleCheckAccount(event, obj){
	return (checkDigits(event) === undefined || checkDigits(event)) && (($(obj).val().length < 20 || event.keyCode == 8));
}

//Расчет контрольной цифры счета
function GetControlKey(account, bic){

	var keys = new Array();
	var bics = bic.split(",");

	for(var b_i = 0; b_i< bics.length; b_i++){
		var temp = '';
		var wght = new Array();
		var i;
		var s = 0;

		wght[0] = 3; wght[1] = 7; wght[2] = 1;
		temp = bics[b_i].substr(bics[b_i].length - 3, 3) + account.substr(0,8) + '0' + account.substr(account.length - 11, 11);

		for(i = 0; i< 23; i++){
			s = s + parseInt(temp.substr(i, 1)) * wght[(i+1) % 3];
		}
		keys[b_i] = ((s % 10) * 3) %10;

	}

	return keys;
}

function checkAccountCorrect(account, bic){
	var result = false;
	ch = GetControlKey(account, bic);
	for(i = 0; i < ch.length; i++){
		result = result || (account.substr(8,1) == ch[i]);
	}
	return result;
}

function getFloat(val) {
	if (typeof val == 'string') {
		val = parseFloat(val) || 0;
	}
	return val;
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
    //keyCode == 46 - delete
    //37 - left arrow, 39 - right arrow, 47 - '/', 8 - backspace
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
    //проверяем ввод года. если длина ввода больше 3 позиций и начинается не с 2 и меньше 2000 - тогда заменяем на "20" - начальные цифры 2000х годов
    /*else if(value.indexOf(slash) !== -1 && arr[1].length > 2 && arr[1] < 2000 && arr[1][0] != 2) {
        el.value = [arr[0], ' ' + slash + ' ', 20].join('');
        return false
    }*/
}