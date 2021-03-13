var customAdditionalSubmitHandler = undefined;
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

    var now = new Date();
    var minYear = now.getFullYear() - 80;
    $('.date-format').inputmask("99.99.9999");
    var birthminDate = new Date();
    birthminDate.setFullYear(birthminDate.getFullYear() - 14);
    $('.date-format:not([readonly])').datepicker({
        dateFormat: "dd.mm.yy",
        changeMonth: true,
        changeYear: true,
        onSelect: function (dateText, element) {
            $(this).trigger('focusout');
        }
    });
    var birthDateEl = $('#birth_date:not([readonly])');
    birthDateEl.datepicker("option", "maxDate", birthminDate);
    birthDateEl.datepicker("option", "yearRange", minYear + ":" + birthminDate.getFullYear());
    var persondocIssDateEl = $('#persondoc_issdate:not([readonly])');
    persondocIssDateEl.datepicker("option", "maxDate", now);
    persondocIssDateEl.datepicker("option", "yearRange", minYear + ":" + now.getFullYear());

    if (language === "ENGLISH") {
        $.datepicker.setDefaults($.datepicker.regional[""]);
    }

    $('#last_name, #first_name, #patronymic').on('input', function (event) {
        var $element = $(event.currentTarget);
        $element.val(value.replace(/[^а-яА-ЯёЁa-zA-Z-]/g, '').toUpperCase());
    });


    $('#inn').inputmask("9999999999[99]");
    $('#snils').inputmask("999-999-999 99", {placeholder: 'XXX-XXX-XXX XX'});
    $('#persondoc_number').inputmask("9999999999", {placeholder: '####YYYYYY'});

    //Validator
    $.extend($.validator.messages, {
        required: i18nMessage('requiredField'),
        email: i18nMessage('incorrectEmail'),
        number: i18nMessage('missingNumber'),
        maxlength: i18nMessage('valueTooLong')
    });

    $.validator.addMethod("numberCustom", function (value, element) {
        return /^\d+((,|\.)\d+)?$/.test(value);
    }, i18nMessage('missingNumber'));
    $.validator.addMethod("validatePassport", function (value, element) {
        return value === '' || /^\d{10}$/.test(value);
    }, i18nMessage('incorrectPassportId'));
    $.validator.addMethod("validateInn", function (value, element) {
        return value === '' || /^\d{10}(\d{2})?$/.test(value);
    }, i18nMessage('incorrectInn'));
    $.validator.addMethod("validateSnils", function (value, element) {
        return value === '' || /^\d{3}-\d{3}-\d{3} \d{2}$/.test(value);
    }, i18nMessage('incorrectSnils'));
    $.validator.addMethod("emailCustom", function (value, element) {
        return value === '' || isValidEmail(value);
    }, i18nMessage('incorrectEmail'));
    $.validator.addMethod("validateDate", function (value, element) {
        return validateDate(value, 0);
    }, i18nMessage('incorrectDateOrFormat'));
    $.validator.addMethod("validateBirthDate", function (value, element) {
        return validateDate(value, 14);
    }, i18nMessage('incorrectDateOrFormat'));
    $.validator.addMethod("checkCyrillic", function (value, element) {
        return value === '' || /^[А-Яа-я.,\-\s\d]+$/.test(value);
    }, i18nMessage('onlyCyrillicAllowed'));
    $.validator.addMethod("checkName", function (value, element) {
        return value === '' || /^[А-Яа-яA-Za-z\-\s.]+$/.test(value);
    }, i18nMessage('onlyLettersDashesSpacesAllowed'));

    function validateDate(value, dateOffset) {
        var arr = value.split('.');
        var year = 0;
        var month = 0;
        var day = 0;
        if (arr.length > 0) {
            day = arr[0];
        }
        if (arr.length > 1) {
            month = arr[1];
        }
        if (arr.length > 2) {
            year = arr[2];
        }
        return value === '' || (/^\d{2}.\d{2}.\d{4}$/.test(value) && !isNaN(new Date(year + "-" + month + "-" + day).getTime()) && year >= minYear && year <= new Date().getFullYear() - dateOffset);
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
        ignore: ':hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input, .ignore-validation',
        success: function (error, element) {
            $(element).tooltip('destroy');
        },
        rules: {
            last_name: {
                checkName: true
            },
            first_name: {
                checkName: true
            },
            patronymic: {
                checkName: true
            },
            inn: {
                validateInn: true
            },
            snils: {
                validateSnils: true
            },
            email: {
                emailCustom: true
            },
            birth_date: {
                validateBirthDate: true
            },
            persondoc_issdate: {
                validateDate: true
            },
            persondoc_number: {
                validatePassport: true
            },
            persondoc_issby: {
                checkCyrillic: true
            },
            address: {
                checkCyrillic: true
            }
        },
        submitHandler: function (form) {
            //Вызываем дополнительную функцию проверки. Если функция возвращает false - то выходим из обработчика отправки формы, не отправляя форму.
            if (customAdditionalSubmitHandler !== undefined) {
                var checkResult = customAdditionalSubmitHandler(form);
                if (checkResult == false) {
                    return false;
                }
            }
            return submitForm(form);
        }
    });

    function submitForm(form) {
        return true;
    }

});