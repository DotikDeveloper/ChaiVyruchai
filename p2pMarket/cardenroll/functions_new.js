var errorPlacementFn = function (error, element) {
    var inputField = element;
	inputField.tooltip('destroy');
	inputField.tooltip({title:error.text(),
		placement:'bottom',
		trigger:'manual'}).tooltip('show');
};
$(document).ready(function () {

    var panPrevLength = 0;

    $('input[name=pan]').on('input', function () {
        var self = $(this);
        var value = self.val().replace(/\s/g, '');

        var panCurrentLength = $(this).val();
        if((panPrevLength < panCurrentLength) && (value.length == 16 && ((/^5/.test(value)) || (/^4/.test(value))))) {
            if ($('input[name=name]') != undefined && $('input[name=name]').length > 0 && !$('input[name=name]').is(":hidden")) {
                $('input[name=name]').focus();
            } else if ($('#cardDate') != undefined && $('#cardDate').length > 0 && !$('#cardDate').is(":hidden")) {
                $('#cardDate').focus();
            } else if ($('[name=month]') != undefined && $('[name=month]').length > 0 && !$('[name=month]').is(":hidden")) {
                $('[name=month]').focus();
            }
        }
        panPrevLength = panCurrentLength;
    });
    $('input[name=cvc]').on('input', function () {
        if ($(this).val().length == 3 && $('input[name=email]') != undefined && $('input[name=email]').length > 0 && $('input[name=email]').prop('required')) {
            $('input[name=email]').focus();
        }
    });


    $('#resolution').val(screen.width + 'x' + screen.height);
	var now = new Date();
	$('#time_zone_offset').val(-now.getTimezoneOffset() / 60);

	$.extend($.validator.messages, {
		required: 'Поле обязательно',
		email: 'Неверный email'
	});
	$.validator.addMethod("emailCustom", function (value, element) {
		return isValidEmail($(element).val());
	}, "Неверный email");
	$.validator.addMethod("cvc", function (value, element) {
		if (/^6/.test($('#card').val()) && !$(element).val()){
			return true;
		}
		return isValidCVC($(element).val());
	}, "Неверный код безопасности");
	$.validator.addMethod("pan", function (value, element) {
        var trimmedCard = $(element).val().replace(/\s/g, '');
        return /^[\d ]+$/.test($(element).val()) && (trimmedCard.length >= 16 && trimmedCard.length <= 19) && louna(trimmedCard);
	}, "Неверный номер карты");

	$('#payForm').validate({
		errorElement: "span",
		errorClass: 'has-error',
		errorPlacement:errorPlacementFn,
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
					depends: function(element){
						return !/^6/.test($('#card').val());
					}
				}
			},
			pan: {
				pan: true
			}
		},
		submitHandler: function(form){
			var ps = cardType($('#card').val());
			if(notifies[ps] != undefined && notifies[ps]['ENABLE'] != undefined && notifies[ps]['ENABLE']){
				alert(notifies[ps]['MESSAGE']);
				return false;
			}
			var btn = $('#submitButton');
			var loader = $('#popup_loader');
			btn.attr('disabled','disabled');
			loader.show();
            return true;
		}
	});

	$('#cvcTooltip').tooltip({trigger: 'hover'});

	$('#card').on('keyup input', function(){
		var self = $(this);
		var value = self.val().replace(/\s/g,'');
		if (value){
			if (louna(value)){
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