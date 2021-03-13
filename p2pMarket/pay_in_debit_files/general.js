var submitHandler = undefined;

var errorPlacementFn = function (error, element) {
    var inputField = element;
    inputField.tooltip('destroy');
    inputField.tooltip({
        title: '<img src="/webapi/template/common/img/valday/error.svg"\ class="tooltipImg">' + ' ' + error.text(),
        placement: 'bottom',
        trigger: 'manual',
        animated: 'fade',
        html: true
    }).tooltip('show');
};
var sendInProgress = false;

// Дефолтный цвет карты
var defaultColorCard = '#455a64';
var defaultColorText = '#ffffff';
var oldLogo = undefined;
var borderColor = {r: 255, g: 255, b: 255, o: 0.1};
var borderColorOnFocus = {r: 255, g: 255, b: 255, o: 0.5};
var defaultBorderColor = {r: 255, g: 255, b: 255, o: 0.5};
var defaultBorderColorOnFocus = {r: 255, g: 255, b: 255, o: 0.5};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
var formValidate = function () {
    $('#pageForm').validate({
        errorElement: "span",
        errorClass: 'has-error',
        errorPlacement: errorPlacementFn,
        showErrors: function (errorMap, errorList) {
            this.defaultShowErrors();
        },
        ignore: ':hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input, .ignore-validation, .ignore-validation-runtime, [readonly]',
        success: function (error, element) {
            $(element).tooltip('destroy');
        },
        rules: {},
        submitHandler: function (form) {
            try {
                if ($(form).find('input[name=date]') != undefined && $(form).find('input[name=date]').length != 0) {
                    var monthYear = $(form).find('input[name=date]').val().replace(/\s/g, '').split('/');
                    if (monthYear.length == 2) {
                        $('#month').val(monthYear[0]);
                        $('#year').val(monthYear[1]);
                    }
                }
            } catch (e) {
                //console.log('Error parsing card date: ' + e);
                return false;
            }

            $(form).find('input, select, textarea').each(function () {
                var self = $(this);
                if (typeof self.attr('clear-name') !== typeof undefined && self.attr('clear-name') !== false) {
                    self.removeAttr('name');
                }
            })

            var retVal = false;
            if (submitHandler !== undefined) {
                retVal = submitHandler(form);
            } else {
                retVal = true;
            }
            if (retVal) {
                $('#popup_loader').css('display', 'flex');
                $('#content-data').hide();
                $('#submitButton').prop({'disabled': true});
            }
            return retVal;
        }
    });
};
var showSendResultGlobal = function(imgUrl, title, text) {

    $('#feedback > div').remove();
    $('#feedback')
        .append(
            $('<div id="send-close">')
                .append(
                    $('<a href="#" title="">').append($('<img src="/webapi/template/common/img/valday/close.svg" alt=""/>'))
                )
        )
        .append(
            $('<div class="message-sent-result">')
                .append($('<img src="' + imgUrl + '" alt="" />'))
                .append(
                    $('<div>')
                        .append($('<h3>').html(title))
                        .append($('<p>').html(text))
                )
        )
};
var feedbackFormShow = function() {
    if (sendInProgress) {
        return false;
    }

    $('#content-data').hide();
    $('#content-data').siblings().each(function () {
        $(this).remove();
    });

    var feedback = $('<div id="feedback">').append($('<form id="feedback-form" class="ordinal-form">')
        .append($('<div>')
            .append(
                $('<div id="feedback-wrapper" class="content-wrapper">')

                    .append(
                        $('<div id="feedback-title">')
                            .append($('<img src="/webapi/template/common/img/valday/feedback-send.svg" alt=""/>'))
                            .append($('<h3>' + i18nMessage('feedbackForm') + '</h3>'))
                    )
                    .append(
                        $('<div id="feedback-content">')
                            .append(
                                $('<div class="input-field">')
                                    .append($('<label class="card-label">' + i18nMessage('email') + '</label>'))
                                    .append($('<input type="text" autocomplete="off" placeholder="username@mail.com" id="feedback-email" required name="email"/>'))
                            )
                            .append(
                                $('<div class="input-field">')
                                    .append($('<label class="card-label">' + i18nMessage('yourMessage') + '</label>'))
                                    .append($('<textarea name="message" id="feedback-message" required autocomplete="off"></textarea>'))
                            )
                    )
            ).append(
                $('<div class="action-buttons">')
                    .append(
                        $('<div class="send-container">')
                            .append($('<button type="submit" id="send-feedback-button">' + i18nMessage('send') + '</button>'))
                    )
                    .append($('<div class="cancel-container">').append($('<a href="#" id="feedback-close" title="' + i18nMessage('cancel') + '">' + i18nMessage('cancel') + '</a>')))
            )
        )
    );
    $('#content').append(feedback);
    $('#feedback').fadeIn();

    $('#feedback-form').validate({
        errorElement: "span",
        errorClass: 'has-error',
        errorPlacement: errorPlacementFn,
        showErrors: function (errorMap, errorList) {
            this.defaultShowErrors();
        },
        ignore: ':hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input, .ignore-validation, .ignore-validation-runtime',
        success: function (error, element) {
            $(element).tooltip('destroy');
        },
        rules: {
            'email': {
                validateEmail: true
            }
        },
        submitHandler: function (form) {
            sendInProgress = true;
            var feedbackData = {
                email: $('#feedback-email').val(),
                message: $('#feedback-message').val(),
                sector: $('input[name=sector]') != undefined && $('input[name=sector]').length != 0 ? $('input[name=sector]').val() : null,
                id: $('input[name=id]').val() != undefined && $('input[name=id]').val().length != 0 ? $('input[name=id]').val() : null
            };

            $('#feedback > *').remove();
            $('#feedback').append(
                $('<div class="message-sending-status">')
                    .append($('<img src="/webapi/template/common/img/valday/feedback-sending.svg" alt=""/>'))
                    .append($('<h3>' + i18nMessage('sendingInProgress') + '</h3>'))
            );

            $.ajax({
                url: '/webapi/mailer/SendFeedback',
                data: feedbackData,
                method: 'post',
                dataType: 'json',
                success: function (data) {
                    sendInProgress = false;
                    if (data != undefined && data.success == true) {
                        showSendResultGlobal('/webapi/template/common/img/valday/feedback-sent.svg', i18nMessage('messageSent'), i18nMessage('weWillContactYou'));
                    } else {
                        showSendResultGlobal('/webapi/template/common/img/valday/message-error.svg', i18nMessage('errorOccurred'), i18nMessage('pleaseRepeatSending'));
                    }
                },
                error: function () {
                    sendInProgress = false;
                    showSendResultGlobal('/webapi/template/common/img/valday/message-error.svg', i18nMessage('errorOccurred'), i18nMessage('noInternet'));
                }
            })

            return false;
        }
    });
    return false;
};

var identifyCard = function (self) {

    var value = self.val().replace(/\s/g, '');
    var ps = cardType(self.val().replace(/\s/g, ''));
    var card = self.parents('.card');
    var logo = self.parents('.card').find('.ps-logo');

    logo.find('div').hide();
    if (ps == 'VISA') {
        logo.find('.ps-visa').show();
    } else if (ps == 'MIR') {
        logo.find('.ps-mir').show();
    } else if (ps == 'MASTERCARD') {
        logo.find('.ps-mc').show();
    } else if (ps == 'MAESTRO') {
        logo.find('.ps-mc').show();
    } else {
    }

    // Cvc label depending of the card type
    if ($('#cvc-label') != undefined && $('#cvc-label').length > 0) {
        if (ps == 'MIR') {
            if (language !== 'ENGLISH' && language !== 'ENG') {
                $('#cvc-label').html('ППК');
            } else {
                $('#cvc-label').html('CVP2');
            }
        } else if (ps == 'VISA') {
            $('#cvc-label').html('CVV');
        } else {
            $('#cvc-label').html('CVC');
        }
    }

    // card number formatting
    var match = /^(\d{4})[^\d]*(\d{4})[^\d]*(\d{4})[^\d]*(\d{4,7})$/.exec(value);
    if (match) {
        var groups = match.slice(1);
        self.val(groups.join(' '));
    }

    // Bank logos
    if (typeof(getBankFromPan) !== typeof(undefined)) {
        var bankLogo = getBankFromPan(self.val().replace(/\s/g, ''));
        if (bankLogo != undefined) {
            if (oldLogo != bankLogo) {
                $('#card-1-bank-logo').css('background-image', 'url(' + bankLogo.url + ')');
                card.css('background-color', bankLogo.color);
                card.find('.input-field').css('color', bankLogo.textColor);
                borderColor = hexToRgb(bankLogo.textColor);
                card.find('.card-input').each(function () {
                    if ($(this).is(":focus")) {
                        $(this).css({'border-color': 'rgba(' + borderColorOnFocus.r + ', ' + borderColorOnFocus.g + ', ' + borderColorOnFocus.b + ', ' + borderColorOnFocus.o + ')'})
                    } else {
                        $(this).css({'border-color': 'rgba(' + borderColor.r + ', ' + borderColor.g + ', ' + borderColor.b + ', ' + borderColor.o + ')'})
                    }
                });
                card.find('svg').css({'fill': bankLogo.textColor, 'color': bankLogo.textColor});
                oldLogo = bankLogo;
            }
        } else {
            $('#card-1-bank-logo').css('background-image', '');
            card.find('.input-field').css('color', defaultColorText);
            card.find('.card-input').each(function () {
                if ($(this).is(":focus")) {
                    $(this).css({'border-color': 'rgba(' + defaultBorderColorOnFocus.r + ', ' + defaultBorderColorOnFocus.g + ', ' + defaultBorderColorOnFocus.b + ',  ' + defaultBorderColorOnFocus.o + ')'});
                } else {
                    $(this).css({'border-color': 'rgba(' + defaultBorderColor.r + ', ' + defaultBorderColor.g + ', ' + defaultBorderColor.b + ', ' + defaultBorderColor.o + ')'})
                }
            });
            card.find('svg').css({'fill': '#ffffff', 'color': '#ffffff'});
            oldLogo = undefined;

            if (value.length >= 16) {
                if (ps == 'VISA') {
                    card.css('background-color', '#004F8B');
                } else if (ps == 'MIR') {
                    card.css('background-color', '#3EA537');
                } else if (ps == 'MASTERCARD' || ps == 'MAESTRO') {
                    card.css('background-color', '#F79E1B');
                } else {
                    card.css('background-color', defaultColorCard);
                }
            } else {
                card.css('background-color', defaultColorCard);
            }
        }
    }
};

//Страны бинов карт
var card1Country = 'RU';
var card2Country = 'RU';
$(document).ready(function () {

    if ($("#cvc-tooltip") != undefined && $("#cvc-tooltip").length > 0) {
        $("#cvc-tooltip").tooltip();
    }

    /**
     * Обработчик ввода полей с номером карты
     */
        // Для предотвращения перерисовки лого при каждом нажатии

    $('.card-input').on('focus', function () {
        $(this).css({'border-color': 'rgba(' + borderColorOnFocus.r + ', ' + borderColorOnFocus.g + ', ' + borderColorOnFocus.b + ', '+ borderColorOnFocus.o + ')'});
    });
    $('.card-input').on('focusout', function () {
        $(this).css({'border-color': 'rgba(' + borderColor.r + ', ' + borderColor.g + ', ' + borderColor.b + ', ' + borderColor.o + ')'});
    });

    $('.card-number').on('input', function () {
        var self = $(this);
        identifyCard(self);
    }).trigger('input');

    /**
     * Форматирование карты
     */
    $('#cardFrom, #cardTo').on('keypress', function (event) {
        return checkCardNumber(event, this);
    });
    /**
     * Форматирование срока действия
     */
    $('#cardDate').on('input', function (event) {
        checkCardDateOnInput(event);
        if ($('#cvc') != undefined && $('#cvc').length > 0) {
            if ($(this).val().length >= 7) {
                $('#cvc').focus();
            }
        }
    });


    // bins - хранит бины карт и флажки, требуется ли для бинов запрос об их странах
    // firstRequest - флажок, который устанавливается в true только после первого запроса.
    // Смысл такой, чтобы первый запрос осуществить только когда заполнены оба бина карт.
    var bins = {cardFrom: {bin: '', ready: false}, cardTo: {bin: '', ready: false}, firstRequest: true};
    $('#cardFrom, #cardTo').each(function () {
        var self = $(this);
        var hasCard2 = $('#cardTo') != undefined && $('#cardTo').length > 0;
        self.on('input', function () {
            var pan1 = $('#cardFrom').val().replace(/\s/g, '');
            var pan2 = hasCard2 ? $('#cardTo').val().replace(/\s/g, '') : '';
            // Подготовка к определению страны бина карт
            if (pan1.length >= 6 && bins.cardFrom.bin != pan1.substring(0, 6)) {
                bins.cardFrom.ready = true;
            }
            if (pan2.length >= 6 && bins.cardTo.bin != pan2.substring(0, 6)) {
                bins.cardTo.ready = true;
            }
            bins.cardFrom.bin = pan1.substring(0, 6);
            bins.cardTo.bin = pan2.substring(0, 6);
            if (
                (bins.firstRequest && bins.cardFrom.ready && (!hasCard2 || bins.cardTo.ready)) ||
                (!bins.firstRequest && (bins.cardFrom.ready || bins.cardTo.ready))
            ) {
                bins.firstRequest = false;
                bins.cardFrom.ready = false;
                bins.cardTo.ready = false;
                $.ajax({
                    method: 'post',
                    url: '/webapi/BinCountry',
                    dataType: 'json',
                    data: {
                        bin1: bins.cardFrom.bin,
                        bin2: bins.cardTo.bin
                    },
                    success: function (data) {
                        if (data.success == true) {
                            if (data.bin1 != undefined && data.bin1.country != undefined && data.bin1.country != null && data.bin1.country != '') {
                                card1Country = data.bin1.country;
                            }
                            if (data.bin2 != undefined && data.bin2.country != undefined && data.bin2.country != null && data.bin2.country != '') {
                                card2Country = data.bin2.country;
                                // Если карта получателя иностранная - показываем блок ввода данных для иностранного перевода
                                // TODO - trigger
                            }
                        }
                        // Делаем триггер на поле карты отправителя, чтобы вызвать пересчет комиссии
                        if ($('#cardFrom') != undefined && $('#cardFrom').length > 0) {
                            $('#cardFrom').trigger('input');
                        }
                    },
                    error: function () {
                        bins.firstRequest = true;
                        alert(i18nMessage('requestErrorTryLater'));
                    }
                })
            }
        });
    });

    if ($.validator != undefined) {
        //Validator
        $.extend($.validator.messages, {
            required: i18nMessage('requiredField'),
            email: i18nMessage('incorrectEmail'),
            number: i18nMessage('missingNumber'),
            maxlength: i18nMessage('enterNoMoreThan'),
            minlength: i18nMessage('enterNoLessThan')

        });
        $.validator.addMethod("validatePan", function (value, element) {
            var trimmedCard = $(element).val().replace(/\s/g, '');
            return /^[\d ]+$/.test($(element).val()) && (trimmedCard.length >= 16 && trimmedCard.length <= 19) && louna(trimmedCard);
        }, i18nMessage('incorrectPan'));
        $.validator.addMethod("validateFio", function (value, element) {
            return $(element).val() == '' || /^[А-ЯЁа-яё-]+[ ]+[А-ЯЁа-яё-]+([ А-ЯЁа-яё-]+)*$/.test($(element).val());
        }, i18nMessage('enterName'));
        $.validator.addMethod("validatePhone", function (value, element) {
            return $(element).val() == '' || isValidPhone($(element).val());
        }, i18nMessage('invalidPhoneNumber'));
        $.validator.addMethod("validateEmail", function (value, element) {
            return $(element).val() == '' || isValidEmail($(element).val());
        }, i18nMessage('invalidEmail'));
        $.validator.addMethod("validateCVC", function (value, element) {
            if ($(element).val() == '' || /^6/.test($('#cardFrom').val())) {
                return true;
            }
            return isValidCVC($(element).val());
        }, i18nMessage('incorrectSecurityCode'));
        $.validator.addMethod("pan2NotEqualPan1", function (value, element) {
            return $('#cardTo').val() != $('#cardFrom').val();
        }, i18nMessage('cardNumbersMatch'));
        $.validator.addMethod("blackBins", function (value, element) {
            return checkBlackBins(value, blackBins);
        }, i18nMessage('cardProhibited'));
        $.validator.addMethod("blackBins2", function (value, element) {
            return checkBlackBins(value, blackBins2);
        }, i18nMessage('cardProhibited'));
        function checkBlackBins(value, list) {
            var val = value.replace(/\s/g, '');
            var invert = list.length > 0 && list[0].lastIndexOf("!", 0) === 0;
            var retVal = false;
            if (list.length != 0) {
                for (var k in list) {
                    if (list[k] == null || list[k] == undefined || list[k].replace == undefined) {
                        continue;
                    }
                    var bin = list[k].replace(/!/g, '');
                    if (val.length > bin.length && val.lastIndexOf(bin, 0) === 0) {
                        retVal = true;
                        break;
                    }
                }
            }
            return invert ? retVal : !retVal;
        }

        if (typeof limits !== typeof undefined) {
            $.validator.addMethod("limits", function (value, element) {
                var summAll = parseFloat($('#amountControl').val().replace(",", "."));
                return limits.min == undefined || limits.max == undefined || (summAll >= limits.min / 100 && summAll <= limits.max / 100);
            }, i18nMessage('amountMustBeFrom') + getFloat(limits.min / 100) + i18nMessage('to') + getFloat(limits.max / 100) + cur);
        }
        $.validator.addMethod("amount", function (value, element) {
            return /^\d*([,.]{1}\d{1,2}){0,1}$/.test(value);
        }, i18nMessage('incorrectAmount'));
        $.validator.addMethod("validateCardDate", function (value, element) {
            return $(element).val() == '' || /^(0{0,1}[1-9]|1[012])\s{0,1}\/\s{0,1}(2[0-9]){0,1}\d\d$/.test($(element).val());
        }, i18nMessage('expirationFormat'));
        $.validator.addMethod("accountNumberLength", function (value, element) {
            return /^\d{20}$/.test($(element).val());
        }, i18nMessage('accountNumberLength'));
        $.validator.addMethod("sectorBinsList1", function (value, element) {
            if (sectorBinList == undefined) {
                return true;
            }
            return checkSectorBins($(element), sectorBinList.LIST1, $('#cardTo'), sectorBinList.LIST2, sectorBinList.LIST1_ANY, card1Country);
        }, i18nMessage('cardProhibited'));
        $.validator.addMethod("sectorBinsList2", function (value, element) {
            if (sectorBinList == undefined) {
                return true;
            }
            return checkSectorBins($(element), sectorBinList.LIST2, $('#cardFrom'), sectorBinList.LIST1, sectorBinList.ANY_LIST2, card2Country);
        }, i18nMessage('cardProhibited'));

        function checkSectorBins(element, binListFirst, secondCard, binListSecond, settings, cardCountry) {
            var valid = true;
            var isInList = false;
            var val = element.val().replace(/\s/g, '');
            if (binListFirst.length != 0) {
                for (var k in binListFirst) {
                    if (binListFirst[k] == null || binListFirst[k] == undefined || binListFirst[k].replace == undefined) {
                        continue;
                    }
                    var bin = binListFirst[k].replace(/!/g, '');
                    if (val.length > bin.length && val.lastIndexOf(bin, 0) === 0) {
                        isInList = true;
                        break;
                    }
                }
            }
            if (isInList) {
                if (sectorBinList.LIST1_LIST2.All && secondCard != undefined && secondCard.length > 0) {
                    var isInList2 = false;
                    var val2 = secondCard != undefined && secondCard.length > 0 ? secondCard.val().replace(/\s/g, '') : '';
                    if (binListSecond.length != 0) {
                        for (var k in binListSecond) {
                            if (binListSecond[k] == null || binListSecond[k] == undefined || binListSecond[k].replace == undefined) {
                                continue;
                            }
                            var bin2 = binListSecond[k].replace(/!/g, '');
                            if (val2.length > bin2.length && val2.lastIndexOf(bin2, 0) === 0) {
                                isInList2 = true;
                                break;
                            }
                        }
                    }
                    if (isInList2) {
                        if (sectorBinList.LIST1_LIST2.All) {
                            if ((sectorBinList.LIST1_LIST2.Local && cardCountry == 'RU') || (sectorBinList.LIST1_LIST2.Int && cardCountry != 'RU')) {
                                valid = false;
                            }
                        }
                    }
                }
                // Проверка имеет смысл только если не прошла проверка по двум спискам
                if (valid && settings.All) {
                    if ((settings.Local && cardCountry == 'RU') || (settings.Int && cardCountry != 'RU')) {
                        valid = false;
                    }
                }
            }
            if (valid && secondCard != undefined && secondCard.length > 0) {
                secondCard.removeClass('has-error').tooltip('destroy');
            }
            return valid;
        }

        if ($('#pageForm') != undefined) {
            formValidate();
        }
    }

    /**
     * Feedback
     */
    $('#feedback-link').on('click', function () {
        feedbackFormShow();
    });

    $('#content').on('click', '#feedback-close, #send-close a', function () {
        hideSendResult();
        return false;
    });


    function hideSendResult() {
        $('#feedback').remove();
        $('#content-data').fadeIn();
    }
});

// где не работает keypress
$.fn.blockInput = function (options)
{
    // find inserted or removed characters
    function findDelta(value, prevValue)
    {
        var delta = '';

        for (var i = 0; i < value.length; i++) {
            var str = value.substr(0, i) +
                value.substr(i + value.length - prevValue.length);

            if (str === prevValue) delta =
                value.substr(i, value.length - prevValue.length);
        }

        return delta;
    }

    function isValidChar(c)
    {
        return new RegExp(options.regex).test(c);
    }

    function isValidString(str)
    {
        for (var i = 0; i < str.length; i++)
            if (!isValidChar(str.substr(i, 1))) return false;

        return true;
    }

    this.filter('input,textarea').on('input', function ()
    {
        var val = this.value,
            lastVal = $(this).data('lastVal');

        // get inserted chars
        var inserted = findDelta(val, lastVal);
        // get removed chars
        var removed = findDelta(lastVal, val);
        // determine if user pasted content
        var pasted = inserted.length > 1 || (!inserted && !removed);

        if (pasted)
        {
            if (!isValidString(val)) this.value = lastVal;
        }
        else if (!removed)
        {
            if (!isValidChar(inserted)) this.value = lastVal;
        }

        // store current value as last value
        $(this).data('lastVal', this.value);
    }).on('focus', function ()
    {
        $(this).data('lastVal', this.value);
    });

    return this;
};