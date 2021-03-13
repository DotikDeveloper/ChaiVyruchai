function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
var defaultColorCard = '#455a64';
var defaultColorText = '#ffffff';
var oldLogo = undefined;
var borderColor = {r: 255, g: 255, b: 255};
var defaultBorderColor = {r: 255, g: 255, b: 255, o: 0.5};
var defaultBorderColorOnFocus = {r: 255, g: 255, b: 255, o: 0.5}

$(document).ready(function () {
    /**
     * Обработчик ввода полей с номером карты
     */
        // Для предотвращения перерисовки лого при каждом нажатии
    $('.card-input').on('focus', function () {
        $(this).css({'border-color': 'rgba(' + borderColor.r + ', ' + borderColor.g + ', ' + borderColor.r + ', 0.5)'});
    })
    $('.card-input').on('focusout', function () {
        $(this).css({'border-color': 'rgba(' + borderColor.r + ', ' + borderColor.g + ', ' + borderColor.r + ', 0.1)'});
    });

    $('.card-number').on('input', function () {
        var self = $(this);
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
                $('#cvc-label').html('ППК');
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
                            $(this).css({'border-color': 'rgba(' + borderColor.r + ', ' + borderColor.g + ', ' + borderColor.b + ', 0.5)'})
                        } else {
                            $(this).css({'border-color': 'rgba(' + borderColor.r + ', ' + borderColor.g + ', ' + borderColor.b + ', 0.1)'})
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
    }).trigger('input');
});