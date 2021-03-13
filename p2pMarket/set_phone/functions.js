var isFormReady = false;
var isPhoneChecked = false;
var isCodeChecked = false;
var hasPhone2 = false;
var hasPassphrase2 = false;

function lockScreen() {
    $('#popup_loader').show();
    $('#submitButton').prop({'readonly': true});
}

function unlockScreen() {
    $('#submitButton').prop({'readonly': false});
    $('#popup_loader').hide();
}

var checkPhoneHandler = function (checkPhoneData, resendSms) {

    resendSms = resendSms || false;

    lockScreen();

    var phone2El = $('#phone2');
    var phoneEl = $('#phone');
    if (hasPhone2) {
        checkPhoneData.phone2 = phone2El.val() !== undefined ? phone2El.val().replace(/[()_\+\-\s]/g, '') : "";
    } else {
        checkPhoneData.phone = phoneEl.val() !== undefined ? phoneEl.val().replace(/[()_\+\-\s]/g, '') : "";
    }

    var passphrase2El = $('#passphrase2');
    var passphraseEl = $('#passphrase');
    if (hasPassphrase2) {
        checkPhoneData.passphrase2 = passphrase2El.val() !== undefined ? passphrase2El.val() : "";
    } else {
        checkPhoneData.passphrase = passphraseEl.val() !== undefined ? passphraseEl.val() : "";
    }

    var newpassphraseEl = $('#newpassphrase');
    checkPhoneData.passphrase = passphraseEl.val();
    checkPhoneData.newpassphrase = newpassphraseEl !== undefined && newpassphraseEl.length > 0 ? newpassphraseEl.val() : undefined;
    checkPhoneData.repassphrase = $('#repassphrase').val();
    if (resendSms) {
        checkPhoneData.resendSms = true;
    }

    $.ajax({
        url: '/webapi/b2puser/CheckValidPhone',
        method: 'post',
        data: checkPhoneData,
        dataType: 'json',
        success: function (data) {
            if (data.success === true) {
                smsCodeVisibility(true);
                isPhoneChecked = true;

                if (resendSms) {
                    alert(i18nMessage('codeResent'));
                }
                return false;
            } else {
                if (resendSms == false) {
                    isPhoneChecked = false;
                    smsCodeVisibility(false);
                } else {
                    isPhoneChecked = true;
                }
                alert(data.message);
                return false;
            }
        },
        error: function (data) {
            smsCodeVisibility(false);
            isPhoneChecked = false;
            isCodeChecked = false;
            isFormReady = false;
            alert(i18nMessage('requestError'));
        }
    });
};
/**
 * @param checkCodeData передается по ссылке и в нем уже указаны параметры для checkPhone. Подчищаем ненужное и добавляем нужное
 */
var checkCodeHandler = function (checkCodeData) {

    lockScreen();

    var phone2El = $('#phone2');
    var phoneEl = $('#phone');
    if (hasPhone2) {
        checkCodeData.phone2 = phone2El.val() != undefined ? phone2El.val().replace(/[()_\+\-\s]/g, '') : "";
    } else {
        checkCodeData.phone = phoneEl.val() != undefined ? phoneEl.val().replace(/[()_\+\-\s]/g, '') : "";
    }
    var passphrase2El = $('#passphrase2');
    var passphraseEl = $('#passphrase');
    if (hasPassphrase2) {
        checkCodeData.passphrase2 = passphrase2El.val() !== undefined ? passphrase2El.val() : "";
    } else {
        checkCodeData.passphrase = passphraseEl.val() !== undefined ? passphraseEl.val() : "";
    }

    checkCodeData.smscode = $('#smscode').val();
    checkCodeData.passphrase = undefined;
    checkCodeData.newpassphrase = undefined;
    checkCodeData.repassphrase = undefined;

    $.ajax({
        url: '/webapi/b2puser/CheckSmsCode',
        method: 'post',
        data: checkCodeData,
        dataType: 'json',
        success: function (data) {
            if (data.success === true) {
                isCodeChecked = true;
                // На этом этапе форма готова к отправке
                isFormReady = true;

                $('#payForm').submit();
                return false;
            } else {
                isCodeChecked = false;
                if (data.message != null) {
                    alert(data.message);
                } else {
                    alert(i18nMessage('incorrectCode'));
                }
                unlockScreen();
                return false;
            }
        },
        error: function (data) {
            isCodeChecked = false;
            isFormReady = false;
            unlockScreen();
        }
    });
};

var smsCodeVisibility = function (visible) {

    unlockScreen();

    if (visible) {
        if (!hasPhone2) {
            $('#phone').prop('readonly', true);
        }
        $('#passphrase').prop('readonly', true);
        if ($('#newpassphrase') !== undefined && $('#newpassphrase').length > 0) {
            $('#newpassphrase').prop('readonly', true);
        }
        $('#repassphrase').prop('readonly', true);
        $('#smscode-container').removeClass('hidden');
    } else {
        if (!hasPhone2) {
            $('#phone').prop('readonly', false);
        }
        $('#passphrase').prop('readonly', false);
        if ($('#newpassphrase') !== undefined && $('#newpassphrase').length > 0) {
            $('#newpassphrase').prop('readonly', false);
        }
        $('#repassphrase').prop('readonly', false);
        $('#smscode-container').addClass('hidden').find('input').val('');
    }
};

function submitForm(form) {
    lockScreen();

    return true;
}
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
var formValidate = function () {
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
            phone: {
                validatePhone: true
            },
            password: {
                checkPassword: true
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

            if (!isActive && !isFormReady) {
                if (!isPhoneChecked) {
                    checkPhoneHandler(checkPhoneData);
                }
                if (isPhoneChecked && !isCodeChecked) {
                    checkCodeHandler(checkPhoneData);
                }
                return false;
            }

            return submitForm(form);
        }
    });
};
$(document).ready(function () {

    $('#phone').inputmask("+9 (999) 999-99-99");

    var phone2El = $('#phone2');
    if (phone2El !== undefined && phone2El.length > 0) {
        hasPhone2 = true;
    }

    var passphrase2El = $('#passphrase2');
    if (passphrase2El !== undefined && passphrase2El.length > 0) {
        hasPassphrase2 = true;
    }

    // Обработчик переотправки СМС
    $('#sms-resend').on('click', function () {
        isCodeChecked = false;
        isFormReady = false;
        $('#smscode').val();

        checkPhoneHandler(checkPhoneData, true);

        return false;
    });

    // Обработчик кнопки показа полей ввода пароля
    if ($('#changePasshprase') != undefined && $('#changePasshprase').length > 0) {
        $('#changePasshprase').on('click', function () {
            $('#passphrase-container').removeClass("hidden");
            $('#changePasshprase').hide();
        })
    }


    //Validator
    $.extend($.validator.messages, {
        required: i18nMessage('requiredField'),
        email: i18nMessage('incorrectEmail'),
        number: i18nMessage('missingNumber'),
        minlength: i18nMessage('enterNoLessThan')
    });

    $.validator.addMethod("validatePhone", function (value, element) {
        value = value.replace(/[()_\+\-\s]/g, '');
        return value == '' || /^[0-9]{11}$/.test(value);
    }, i18nMessage('invalidPhoneNumber'));
    $.validator.addMethod("checkPassword", function (value, element) {
        return ($('#password').val() == '' && $('#repassword').val() == '') || $(element).val() == $('#repassword').val();
    }, i18nMessage('incorrectSecretPhrase'));

    /*$('#amountControl').rules('add', {
     numberCustom: true,
     maxSum: true,
     limits: true
     })*/

    if ($('#payForm') != undefined) {
        formValidate();
    }

});