//Страны бинов карт
var card1Country = 'RU';
var errorPlacementFn = function (error, element) {
    if (!element.is('.selectized')) {
        element.tooltip('destroy');
        element.tooltip({
            title: error.text(),
            placement: 'bottom',
            trigger: 'manual'
        }).tooltip('show');
    }
};
$(document).ready(function () {

    $('#resolution').val(screen.width + 'x' + screen.height);
    var now = new Date();
    $('#time_zone_offset').val(-now.getTimezoneOffset() / 60);
    $('#browser_language').attr('value', window.navigator.userLanguage || window.navigator.language);
    $('#bits').attr('value', screen.colorDepth);

    var panPrevLength = 0;
    $('input[name=pan]').on('input', function () {
        var self = $(this);
        var value = self.val().replace(/\s/g, '');

        var panCurrentLength = $(this).val();
        if ((panPrevLength < panCurrentLength) && (value.length == 16 && ((/^5/.test(value)) || (/^4/.test(value))))) {
            if ($('input[name=name]') !== undefined && $('input[name=name]').length > 0 && !$('input[name=name]').is(":hidden")) {
                $('input[name=name]').focus();
            } else if ($('#cardDate') !== undefined && $('#cardDate').length > 0 && !$('#cardDate').is(":hidden")) {
                $('#cardDate').focus();
            } else if ($('[name=month]') !== undefined && $('[name=month]').length > 0 && !$('[name=month]').is(":hidden")) {
                $('[name=month]').focus();
            }
        }
        panPrevLength = panCurrentLength;
    });

    $('input[name=cvc]').on('input', function () {
        if ($(this).val().length === 3 && $('input[name=email]') !== undefined && $('input[name=email]').length > 0 && $('input[name=email]').prop('required')) {
            $('input[name=email]').focus();
        }
    });

    $.extend($.validator.messages, {
        required: i18nMessage('requiredField', 'Поле обязательно'),
        email: i18nMessage('incorrectEmail', 'Неверный email')
    });
    $.validator.addMethod("emailCustom", function (value, element) {
        return $(element).val() === '' || isValidEmail($(element).val());
    }, i18nMessage('incorrectEmail', 'Неверный email'));
    $.validator.addMethod("cvc", function (value, element) {
        // Разрешаем для всех карт, если не заполнен
        if (!$(element).val()) {
            return true;
        }
        if (/^6/.test($('#card').val()) && !$(element).val()) {
            return true;
        }
        return isValidCVC($(element).val());
    }, i18nMessage('incorrectSecurityCode', 'Неверный код безопасности'));
    $.validator.addMethod("pan", function (value, element) {
        var trimmedCard = $(element).val().replace(/\s/g, '');
        return /^[\d ]+$/.test($(element).val()) && (trimmedCard.length >= 16 && trimmedCard.length <= 19) && louna(trimmedCard);
    }, i18nMessage('incorrectPan', 'Неверный номер карты'));
    $.validator.addMethod("blackBins", function (value, element) {
        var val = value.replace(/\s/g, '');
        var invert = blackBins.length > 0 && blackBins[0].lastIndexOf("!", 0) === 0;
        var retVal = false;
        if (blackBins.length !== 0) {
            for (var k in blackBins) {
                if (blackBins[k] == null || blackBins[k] === undefined || blackBins[k].replace === undefined) {
                    continue;
                }
                var bin = blackBins[k].replace(/!/g, '');
                if (val.length > bin.length && val.lastIndexOf(bin, 0) === 0) {
                    retVal = true;
                    break;
                }
            }
        }
        return invert ? retVal : !retVal;
    }, i18nMessage('cardProhibited', 'Операция с использованием указанных карточных реквизитов запрещена'));
    $.validator.addMethod("ownBins", function (value, element) {
        var val = value.replace(/\s/g, '');
        return !HAS_OWN_CARD || (val.length < 6 || (val.length > 6 && $.inArray(val.substr(0, 6), ownBins) !== -1));
    }, i18nMessage('cardDoesntMatchSelected', 'Указанная карта не соответствует категории карты, выбранной на первой странице'));
    $.validator.addMethod("sectorBinsList1", function (value, element) {
        if (sectorBinList == undefined) {
            return true;
        }
        return checkSectorBins($(element), sectorBinList.LIST1, undefined, undefined, sectorBinList.LIST1_ANY, card1Country);
    }, i18nMessage('cardProhibited', 'Операция с использованием указанных карточных реквизитов запрещена'));

    function checkSectorBins(element, binListFirst, secondCard, binListSecond, settings, cardCountry) {
        var valid = true;
        var isInList = false;
        var val = element.val().replace(/\s/g, '');
        if (binListFirst.length !== 0) {
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
            if (sectorBinList.LIST1_LIST2.All && secondCard !== undefined && secondCard.length > 0) {
                var isInList2 = false;
                var val2 = secondCard !== undefined && secondCard.length > 0 ? secondCard.val().replace(/\s/g, '') : '';
                if (binListSecond.length !== 0) {
                    for (var k in binListSecond) {
                        if (binListSecond[k] == null || binListSecond[k] === undefined || binListSecond[k].replace === undefined) {
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
                        if ((sectorBinList.LIST1_LIST2.Local && cardCountry === 'RU') || (sectorBinList.LIST1_LIST2.Int && cardCountry !== 'RU')) {
                            valid = false;
                        }
                    }
                }
            }
            // Проверка имеет смысл только если не прошла проверка по двум спискам
            if (valid && settings.All) {
                if ((settings.Local && cardCountry === 'RU') || (settings.Int && cardCountry !== 'RU')) {
                    valid = false;
                }
            }
        }
        if (valid && secondCard !== undefined && secondCard.length > 0) {
            secondCard.removeClass('has-error').tooltip('destroy');
        }
        return valid;
    }

    $('#payForm').validate({
        errorElement: "span",
        errorClass: 'has-error',
        errorPlacement: errorPlacementFn,
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
        ignore: ':hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input',
        success: function (error, element) {
            $(element).tooltip('destroy');
        },
        rules: {
            email: {
                emailCustom: true
            },
            cvc: {
                cvc: true,
                required: {
                    depends: function (element) {
                        //return !/^6/.test($('#card').val());
                        return false;
                    }
                }
            },
            pan: {
                pan: true,
                blackBins: true,
                ownBins: true,
                sectorBinsList1: true
            }
        },
        submitHandler: function (form) {
            var ps = cardType($('#card').val());
            if (notifies[ps] !== undefined && notifies[ps]['ENABLE'] !== undefined && notifies[ps]['ENABLE']) {
                alert(notifies[ps]['MESSAGE']);
                return false;
            }

            //Вызываем дополнительную функцию проверки. Если функция возвращает false - то выходим из обработчика отправки формы, не отправляя форму.
            if (customAdditionalSubmitHandler !== undefined && customAdditionalSubmitHandler(form) === false) {
                return false;
            }

            $('#submitButton').prop('disabled', true).attr('disabled', 'disabled');
            $('#popup_loader').show();
            return true;
        }
    });

    $('#card').on('keyup input', function () {
        var self = $(this);
        var value = self.val().replace(/\s/g, '');
        if (value) {
            if (louna(value)) {
                self.removeClass('has-error2');
            } else {
                self.addClass('has-error2');
            }
        } else {
            self.removeClass('has-error2');
        }
        // Card formatting
        var match = /^(\d{4})[^\d]*(\d{4})[^\d]*(\d{4})[^\d]*(\d{4,7})$/.exec(value);
        if (match) {
            var groups = match.slice(1);
            self.val(groups.join(' '));
        }
    });

    // bins - хранит бины карт и флажки, требуется ли для бинов запрос об их странах
    var bins = {cardFrom: {bin: '', ready: false}, cardTo: {bin: '', ready: false}};
    $('#card').on('input', function () {
        var pan1 = $('#card').val().replace(/\s/g, '');
        // Подготовка к определению страны бина карт
        if (pan1.length >= 6 && bins.cardFrom.bin !== pan1.substring(0, 6)) {
            bins.cardFrom.ready = true;
        }
        bins.cardFrom.bin = pan1.substring(0, 6);
        if (bins.cardFrom.ready) {
            bins.cardFrom.ready = false;
            $.ajax({
                method: 'post',
                url: '/webapi/BinCountry',
                dataType: 'json',
                data: {
                    bin1: bins.cardFrom.bin,
                    bin2: bins.cardTo.bin
                },
                success: function (data) {
                    if (data.success === true) {
                        if (data.bin1 !== undefined && data.bin1.country !== undefined && data.bin1.country !== null && data.bin1.country !== '') {
                            card1Country = data.bin1.country;
                        }
                    }
                },
                error: function () {
                    alert(i18nMessage('requestErrorTryLater', 'При выполнении запроса возникла ошибка. Пожалуйста, повторите операцию позже.'));
                }
            })
        }
    });

    /**
     * Выпадающие списки для полей выбора карт
     */
    if (typeof (cardsByTokens) !== typeof (undefined) && cardsByTokens !== undefined) {
        createCardsDropdowns($('#card'), cardsByTokens.senderCards);
        var card1FilledWithToken = false;
        var initialTokens = {
            token: $('input[name=token]') !== undefined && $('input[name=token]').length > 0
        };

        $('#card').each(function () {
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
                if (tokenEl === undefined || tokenEl.length == 0) {
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
                if (input.is('#card')) {
                    $('select[name=month]').removeClass('has-error').val(9 >= month ? '0' + month : month).removeAttr('required').prop('disabled', true);
                    $('select[name=month]').tooltip('destroy');
                    $('select[name=year]').removeClass('has-error').val(year).removeAttr('required').prop('disabled', true);
                    $('select[name=year]').tooltip('destroy');

                    getTokenElement('token').val(token);
                    card1FilledWithToken = true;
                }
            } else {
                input.removeClass('ignore-validation');
                if (input.is('#card') && card1FilledWithToken) {
                    $('select[name=month]').val('').attr('required', 'required').prop('disabled', false);
                    $('select[name=year]').val('').attr('required', 'required').prop('disabled', false);

                    dropTokenElement('token');
                    input.val('').attr({'required': 'required', 'name': 'pan'}).trigger('input');
                    card1FilledWithToken = false;
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
            if (cards !== undefined && cards.length > 0) {
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
