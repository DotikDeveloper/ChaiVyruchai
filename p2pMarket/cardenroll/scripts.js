function toTranslit($el, text) {
    let excludes = '0123456789_=+/*|\\!@#$%^&()<>.?:"\'';
    let char = text[text.length - 1];
    if ( excludes.indexOf(char) + 1 ) {
        console.log('В поле "держатель карты" введен недопустимый символ');
        text = text.replace(char, '');
    }
    if ( screen.width >= 768 ) {
        return text.replace(/([а-яё])|([\s_-])|([^a-z\d]|(0123456789))/gi,
            function (all, ch, space, words, i) {
                if (space || words) {
                    return space ? ' ' : '';
                }
                var code = ch.charCodeAt(0),
                    index = code == 1025 || code == 1105 ? 0 :
                        code > 1071 ? code - 1071 : code - 1039,
                    t = ['', 'F', '', 'D', 'U', 'L', 'T', '',
                        'P', 'B', 'Q', 'R', 'K', 'V', 'Y', 'J', 'G',
                        'H', 'C', 'N', 'E', 'A', '', 'W', 'X', 'I',
                        'O', '', 'S', 'M', '', '', 'Z'
                    ];
                return t[index];
            });
    } else {
        return text.replace(/([а-яё])/gi,
            function (all, ch, space, words, i) {
                $el.addClass('has-error');
                $('#cardHolderNameTooltip').fadeIn('slow');
                setTimeout(function (){$('#cardHolderNameTooltip').fadeOut('slow'); $el.removeClass('has-error');}, 2000);
                function reprint ($obj) {
                    $obj.val($obj.val().substr(0, $obj.val().length - 1));
                    return $obj.val().length;
                }
                var reprintInterval;
                var reprintChar = function () {
                    if ($('#cardholder-name').val().length < 1) {
                        clearInterval(reprintInterval);
                        return;
                    }
                    reprint($('#cardholder-name'))
                }
                reprintInterval = setInterval(reprintChar, 100)
                return ch;
            });
    }
}

$(document).ready(function () {
    $('#cardholder-name, #cardholder_name, #card-form-cardholder, input[name=name]').on('input', function () {
        try {
            $(this).val( toTranslit($(this), $(this).val()).toUpperCase() );
        } catch (e) {
            console.log('toTranslit function failed to work correctly!');
            console.log(e);
        }
    })
})
