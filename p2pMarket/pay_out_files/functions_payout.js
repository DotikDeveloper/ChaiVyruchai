// Флаг необходимости пересчета формы
var needsRecalc = true;

var ajaxHandler = function (data) {
    $.ajax({
        url: '/webapi/b2puser/PayOutFee',
        method: 'post',
        data: data,
        dataType: 'json',
        success: function (data) {
            $('#popup_loader').hide();
            $('#submitButton').prop({'disabled': false});

            if (data == undefined || data.success == false || (feePaidByReceiver && (getFloat(data.fee) > getFloat(getAmount()) * 100))) {
                if (data == undefined || data.success == false) {
                    alert(i18nMessage('errorCalculatingFeeTryAgain'));
                } else {
                    alert(i18nMessage('errorCalculatingFeeCheckAmount'));
                }
                return false;
            }

            fillForm(getFloat(getAmount()), data.data.fee);
            $('#submitButton').val(TRANSFER);
            needsRecalc = false;
        },
        error: function () {
            alert(i18nMessage('serviceError'));
            $('#popup_loader').hide();
            $('#submitButton').prop({'disabled': false});
        }
    });
};

function fillForm(amount, commission) {
    //Если комиссия рассчитана - указываем ее
    if (commission !== '' && commission !== undefined && !isNaN(commission)) {
        var totalAmount;
        if (feePaidByReceiver) {
            totalAmount = amount;
        } else {
            totalAmount = amount + commission / 100.0;
        }
        $('#totalAmount').text(totalAmount.toFixed(2));
        $('#totalCommission').text((commission / 100.0).toFixed(2));
        $('#fee_value').val(commission);
    }
    //Иначе прорисовываем прочерки
    else {
        $('#totalAmount').text('--');
        $('#totalCommission').text('--');
        $('#fee_value').val('');
    }
}

function getAmount() {
    return $('#amountControl').val().replace(',', '.');
}

$(document).ready(function () {


    var panPrevLength = 0;

    $('input[name=pan2]').on('input', function () {
        var self = $(this);
        var value = self.val().replace(/\s/g, '');

        var panCurrentLength = $(this).val();
        if((panPrevLength < panCurrentLength) && (value.length == 16 && ((/^5/.test(value)) || (/^4/.test(value))))) {
            if ($('input[name=emailTo]') != undefined && $('input[name=emailTo]').length > 0 && !$('input[name=emailTo]').is(":hidden") && $('input[name=emailTo]').prop('required')) {
                $('input[name=emailTo]').focus();
            } else {
                $('#submitButton').focus();
            }
        }
        panPrevLength = panCurrentLength;
    });


    // Признак необходимости обновления комиссии
    $('#fee_value').val('0');
    if (ORDER_FEE == undefined) {
        needsRecalc = true;
        $('#submitButton').val(CONTINUE).prop({'disabled': true});
    } else {
        needsRecalc = false;
    }

    $('#resolution').attr('value', screen.width + 'x' + screen.height);
    var now = new Date();
    $('#time_zone_offset').attr('value', -now.getTimezoneOffset() / 60);
    $('#browser_language').attr('value', window.navigator.userLanguage || window.navigator.language);
    $('#bits').attr('value', screen.colorDepth);

    //Placeholders for non-html5 browsers
    $('input').placeholder();

    function arrowSize() {
        $('#c2c_form_arrow').each(function () {
            var self = $(this),
                parent = self.prev(),
                borderWidth = parent.outerHeight() / 2;
            self.css({
                borderTopWidth: borderWidth + 'px',
                borderBottomWidth: borderWidth + 'px'
            });
        });
    }
    //Window sizing
    $(window).resize(function () {
        arrowSize();
    });
    arrowSize();

    //Validator
    $.extend($.validator.messages, {
        required: i18nMessage('requiredField'),
        email: i18nMessage('incorrectEmail'),
        number: i18nMessage('missingNumber')
    });

    $.validator.addMethod("panCustom", function (value, element) {
        var trimmedCard = $(element).val().replace(/\s/g, '');
        return /^[\d ]+$/.test($(element).val()) && (trimmedCard.length >= 16 && trimmedCard.length <= 19) && louna(trimmedCard);
    }, i18nMessage('incorrectPan'));
    $.validator.addMethod("emailCustom", function (value, element) {
        return $(element).val() == '' || isValidEmail($(element).val());
    }, i18nMessage('incorrectEmail'));
    $.validator.addMethod("numberCustom", function (value, element) {
        return /^\d+((,|\.)\d+)?$/.test($(element).val());
    }, i18nMessage('missingNumber'));
    $.validator.addMethod("blackBins2", function (value, element) {
        var val = value.replace(/\s/g, '');
        var invert = blackBins2.length > 0 && blackBins2[0].trim().lastIndexOf("!", 0) === 0;
        var retVal = false;
        if (blackBins2.length != 0) {
            for (var k in blackBins2) {
                if (blackBins2[k] == null || blackBins2[k] == undefined || blackBins2[k].replace == undefined) {
                    continue;
                }
                var bin = blackBins2[k].replace(/!/g, '');
                if (val.length > bin.length && val.lastIndexOf(bin, 0) === 0) {
                    retVal = true;
                    break;
                }
            }
        }
        return invert ? retVal : !retVal;
    }, i18nMessage('cardProhibited'));
    $.validator.addMethod("limits", function (value, element) {
        var summAll = parseFloat($('#amountControl').val().replace(",", "."));
        return limits.min == undefined || limits.max == undefined || (summAll >= limits.min / 100 && summAll <= limits.max / 100);
    }, i18nMessage('amountMustBeFrom') + getFloat(limits.min / 100) + i18nMessage('to') + getFloat(limits.max / 100) + cur);

    $('#payForm').validate({
        errorElement: "span",
        errorClass: 'has-error',
        errorPlacement: function (error, element) {
            if (!element.is('.selectized')) {
                element.tooltip('destroy');
                element.tooltip({
                    title: error.text(),
                    placement: 'bottom',
                    trigger: 'manual'
                }).tooltip('show');
            }
        },
        showErrors: function (errorMap, errorList) {
            this.defaultShowErrors();

            $('.selectize-control').removeClass('has-error');
            $('.selectize-control').tooltip('destroy');
            $.each(errorList, function (key, item) {
                var element = $(item.element);
                if (element.is('.selectized')) {
                    var selectized = element.next('.selectize-control');
                    selectized.addClass('has-error');
                    selectized.tooltip('destroy');
                    selectized.tooltip({
                        title: $(this)[0].message,
                        placement: 'bottom',
                        trigger: 'manual'
                    }).tooltip('show');
                }
            })
        },
        ignore: ':hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input, .ignore-validation',
        success: function (error, element) {
            $(element).tooltip('destroy');
        },
        rules: {
            emailTo: {
                emailCustom: true
            },
            pan2: {
                panCustom: true,
                blackBins2: true
            }
        },
        submitHandler: function (form) {
            // Убираем плейсхолдер, записанный в value при отправке формы
            if ($('input[name=emailTo]') != undefined && $('input[name=emailTo]')[0] != undefined && $('input[name=emailTo]')[0].value == 'E-mail') {
                $('input[name=emailTo]')[0].value = '';
            }
            //Проверяем на разрешение платежа для МПС
            var ps = cardType($('#cardTo').val());
            if (notifies[ps] != undefined && notifies[ps]['ENABLE'] != undefined && notifies[ps]['ENABLE']) {
                alert(notifies[ps]['MESSAGE']);
                return false;
            }
            //Вызываем дополнительную функцию проверки. Если функция возвращает false - то выходим из обработчика отправки формы, не отправляя форму.
            if (customAdditionalSubmitHandler !== undefined) {
                var checkResult = customAdditionalSubmitHandler(form);
                if (checkResult == false) {
                    return false;
                }
            }
            if (needsRecalc) {
                $('#popup_loader').show();
                $('#submitButton').prop({'disabled': true});
                var token2;
                if ($('input[name="token2"]') != undefined && $('input[name="token2"]')[0] != undefined) {
                    token2 = $('input[name="token2"]').val();
                }
                var data = {
                    'sector': $('input[name="sector"]').val(),
                    'amount': (getFloat(getAmount()) * 100).toFixed(0),
                    'from_client_ref': $('input[name="from_client_ref"]').val()
                };
                if (token2 != undefined) {
                    data['token2'] = token2;
                } else {
                    data['pan2'] = $('#cardTo').val().replace(/\s/g, '');
                }
                //Обработка ajax-запроса
                if (ajaxHandler != undefined) {
                    ajaxHandler(data);
                }
                return false;
            }

            return submitForm(form);
        }
    });
    $('#amountControl').rules('add', {
        numberCustom: true,
        limits: true
    });

    function submitForm(form) {
        $('#submitButton').attr('disabled', 'disabled');
        $('#popup_loader').show();
        if (feePaidByReceiver) {
            $('#amount').val((getFloat(getAmount()) * 100).toFixed(0) - $('#fee_value').val());
        } else {
            $('#amount').val((getFloat(getAmount()) * 100).toFixed(0));
        }
        return true;
    }

    $('#cardTo').on('keyup input', function () {

        var self = $(this);
        var icon = self.next('.form-control-feedback');
        var value = self.val().replace(/\s/g, '');
        // Correctness test
        if (value) {
            if (louna(value)) {
                self.removeClass('has-error2');
            } else {
                self.addClass('has-error2');
            }
        } else {
            self.removeClass('has-error2');
        }
        // Payment system icons
        icon.removeClass('visa-ico mastercard-ico maestro-ico mir-ico');
        if (value) {
            if (/^4/.test(value)) {
                icon.addClass('visa-ico');
            } else if (/^5/.test(value) || /^2[2-7]2/.test(value)) {
                icon.addClass('mastercard-ico');
            } else if (/^6/.test(value)) {
                icon.addClass('maestro-ico');
            } else if (/^220[0-4]/.test(value)) {
                icon.addClass('mir-ico');
            }
        }

        // Card formatting
        var match = /^(\d{4})[^\d]*(\d{4})[^\d]*(\d{4})[^\d]*(\d{4,7})$/.exec(value);
        if (match) {
            var groups = match.slice(1);
            self.val(groups.join(' '));
        }
    });

    $('#cardTo, #amountControl').each(function () {
        var self = $(this);
        var cardToEl = $('#cardTo');
        // keyup added for IE8 which doesnt have oninput event
        self.on('input', function () {
            var amount = getFloat(getAmount());
            var commission = 0;
            var pan2 = cardToEl.val().replace(/\s/g, '');
            // Если нет доступного алгоритма расчета комиссии - выполняем расчет по стандартному
            if (ORDER_FEE == undefined) {

                //Если есть изменение поля, но при этом флаг необходимости пересчета комиссии не установлен - устанавливаем его
                if (!needsRecalc) {
                    needsRecalc = true;
                    $('#submitButton').val(CONTINUE);
                }
                if (amount > 0 && pan2.length >= 16) {
                    needsRecalc = true;
                    $('#submitButton').prop({'disabled': false});
                } else {
                    $('#submitButton').prop({'disabled': true});
                }

            } else {
                commission = ORDER_FEE;
            }
            fillForm(amount, commission);

        }).trigger('input');
    });

    /**
     * Выпадающие списки для полей выбора карт
     */
    if (cardsByTokens != undefined) {
        createCardsDropdowns($('#cardTo'), cardsByTokens.receiverCards);
        var card2FilledWithToken = false;
        var initialTokens = {
            token2: $('input[name=token2]') != undefined && $('input[name=token2]').length > 0
        };
        var hasPan2Initially = $('input[name=pan2]') != undefined && $('input[name=pan2]').length > 0;

        $('#cardTo').each(function () {
            var self = $(this);
            var overCard = false;
            self.on('focusin', function () {
                $('#' + self.attr('id') + '_cards').show();
            });
            self.on('focusout', function () {
                if (!overCard) {
                    $('#' + self.attr('id') + '_cards').hide();
                }
            });

            self.parent().on('mouseover', '#' + self.attr('id') + '_cards', function () {
                overCard = true;
            });
            self.parent().on('mouseleave', '#' + self.attr('id') + '_cards', function () {
                overCard = false;
            });

            self.on('keypress', function () {
                prepareForToken(self, false);
            })
        });

        function prepareForToken(input, prepare, cardMask, token, month, year) {

            function getTokenElement(name) {
                var tokenEl = $('input[name=' + name + ']');
                if (tokenEl == undefined || tokenEl.length == 0) {
                    tokenEl = $('<input>').attr({'type': 'hidden', 'name': name});
                    $('#payForm').prepend(tokenEl);
                }
                return $('input[name=' + name + ']');
            }

            function dropTokenElement(name) {
                $('input[name=' + name + ']').remove();
            }

            if (prepare == true) {
                input.tooltip('destroy');
                input.addClass('ignore-validation').removeClass('has-error').removeAttr('name').removeAttr('required').val(cardMask).trigger('input');
                if (input.is('#cardTo')) {
                    getTokenElement('token2').val(token);
                    card2FilledWithToken = true;
                }
            } else {
                input.removeClass('ignore-validation');
                if (input.is('#cardTo') && card2FilledWithToken) {
                    dropTokenElement('token2');
                    input.val('').attr({'required': 'required', 'name': 'pan2'}).trigger('input');
                    card2FilledWithToken = false;
                }
            }
        }

        // Выбор карты из списка
        $('body').on('click', '.tokenCard', function () {
            var self = $(this);
            var input = self.parent().siblings('input');
            prepareForToken(input, true, self.data('cardMask'), self.data('token'), self.data('month'), self.data('year'));

            self.parent().hide();
        });

        function createCardsDropdowns(appendTo, cards) {
            if (cards != undefined && cards.length > 0) {
                var container = $('<div class="cards-container" id="' + appendTo.attr('id') + '_cards">');
                for (var i = 0; i < cards.length; i++) {
                    card = $('<div class="tokenCard">');
                    card.html(cards[i].cardMask);

                    span = $('<span>').attr('class', 'card-ico form-control-feedback');
                    var type = cardType(cards[i].cardMask);
                    if (type == 'VISA') {
                        span.addClass('visa-ico');
                    } else if (type == 'MASTERCARD') {
                        span.addClass('mastercard-ico');
                    } else if (type == 'MAESTRO') {
                        span.addClass('maestro-ico');
                    } else if (type == 'MIR') {
                        span.addClass('mir-ico');
                    }
                    card.append(span);
                    card.data({
                        'cardMask': cards[i].cardMask,
                        'month': cards[i].month,
                        'year': cards[i].year,
                        'token': cards[i].token
                    });
                    container.append(card);
                }
                appendTo.parent().append(container);
            }
        }
    }
});